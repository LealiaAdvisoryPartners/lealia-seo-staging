// Preparação dos dados do relatório personalizado.
// Puro: sem I/O, sem dependências de servidor — usado no cliente e no servidor.
import {
  calcularValuation,
  formatEUR,
  type ValuationInput,
  type ValuationResult,
  type Ajuste,
  type Confianca,
  CONF_EXPLICACAO,
  OUTRO,
  OUTRA_INDUSTRIA,
} from "./valuation.ts";

/** Subconjunto de campos do lead necessários ao relatório. */
export type ReportLead = {
  nome: string;
  email?: string;
  cargo?: string | null;
  empresa: string;
  pais: string;
  industria: string;
  subindustria?: string | null;
  atividade_principal?: string | null;
  num_colaboradores?: string | null;
  unidades?: string | null;
  num_clientes_ativos?: string | null;
  idade_empresa?: number | null;
  ano_referencia?: number | null;
  tipo_periodo?: string | null;
  faturacao_ano1?: number | null;
  faturacao_ano2?: number | null;
  faturacao_ano3?: number | null;
  ebitda_ano1?: number | null;
  ebitda_ano2?: number | null;
  ebitda_ano3?: number | null;
  despesas_extraordinarias_ano1?: number | null;
  despesas_extraordinarias_ano2?: number | null;
  despesas_extraordinarias_ano3?: number | null;
  caixa_e_depositos?: number | null;
  divida_financeira?: number | null;
  capex_anual_recorrente?: number | null;
  pct_top5_clientes?: number | null;
  pct_top1_clientes?: number | null;
  backlog_contratado?: number | null;
  geografia_clientes?: string | null;
  dependencia_acionista_faturacao?: string | null;
  dependencia_acionista_gestao?: string | null;
  proprietario_imovel?: string | null;
  renda_reflete_mercado?: string | null;
  acrescimo_renda_anual?: number | null;
  incluir_imovel_perimetro?: string | null;
  valorizacao_imovel?: number | null;
  metodo_avaliacao_imovel?: string | null;
  ano_avaliacao_imovel?: number | null;
  estrutura_transacao?: string | null;
  pct_a_transacionar?: string | null;
  permanencia_pos_venda?: string | null;
  tipo_investidor?: string | null;
  motivo_interesse?: string | null;
  horizonte_temporal?: string | null;
  created_at?: string | null;
};

/** Converte a linha do lead na entrada exata do motor de cálculo. */
export function valuationInputFromLead(lead: ReportLead): ValuationInput {
  return {
    pais: lead.pais,
    industria: lead.industria,
    subindustria: lead.subindustria ?? "",
    idade_empresa: lead.idade_empresa ?? 0,
    ano_referencia: lead.ano_referencia ?? new Date().getFullYear(),
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: lead.unidades ?? null,
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    faturacao_ano1: lead.faturacao_ano1 ?? 0,
    faturacao_ano2: lead.faturacao_ano2 ?? null,
    faturacao_ano3: lead.faturacao_ano3 ?? null,
    ebitda_ano1: lead.ebitda_ano1 ?? 0,
    ebitda_ano2: lead.ebitda_ano2 ?? null,
    ebitda_ano3: lead.ebitda_ano3 ?? null,
    despesas_extraordinarias_ano1: lead.despesas_extraordinarias_ano1 ?? 0,
    despesas_extraordinarias_ano2: lead.despesas_extraordinarias_ano2 ?? 0,
    despesas_extraordinarias_ano3: lead.despesas_extraordinarias_ano3 ?? 0,
    caixa_e_depositos: lead.caixa_e_depositos ?? 0,
    divida_financeira: lead.divida_financeira ?? 0,
    capex_anual_recorrente: lead.capex_anual_recorrente ?? null,
    pct_top5_clientes: lead.pct_top5_clientes ?? null,
    pct_top1_clientes: lead.pct_top1_clientes ?? null,
    backlog_contratado: lead.backlog_contratado ?? null,
    geografia_clientes: lead.geografia_clientes ?? null,
    dependencia_faturacao: lead.dependencia_acionista_faturacao ?? null,
    dependencia_gestao: lead.dependencia_acionista_gestao ?? null,
    proprietario_imovel: lead.proprietario_imovel ?? null,
    renda_reflete_mercado: lead.renda_reflete_mercado ?? null,
    acrescimo_renda_anual: lead.acrescimo_renda_anual ?? null,
    incluir_imovel_perimetro: lead.incluir_imovel_perimetro ?? null,
    valorizacao_imovel: lead.valorizacao_imovel ?? null,
    metodo_avaliacao_imovel: lead.metodo_avaliacao_imovel ?? null,
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: lead.permanencia_pos_venda ?? null,
    tipo_investidor: lead.tipo_investidor ?? null,
  };
}

export type LinhaHistorico = {
  ano: number;
  faturacao: string;
  ebitda: string;
  margem: string;
  despesas: string;
};

export type ReportData = ReturnType<typeof buildReportData>;

const NAO_INDICADO = "Não indicado";
const pct1 = (v: number) => `${v.toFixed(1).replace(".", ",")}%`;
const eur = (v?: number | null) => (typeof v === "number" ? formatEUR(Math.round(v)) : NAO_INDICADO);

/**
 * Prepara todos os dados (valores formatados, flags e textos dinâmicos) que o
 * template do relatório consome. `result` deve vir de `calcularValuation`
 * com o mesmo input, garantindo números idênticos aos da página.
 */
export function buildReportData(lead: ReportLead, result: ValuationResult) {
  const ok = result.ok;
  const r = result.ok ? result : null;
  const ano = lead.ano_referencia ?? new Date().getFullYear();
  const fat1 = lead.faturacao_ano1 ?? 0;

  // Histórico: apenas anos efetivamente preenchidos.
  const anosBrutos = [
    { ano, faturacao: lead.faturacao_ano1, ebitda: lead.ebitda_ano1, desp: lead.despesas_extraordinarias_ano1 },
    {
      ano: ano - 1,
      faturacao: lead.faturacao_ano2,
      ebitda: lead.ebitda_ano2,
      desp: lead.despesas_extraordinarias_ano2,
    },
    {
      ano: ano - 2,
      faturacao: lead.faturacao_ano3,
      ebitda: lead.ebitda_ano3,
      desp: lead.despesas_extraordinarias_ano3,
    },
  ].filter((a) => typeof a.faturacao === "number" || typeof a.ebitda === "number");

  const historico: LinhaHistorico[] = anosBrutos.map((a) => ({
    ano: a.ano,
    faturacao: eur(a.faturacao),
    ebitda: eur(a.ebitda),
    margem:
      typeof a.faturacao === "number" && a.faturacao > 0 && typeof a.ebitda === "number"
        ? pct1((a.ebitda / a.faturacao) * 100)
        : "—",
    despesas: typeof a.desp === "number" && a.desp !== 0 ? eur(a.desp) : "—",
  }));

  const margem_ebitda_ajustada = r && fat1 > 0 ? (r.ebitda_base / fat1) * 100 : null;

  const proprietario = lead.proprietario_imovel === "Sim";
  const imovelNoPerimetro = proprietario && lead.incluir_imovel_perimetro === "Sim";
  const top5 = lead.pct_top5_clientes;
  const depGest = lead.dependencia_acionista_gestao ?? null;
  const depFat = lead.dependencia_acionista_faturacao ?? null;
  const capex = lead.capex_anual_recorrente;

  const crescimentoAjuste = r?.ajustes.find((a) => a.label === "Crescimento");
  const crescimento_forte = !!crescimentoAjuste && crescimentoAjuste.multiplicador > 1;
  const crescimento_negativo = !!crescimentoAjuste && crescimentoAjuste.multiplicador < 1;

  const capex_intensivo = !!(r && typeof capex === "number" && r.ebitda_base > 0 && capex / r.ebitda_base > 0.3);

  const flags = {
    industria_saude: lead.industria === "Saúde",
    industria_energia: lead.industria === "Energia",
    industria_tecnologia: lead.industria === "Tecnologia",
    industria_manufatura: lead.industria === "Manufatura/Indústria",
    industria_generica: lead.industria === OUTRA_INDUSTRIA || (lead.subindustria ?? "") === OUTRO,
    concentracao_alta: typeof top5 === "number" && top5 > 60,
    concentracao_baixa: typeof top5 === "number" && top5 < 30,
    dependencia_gestao_alta: depGest === "Alta",
    dependencia_gestao_baixa: depGest === "Baixa",
    dependencia_faturacao_alta: !!depFat?.startsWith("Alta"),
    unidade_unica: lead.unidades === "Localização única",
    crescimento_forte,
    crescimento_negativo,
    capex_intensivo,
    empresa_jovem: typeof lead.idade_empresa === "number" && lead.idade_empresa < 3,
    tem_imovel_proprio: proprietario,
    imovel_no_perimetro: imovelNoPerimetro,
    tem_ajuste_imovel: !!r && r.ajuste_ebitda_imovel !== 0,
    tem_divida: !!r && r.tem_divida,
    mostrar_equity: !!r,
    tem_anos_anteriores: historico.length > 1,
  };

  // --- Drivers de valor — apenas com evidência efetivamente preenchida ---
  type Driver = { driver: string; evidencia: string; impacto: string; estado: string };
  const margemFmt = margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : null;
  const capexRacio = r && typeof capex === "number" && r.ebitda_base > 0 ? capex / r.ebitda_base : null;

  const driversCandidatos: Array<[boolean, Driver]> = [
    [
      !!lead.unidades && lead.unidades !== "Não aplicável",
      {
        driver: "Presença operacional",
        evidencia: `Unidades / localizações: ${lead.unidades}`,
        impacto:
          lead.unidades === "Localização única"
            ? "A concentração numa única localização limita a escala e aumenta o risco operacional"
            : "A presença multi-unidade demonstra replicabilidade do modelo e suporta um múltiplo superior",
        estado: "Confirmado",
      },
    ],
    [
      typeof top5 === "number",
      {
        driver: "Diversificação de clientes",
        evidencia: `Cinco maiores clientes: ${top5}% da faturação`,
        impacto:
          typeof top5 === "number" && top5 < 40
            ? "Menor concentração reduz o risco de dependência comercial"
            : "A concentração indicada tende a ser refletida no múltiplo e no desenho de garantias",
        estado: "Confirmado",
      },
    ],
    [
      !!depGest,
      {
        driver: "Autonomia da gestão",
        evidencia: `Dependência do acionista na gestão: ${depGest}`,
        impacto:
          depGest === "Baixa"
            ? "Uma operação menos dependente do acionista reduz o risco de transição"
            : "A transferibilidade da gestão será um tema central na negociação e na due diligence",
        estado: "Confirmado",
      },
    ],
    [
      !!margemFmt,
      {
        driver: "Rendibilidade operacional",
        evidencia: `Margem EBITDA normalizada de ${margemFmt}`,
        impacto: "Margens mais elevadas e sustentáveis tendem a aumentar a atratividade do negócio",
        estado: "Confirmado",
      },
    ],
    [
      capexRacio !== null,
      {
        driver: "Intensidade de investimento",
        evidencia: `CAPEX recorrente equivalente a ${capexRacio !== null ? pct1(capexRacio * 100) : "—"} do EBITDA normalizado`,
        impacto:
          capexRacio !== null && capexRacio <= 0.3
            ? "Menor necessidade de investimento recorrente favorece a conversão de EBITDA em caixa"
            : "A necessidade de investimento recorrente pode limitar a conversão de EBITDA em caixa",
        estado: "Confirmado",
      },
    ],
    [
      typeof lead.idade_empresa === "number" && lead.idade_empresa > 0,
      {
        driver: "Histórico operacional",
        evidencia: `${lead.idade_empresa} anos de atividade`,
        impacto:
          typeof lead.idade_empresa === "number" && lead.idade_empresa >= 10
            ? "Um histórico prolongado tende a reduzir o risco operacional percebido"
            : "Um histórico mais curto exige maior suporte documental na avaliação",
        estado: "Confirmado",
      },
    ],
    [
      !!lead.geografia_clientes,
      {
        driver: "Diversificação geográfica",
        evidencia: `Distribuição de clientes: ${lead.geografia_clientes}`,
        impacto: "Menor dependência de um só mercado pode reduzir o risco comercial",
        estado: "Confirmado",
      },
    ],
    [
      imovelNoPerimetro && typeof lead.valorizacao_imovel === "number",
      {
        driver: "Imóvel incluído no perímetro",
        evidencia: `Imóvel próprio valorizado em ${eur(lead.valorizacao_imovel)}`,
        impacto: "Acresce ao Equity Value, com o EBITDA ajustado por renda teórica para evitar dupla contagem",
        estado: "Confirmado",
      },
    ],
  ];

  const drivers: Driver[] = driversCandidatos
    .filter(([c]) => c)
    .map(([, d]) => d)
    .slice(0, 4);

  // Recomendações derivadas dos drivers.
  const recomendacoes: string[] = [];
  if (flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta)
    recomendacoes.push(
      "Reforçar a equipa de gestão e documentar processos e relações comerciais, reduzindo a dependência do acionista.",
    );
  if (flags.concentracao_alta)
    recomendacoes.push(
      "Diversificar a base de clientes e formalizar contratos plurianuais com os principais clientes.",
    );
  if (flags.unidade_unica)
    recomendacoes.push(
      "Avaliar a replicabilidade do modelo noutras localizações, demonstrando potencial de escala ao investidor.",
    );
  if (flags.capex_intensivo)
    recomendacoes.push(
      "Documentar as necessidades de investimento, distinguindo capex de manutenção de capex de expansão.",
    );
  if (historico.length < 3)
    recomendacoes.push(
      "Preparar o histórico financeiro dos últimos três exercícios e a respetiva documentação de suporte.",
    );
  if (flags.tem_imovel_proprio)
    recomendacoes.push(
      "Definir antecipadamente se o imóvel deve integrar o perímetro da transação e obter uma avaliação independente.",
    );
  if (r?.aviso_margem)
    recomendacoes.push("Validar a margem EBITDA e a classificação dos itens considerados extraordinários.");
  if (flags.crescimento_negativo)
    recomendacoes.push("Preparar uma explicação sustentada da contração de faturação e do plano de recuperação.");
  recomendacoes.push(
    "Validar esta avaliação indicativa com a equipa da Lealia Advisory Partners antes de qualquer decisão de mercado.",
  );

  const resumo_textual = r
    ? [
        `Com base nos dados disponibilizados, estima-se estima-se um <strong>valor indicativo para os acionistas entre ${eur(r.equity_min)} e ${eur(r.equity_max)}</strong>. ` +
          `O intervalo resulta de um Enterprise Value entre ${eur(r.ev_min)} e ${eur(r.ev_max)}, ` +
          `calculado sobre um EBITDA normalizado de ${eur(r.ebitda_base)} ` +
          `e um múltiplo EV/EBITDA implícito ajustado de ${r.multiplo_ajustado_min.toFixed(2)}x–${r.multiplo_ajustado_max.toFixed(2)}x. ` +
          `Em ${ano} (${lead.tipo_periodo}), a empresa apresentou uma faturação de ${eur(fat1)}` +
          `${margem_ebitda_ajustada !== null ? ` e uma margem EBITDA de ${pct1(margem_ebitda_ajustada)}` : ""}.`,
      ].join("")
    : "Com os dados indicados não é possível apresentar um valor indicativo por múltiplo de EBITDA. " +
      "Este relatório apresenta, ainda assim, o perfil operacional da empresa e as principais recomendações aplicáveis.";

  // --- Mensagem ao acionista: principal oportunidade de criação/preservação de valor ---
  const mensagem_acionista =
    historico.length < 3
      ? "A principal oportunidade de preservação de valor antes de uma transação reside na consolidação de três exercícios financeiros reconciliados e na documentação dos ajustamentos ao EBITDA, reduzindo as lacunas de informação que tipicamente geram desconto em due diligence."
      : flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
        ? "A principal oportunidade de criação de valor reside na redução da dependência do acionista, através do reforço da equipa de gestão e da formalização das relações comerciais em nome da empresa, aumentando a transferibilidade do negócio."
        : flags.concentracao_alta
          ? "A principal oportunidade de criação de valor reside na diversificação da carteira de clientes e na formalização contratual das contas mais relevantes, reduzindo o risco comercial percebido pelo comprador."
          : "A principal oportunidade de criação de valor reside na validação da qualidade dos resultados, na documentação dos ajustamentos ao EBITDA e na redução das lacunas de informação que poderão gerar desconto em due diligence.";

  // --- Perfil da empresa ---
  const perfil = [
    { label: "Atividade principal", valor: lead.atividade_principal || NAO_INDICADO },
    { label: "Setor", valor: `${lead.industria}${lead.subindustria ? ` · ${lead.subindustria}` : ""}` },
    { label: "Geografia", valor: lead.pais },
    { label: "Unidades / localizações", valor: lead.unidades || NAO_INDICADO },
    { label: "Anos de atividade", valor: lead.idade_empresa ? `${lead.idade_empresa} anos` : NAO_INDICADO },
    { label: "Colaboradores", valor: lead.num_colaboradores || NAO_INDICADO },
    { label: "Ano de referência", valor: String(ano) },
    { label: "Período de referência", valor: lead.tipo_periodo || NAO_INDICADO },
  ];

  // --- Normalização do EBITDA (waterfall) ---
  const linhas_ebitda = (r?.linhas_ebitda ?? []).map((l) => ({
    label: l.label,
    tipo: l.tipo,
    valor: l.valor,
    formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
  }));

  // --- Equity Bridge ---
  const ponte = r
    ? [
        { label: "Enterprise Value base", valor: r.ev_medio, tipo: "base" as const },
        { label: "Mais: caixa, depósitos e outros equivalentes", valor: r.caixa, tipo: "ajuste" as const },
        { label: "Menos: dívida total", valor: -r.divida_financeira, tipo: "ajuste" as const },
        ...(r.valor_imovel > 0
          ? [
              {
                label: "Mais: imóvel no perímetro",
                valor: r.valor_imovel,
                tipo: "ajuste" as const,
              },
            ]
          : []),
        {
          label: "Equity Value base",
          valor: Math.round((r.equity_min + r.equity_max) / 2),
          tipo: "total" as const,
        },
      ].map((l) => ({
        ...l,
        formatado: `${l.tipo === "ajuste" && l.valor > 0 ? "+" : ""}${eur(l.valor)}`,
      }))
    : [];

  const cenarios = (r?.cenarios ?? []).map((c) => ({
    nome: c.nome,
    multiplo: `${c.multiplo.toFixed(2)}x`,
    ev: eur(c.ev),
    equity: eur(c.equity),
    pressuposto: c.pressuposto,
  }));

  const sensibilidade = r
    ? {
        colunas: r.sensibilidade.multiplos.map((m) => `${m.toFixed(2)}x`),
        linhas: r.sensibilidade.linhas.map((l) => ({
          variacao: l.variacao,
          ebitda: eur(l.ebitda),
          valores: l.valores.map((v) => eur(v)),
          destaque: l.variacao === "Base",
        })),
      }
    : null;

  const dimensoes_confianca = (r?.dimensoes_confianca ?? []).map((d) => ({
    dimensao: d.dimensao,
    peso: d.peso,
    percentagem: Math.round(d.cobertura * 100),
    em_falta: d.em_falta,
  }));

  // --- Riscos e mitigantes — apenas com evidência preenchida, máximo de quatro ---
  type Risco = {
    risco: string;
    evidencia: string;
    impacto: string;
    mitigante: string;
    nivel: "Alto" | "Médio" | "Baixo";
  };
  const racioDivida = r && r.ebitda_base > 0 ? r.divida_liquida / r.ebitda_base : null;

  const riscosCandidatos: Array<[boolean, Risco]> = [
    [
      historico.length < 3,
      {
        risco: "Histórico financeiro limitado",
        evidencia: `${historico.length} ${historico.length === 1 ? "exercício disponibilizado" : "exercícios disponibilizados"}`,
        impacto: "Reduz a confiança na sustentabilidade dos resultados e pode condicionar o múltiplo",
        mitigante: "Preparar e reconciliar a informação financeira dos últimos três exercícios",
        nivel: "Alto",
      },
    ],
    [
      flags.dependencia_gestao_alta,
      {
        risco: "Dependência de gestão do acionista",
        evidencia: `Dependência do acionista na gestão: ${depGest}`,
        impacto: "Aumenta o risco de transição e de continuidade operacional após a transação",
        mitigante: "Reforçar a equipa de gestão e documentar os processos-chave",
        nivel: "Alto",
      },
    ],
    [
      flags.concentracao_alta,
      {
        risco: "Concentração de clientes",
        evidencia: `Cinco maiores clientes: ${top5}% da faturação`,
        impacto: "Aumenta a exposição à perda de clientes relevantes",
        mitigante: "Diversificar a carteira comercial e formalizar contratos plurianuais",
        nivel: "Alto",
      },
    ],
    [
      flags.dependencia_faturacao_alta,
      {
        risco: "Dependência comercial do acionista",
        evidencia: `Dependência do acionista na faturação: ${depFat}`,
        impacto: "Reduz a transferibilidade das relações comerciais após a transação",
        mitigante: "Transferir contas-chave para gestores de conta e contratar em nome da empresa",
        nivel: "Alto",
      },
    ],
    [
      lead.unidades === "Localização única",
      {
        risco: "Operação numa única localização",
        evidencia: "Atividade concentrada num único site",
        impacto: "Limita a escalabilidade e concentra o risco operacional e geográfico",
        mitigante: "Avaliar replicabilidade do modelo e planos de expansão para novas localizações",
        nivel: "Médio",
      },
    ],
    [
      !!racioDivida && racioDivida > 3,
      {
        risco: "Posição Líquida elevada",
        evidencia: `Posição Líquida equivalente a ${racioDivida !== null ? racioDivida.toFixed(1).replace(".", ",") : "—"}x o EBITDA normalizado`,
        impacto: "Reduz o Equity Value e pode limitar o financiamento de aquisição",
        mitigante: "Reduzir dívida, otimizar caixa e preparar um mapa financeiro atualizado",
        nivel: "Alto",
      },
    ],
    [
      flags.capex_intensivo,
      {
        risco: "CAPEX elevado",
        evidencia: `CAPEX recorrente de ${eur(capex)} face ao EBITDA normalizado`,
        impacto: "Limita a conversão de EBITDA em geração de caixa",
        mitigante: "Separar CAPEX de manutenção e de crescimento e validar necessidades futuras",
        nivel: "Médio",
      },
    ],
    [
      flags.tem_imovel_proprio && lead.metodo_avaliacao_imovel !== "Avaliação independente",
      {
        risco: "Imóvel próprio sem avaliação independente",
        evidencia: `Método de avaliação indicado: ${lead.metodo_avaliacao_imovel || NAO_INDICADO}`,
        impacto: "Introduz incerteza no Equity Value quando o imóvel integra o perímetro",
        mitigante: "Obter avaliação independente e definir o perímetro da transação",
        nivel: "Médio",
      },
    ],
    [
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0,
      {
        risco: "Ajustamentos ao EBITDA por validar",
        evidencia: `Ajustamentos de ${eur(lead.despesas_extraordinarias_ano1)} declarados sem suporte documental`,
        impacto: "Pode gerar descontos ou ajustamentos durante a due diligence",
        mitigante: "Preparar reconciliação contabilística e documentação de suporte",
        nivel: "Médio",
      },
    ],
    [
      flags.crescimento_negativo,
      {
        risco: "Contração da faturação",
        evidencia: "Evolução negativa da faturação no período indicado",
        impacto: "Pode condicionar o múltiplo aplicável e a leitura de sustentabilidade",
        mitigante: "Documentar as causas e evidenciar a inflexão através de indicadores recentes",
        nivel: "Alto",
      },
    ],
  ];

  const riscos: Risco[] = riscosCandidatos
    .filter(([c]) => c)
    .map(([, x]) => x)
    .slice(0, 4);

  // --- Plano de preparação priorizado ---
  const plano = [
    ...(historico.length < 3
      ? [
          {
            prioridade: "Alta",
            acao: "Consolidar três exercícios de informação financeira reconciliada",
            impacto: "Alto",
            esforco: "Médio",
            prazo: "2-6 semanas",
          },
        ]
      : []),
    {
      prioridade: "Alta",
      acao: "Reconciliar EBITDA reportado e normalizado e documentar os ajustamentos",
      impacto: "Alto",
      esforco: "Médio",
      prazo: "1-3 semanas",
    },
    {
      prioridade: "Alta",
      acao: "Confirmar dívida total e caixa, depósitos e outros equivalentes disponíveis à data de referência",
      impacto: "Alto",
      esforco: "Baixo",
      prazo: "1-2 semanas",
    },
    {
      prioridade: "Alta",
      acao: "Analisar o fundo de maneio normativo e a sazonalidade do negócio",
      impacto: "Alto",
      esforco: "Médio",
      prazo: "2-4 semanas",
    },
    ...(flags.dependencia_gestao_alta || flags.dependencia_faturacao_alta
      ? [
          {
            prioridade: "Alta",
            acao: "Reduzir a dependência do acionista e criar plano de sucessão",
            impacto: "Muito alto",
            esforco: "Alto",
            prazo: "3-12 meses",
          },
        ]
      : []),
    ...(flags.concentracao_alta
      ? [
          {
            prioridade: "Média",
            acao: "Mapear a concentração de clientes e formalizar contratos relevantes",
            impacto: "Médio/alto",
            esforco: "Médio",
            prazo: "2-4 semanas",
          },
        ]
      : []),
    ...(flags.capex_intensivo
      ? [
          {
            prioridade: "Média",
            acao: "Separar CAPEX de manutenção e de crescimento",
            impacto: "Médio/alto",
            esforco: "Médio",
            prazo: "2-4 semanas",
          },
        ]
      : []),
    ...(flags.tem_imovel_proprio
      ? [
          {
            prioridade: "Média",
            acao: "Definir o tratamento do imóvel e obter avaliação independente",
            impacto: "Médio/alto",
            esforco: "Baixo",
            prazo: "4-8 semanas",
          },
        ]
      : []),
    ...(flags.unidade_unica
      ? [
          {
            prioridade: "Média",
            acao: "Demonstrar a replicabilidade do modelo noutras localizações",
            impacto: "Médio",
            esforco: "Alto",
            prazo: "6-12 meses",
          },
        ]
      : []),
    {
      prioridade: "Média",
      acao: "Definir a estrutura da transação e o perímetro pretendido",
      impacto: "Alto",
      esforco: "Médio",
      prazo: "2-4 semanas",
    },
  ].slice(0, 8);

  // --- Implicações da percentagem a transacionar ---
  const pctT = lead.pct_a_transacionar ?? "";
  const implicacoes_participacao = pctT.startsWith("Minoritária")
    ? "Numa participação minoritária não existe prémio de controlo e o investidor valoriza sobretudo a governação, os direitos de saída e o plano de crescimento. É frequente o valor por ação refletir um desconto de minoria."
    : pctT.startsWith("Maioritária")
      ? "Numa venda maioritária o comprador assume o controlo e tende a incorporar prémio de controlo, exigindo em contrapartida continuidade da gestão e mecanismos de alinhamento como earn-out ou rollover de parte do capital."
      : pctT.startsWith("Totalidade")
        ? "Na venda da totalidade o comprador paga tipicamente prémio de controlo, mas exige um período de transição, garantias de continuidade dos clientes e um pacote de representações e garantias mais alargado."
        : "A percentagem a transacionar ainda não está definida. A decisão condiciona o universo de investidores, a existência de prémio de controlo e a estrutura de pagamento.";

  // --- Limitações da análise ---
  const limitacoes = [
    "A estimativa assenta exclusivamente na informação declarada, sem verificação documental ou auditoria.",
    "Não foi realizada análise de fundo de maneio normativo nem de sazonalidade do negócio.",
    "Não foram analisadas transações comparáveis específicas nem o apetite atual de investidores para o ativo.",
    ...(historico.length < 3 ? ["O histórico financeiro disponível é inferior a três exercícios."] : []),
    ...(flags.industria_generica
      ? ["O setor indicado não tem múltiplos específicos disponíveis; foi usada uma referência genérica de mercado."]
      : []),
    ...((lead.tipo_periodo ?? "").startsWith("Orçamento") || (lead.tipo_periodo ?? "").startsWith("Estimativa")
      ? ["O período de referência não corresponde a contas encerradas, o que aumenta a incerteza da estimativa."]
      : []),
  ];

  // --- Dados para o gráfico de evolução ---
  const grafico_evolucao = [...anosBrutos]
    .reverse()
    .filter((a) => typeof a.faturacao === "number")
    .map((a) => ({
      ano: a.ano,
      faturacao: a.faturacao as number,
      ebitda: typeof a.ebitda === "number" ? a.ebitda : 0,
      faturacao_formatada: eur(a.faturacao),
      ebitda_formatado: eur(a.ebitda),
    }));
  const maxGrafico = Math.max(1, ...grafico_evolucao.map((g) => g.faturacao));

  // --- Qualidade dos resultados ---
  const serie = grafico_evolucao.filter((g) => g.faturacao > 0);
  const cagr = (ini: number, fim: number, anos: number) =>
    ini > 0 && fim > 0 && anos > 0 ? (Math.pow(fim / ini, 1 / anos) - 1) * 100 : null;

  const cagrFaturacao =
    serie.length >= 2 ? cagr(serie[0]!.faturacao, serie[serie.length - 1]!.faturacao, serie.length - 1) : null;
  const serieEbitda = serie.filter((g) => g.ebitda > 0);
  const cagrEbitda =
    serieEbitda.length >= 2
      ? cagr(serieEbitda[0]!.ebitda, serieEbitda[serieEbitda.length - 1]!.ebitda, serieEbitda.length - 1)
      : null;

  const margensSerie = serie
    .filter((g) => g.ebitda !== 0)
    .map((g) => ({ ano: g.ano, margem: (g.ebitda / g.faturacao) * 100 }));
  const amplitudeMargem =
    margensSerie.length >= 2
      ? Math.max(...margensSerie.map((m) => m.margem)) - Math.min(...margensSerie.map((m) => m.margem))
      : null;

  const qualidade = {
    tem_serie: serie.length >= 2,
    apenas_um_ano: serie.length <= 1,
    nota_um_ano:
      "Com apenas um período financeiro, não é possível avaliar com robustez o crescimento, a estabilidade de margens, a conversão de resultados em caixa ou a sustentabilidade do EBITDA. Esta limitação reduz a confiança da avaliação e pode condicionar o múltiplo aplicável.",
    cagr_faturacao: cagrFaturacao !== null ? pct1(cagrFaturacao) : null,
    cagr_ebitda: cagrEbitda !== null ? pct1(cagrEbitda) : null,
    margens: margensSerie.map((m) => ({ ano: m.ano, margem: pct1(m.margem), valor: m.margem })),
    comentario_margens:
      amplitudeMargem === null
        ? null
        : amplitudeMargem <= 2
          ? "As margens EBITDA mantiveram-se estáveis no período analisado, o que sustenta a leitura de recorrência dos resultados."
          : amplitudeMargem <= 5
            ? "As margens EBITDA apresentam variação moderada no período analisado, justificando a validação dos fatores que explicam a oscilação."
            : "As margens EBITDA apresentam variação relevante no período analisado, o que exige explicação documentada em due diligence.",
    conversao_caixa:
      r && typeof capex === "number" && r.ebitda_base > 0
        ? `Após CAPEX recorrente de ${eur(capex)}, a conversão indicativa de EBITDA em caixa operacional é de ${pct1(((r.ebitda_base - capex) / r.ebitda_base) * 100)}, antes de fundo de maneio, juros e impostos.`
        : "Não foi indicado CAPEX recorrente, pelo que não é possível estimar a conversão de EBITDA em caixa.",
    fundo_maneio: "O fundo de maneio não foi analisado; poderá originar ajustamentos de closing.",
    backlog:
      typeof lead.backlog_contratado === "number"
        ? `Backlog contratado de ${eur(lead.backlog_contratado)}, que dá visibilidade adicional à faturação futura.`
        : null,
    concentracao:
      typeof top5 === "number"
        ? `Concentração comercial: os cinco maiores clientes representam ${top5}% da faturação${typeof lead.pct_top1_clientes === "number" ? ` e o maior cliente ${lead.pct_top1_clientes}%` : ""}.`
        : null,
    ajustamentos:
      typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0
        ? `Foram declarados ajustamentos não recorrentes de ${eur(lead.despesas_extraordinarias_ano1)}, a validar documentalmente.`
        : "Não foram declarados ajustamentos não recorrentes ao EBITDA.",
  };

  // --- Alertas automáticos ---
  const alertas: string[] = [];
  if (serie.length <= 1)
    alertas.push(
      "Apenas foi disponibilizado um período financeiro. A análise de crescimento e estabilidade de margens não é conclusiva.",
    );
  if (typeof lead.despesas_extraordinarias_ano1 === "number" && lead.despesas_extraordinarias_ano1 !== 0)
    alertas.push(
      'Existem ajustamentos ao EBITDA sem suporte documental. Devem ser classificados como "a validar em due diligence".',
    );
  alertas.push("Não foi analisado o fundo de maneio. O Equity Value poderá ser afetado por ajustamentos de closing.");
  if (proprietario && lead.metodo_avaliacao_imovel !== "Avaliação independente")
    alertas.push(
      "O valor do imóvel foi introduzido sem avaliação independente. O Equity Value poderá sofrer alteração material.",
    );
  if (imovelNoPerimetro && !(typeof lead.valorizacao_imovel === "number" && lead.valorizacao_imovel > 0))
    alertas.push("O imóvel foi incluído no perímetro sem valor indicado, pelo que não foi somado ao Equity Value.");
  if (!lead.tipo_periodo)
    alertas.push(
      "O período financeiro de referência não foi classificado (contas encerradas, estimativa ou orçamento).",
    );
  if (typeof top5 === "number" && typeof lead.pct_top1_clientes === "number" && top5 < lead.pct_top1_clientes)
    alertas.push("O peso dos cinco maiores clientes é inferior ao do maior cliente. Os dados devem ser revistos.");
  if ((lead.pct_a_transacionar ?? "").startsWith("Minoritária"))
    alertas.push(
      "O valor de uma participação minoritária não corresponde a uma proporção simples do Equity Value de 100%.",
    );

  // --- Implicações da estrutura de participação ---
  const implicacoes_estrutura = [
    { estrutura: "Venda de 50%–51%", implicacao: "Exige regras claras de governação e acordo de acionistas" },
    { estrutura: "Venda de 60%–80%", implicacao: "Comprador obtém controlo; pode existir rollover relevante" },
    { estrutura: "Venda de 90%", implicacao: "Participação residual exige proteção e regras de saída" },
    { estrutura: "Venda de 100%", implicacao: "Estrutura mais simples; continuidade de gestão torna-se crítica" },
  ];

  const NOTA_EQUITY =
    "O Equity Value apresentado é indicativo e calculado antes de ajustamentos de closing, normalização de fundo de maneio, contingências, impostos aplicáveis e validação em due diligence.";
  const NOTA_MINORIA =
    "O valor de uma participação minoritária não deve ser assumido como uma simples proporção do Equity Value de 100%. O valor pode variar em função de controlo, direitos de governação, liquidez e estrutura da transação.";

  const dataRelatorio = new Date(lead.created_at ?? Date.now()).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return {
    ok,
    motivo: result.ok ? null : result.motivo,

    empresa: lead.empresa,
    nome: lead.nome,
    cargo: lead.cargo ?? null,
    pais: lead.pais,
    industria: lead.industria,
    subindustria: lead.subindustria ?? null,
    idade_empresa: lead.idade_empresa ?? null,
    ano_referencia: ano,
    data_relatorio: dataRelatorio,
    estrutura_transacao: lead.estrutura_transacao ?? null,
    pct_a_transacionar: lead.pct_a_transacionar ?? null,
    motivo_interesse: lead.motivo_interesse ?? null,
    horizonte_temporal: lead.horizonte_temporal ?? null,

    faturacao_ano1_formatado: eur(lead.faturacao_ano1),
    ebitda_ano1_formatado: eur(lead.ebitda_ano1),
    despesas_extraordinarias_ano1_formatado: eur(lead.despesas_extraordinarias_ano1),
    ebitda_normalizado_formatado: r ? eur(r.ebitda_base) : NAO_INDICADO,
    ajuste_imovel_formatado: r && r.ajuste_ebitda_imovel !== 0 ? eur(Math.abs(r.ajuste_ebitda_imovel)) : null,
    margem_ebitda_ajustada,
    margem_ebitda_ajustada_formatada: margem_ebitda_ajustada !== null ? pct1(margem_ebitda_ajustada) : "—",

    ev_min_formatado: r ? eur(r.ev_min) : "—",
    ev_max_formatado: r ? eur(r.ev_max) : "—",
    ev_medio_formatado: r ? eur(r.ev_medio) : "—",
    equity_min_formatado: r ? eur(r.equity_min) : "—",
    equity_max_formatado: r ? eur(r.equity_max) : "—",
    divida_liquida_formatado: r
      ? eur(r.divida_liquida)
      : eur((lead.divida_financeira ?? 0) - (lead.caixa_e_depositos ?? 0)),
    valor_imovel_formatado: r && r.valor_imovel > 0 ? eur(r.valor_imovel) : null,

    multiplo_base_min: r?.multiplo_base_min ?? null,
    multiplo_base_max: r?.multiplo_base_max ?? null,
    multiplo_ajustado_min: r?.multiplo_ajustado_min ?? null,
    multiplo_ajustado_max: r?.multiplo_ajustado_max ?? null,

    caixa_formatado: eur(lead.caixa_e_depositos),
    divida_financeira_formatado: eur(lead.divida_financeira),
    capex_formatado: eur(lead.capex_anual_recorrente),
    concentracao_top5: typeof top5 === "number" ? `${top5}%` : NAO_INDICADO,
    geografia_clientes: lead.geografia_clientes || NAO_INDICADO,
    dependencia_faturacao: depFat || NAO_INDICADO,
    dependencia_gestao: depGest || NAO_INDICADO,
    imovel_descricao: proprietario
      ? `Propriedade da empresa · ${imovelNoPerimetro ? "incluído no perímetro" : "fora do perímetro"}`
      : lead.proprietario_imovel === "Não"
        ? "Arrendado a terceiros"
        : NAO_INDICADO,
    valorizacao_imovel_formatado: typeof lead.valorizacao_imovel === "number" ? eur(lead.valorizacao_imovel) : null,

    pontos_confianca: r?.pontos_confianca ?? null,
    confianca: (r?.confianca ?? null) as Confianca | null,
    confianca_explicacao: r ? CONF_EXPLICACAO[r.confianca] : null,
    anos_preenchidos: r?.anos_preenchidos ?? historico.length,
    historico,
    nota_historico:
      historico.length === 1
        ? "Foi disponibilizado um ano de histórico financeiro."
        : `Foram disponibilizados ${historico.length} anos de histórico financeiro.`,

    ajustes: (r?.ajustes ?? []) as Ajuste[],
    aviso_margem: r?.aviso_margem ?? null,
    nota_setor: r?.nota_setor ?? null,
    resumo_textual,
    drivers,
    recomendacoes,

    // --- Novas secções ---
    perfil,
    tipo_periodo: lead.tipo_periodo ?? null,
    atividade_principal: lead.atividade_principal ?? null,
    num_colaboradores: lead.num_colaboradores ?? null,
    unidades: lead.unidades ?? null,
    num_clientes_ativos: lead.num_clientes_ativos ?? null,
    concentracao_top1: typeof lead.pct_top1_clientes === "number" ? `${lead.pct_top1_clientes}%` : NAO_INDICADO,
    backlog_formatado: typeof lead.backlog_contratado === "number" ? eur(lead.backlog_contratado) : null,
    metodo_avaliacao_imovel: lead.metodo_avaliacao_imovel ?? null,
    ano_avaliacao_imovel: lead.ano_avaliacao_imovel ?? null,
    permanencia_pos_venda: lead.permanencia_pos_venda ?? null,
    tipo_investidor: lead.tipo_investidor ?? null,

    linhas_ebitda,
    ponte,
    posicao_liquida: r?.posicao_liquida ?? null,
    posicao_liquida_valor: r ? r.caixa - r.divida_financeira : null,
    divida_liquida_absoluta_formatado: r ? eur(Math.abs(r.divida_liquida)) : NAO_INDICADO,
    racio_divida_ebitda:
      r && r.ebitda_base > 0 ? `${(r.divida_liquida / r.ebitda_base).toFixed(1).replace(".", ",")}x` : "—",
    cenarios,
    sensibilidade,
    dimensoes_confianca,
    riscos,
    plano,
    implicacoes_participacao,
    implicacoes_estrutura,
    qualidade,
    alertas,
    mensagem_acionista,
    nota_equity: NOTA_EQUITY,
    nota_minoria: NOTA_MINORIA,
    imovel_no_perimetro_texto: proprietario
      ? imovelNoPerimetro
        ? "Incluído no perímetro"
        : "Excluído do perímetro"
      : "Arrendado",
    limitacoes,
    grafico_evolucao,
    grafico_max: maxGrafico,
    ...flags,
  };
}

/** Atalho: calcula e prepara o relatório a partir da linha do lead. */
export function buildReportFromLead(lead: ReportLead) {
  const result = calcularValuation(valuationInputFromLead(lead));
  return buildReportData(lead, result);
}

/**
 * Versão "teaser" do relatório: remove por completo o conteúdo das páginas
 * bloqueadas (4 a 11), de modo a que esses dados nunca sejam enviados para o
 * browser do cliente. As páginas 1, 2, 3 e a final mantêm-se intactas.
 */
export function redigirRelatorioTeaser(d: ReportData): ReportData {
  return {
    ...d,
    qualidade: {
      ...d.qualidade,
      tem_serie: false,
      apenas_um_ano: false,
      nota_um_ano: "",
      cagr_faturacao: null,
      cagr_ebitda: null,
      comentario_margens: "",
      margens: [],
      ajustamentos: "",
      concentracao: "",
      backlog: "",
      conversao_caixa: "",
      fundo_maneio: "",
    },
    grafico_evolucao: [],
    ajustes: [],
    cenarios: [],
    sensibilidade: { colunas: [], linhas: [] },
    ponte: [],
    drivers: [],
    riscos: [],
    plano: [],
    recomendacoes: [],
    implicacoes_estrutura: [],
    implicacoes_participacao: "",
    dimensoes_confianca: [],
    limitacoes: [],
    alertas: [],
    mensagem_acionista: "",
  };
}
