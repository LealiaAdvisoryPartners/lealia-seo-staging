// Mapeadores de textos gerados pelo motor de cálculo (chaves canónicas em PT)
// para os três idiomas do relatório.
import { t, type ReportLang } from "../report-i18n/index.ts";
import type { Ajuste, Confianca } from "../valuation.ts";
import type { DcfResult } from "../dcf.ts";

export const CONF_LEVEL_WORD: Record<Confianca, Record<ReportLang, string>> = {
  Baixa: { pt: "Baixa", en: "Low", es: "Baja" },
  Média: { pt: "Média", en: "Medium", es: "Media" },
  Alta: { pt: "Alta", en: "High", es: "Alta" },
};

export function traduzirLinhaEbitdaLabel(label: string, ano: number, lang: ReportLang): string {
  const L = t(lang).engine.linhasEbitda;
  if (label === `EBITDA reportado ${ano}`) return L.reportado(ano);
  if (label === "Despesas extraordinárias não recorrentes") return L.despesasExtraordinarias;
  if (label === "Renda teórica de mercado (imóvel próprio)") return L.rendaTeorica;
  if (label === "Acréscimo de renda até valor de mercado") return L.acrescimoRenda;
  if (label === "EBITDA normalizado") return L.normalizado;
  return label;
}

export function traduzirAjuste(a: Ajuste, lang: ReportLang): { label: string; detalhe: string } {
  const A = t(lang).engine.ajustes;
  switch (a.label) {
    case "Volume de negócios": {
      const map: Record<string, string> = {
        "Faturação abaixo de 5M€": A.volumeNegocios.abaixo5M,
        "Faturação entre 5M€ e 20M€": A.volumeNegocios.entre5e20M,
        "Faturação de 20M€ ou mais": A.volumeNegocios.acima20M,
      };
      return { label: A.volumeNegocios.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dimensão dos resultados": {
      const map: Record<string, string> = {
        "EBITDA normalizado abaixo de 2M€": A.dimensaoResultados.abaixo2M,
        "EBITDA normalizado de 2M€ ou mais": A.dimensaoResultados.acimaIgual2M,
      };
      return { label: A.dimensaoResultados.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Idade da empresa": {
      const map: Record<string, string> = {
        "Menos de 3 anos": A.idadeEmpresa.menos3,
        "Mais de 10 anos": A.idadeEmpresa.mais10,
        "Entre 3 e 10 anos": A.idadeEmpresa.entre3e10,
      };
      return { label: A.idadeEmpresa.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Crescimento": {
      if (a.detalhe === "Histórico insuficiente")
        return { label: A.crescimento.label, detalhe: A.crescimento.historicoInsuficiente };
      if (a.detalhe === "Faturação em queda face ao ano mais antigo indicado")
        return { label: A.crescimento.label, detalhe: A.crescimento.emQueda };
      if (a.detalhe === "Crescimento acumulado até 10%")
        return { label: A.crescimento.label, detalhe: A.crescimento.ate10 };
      const mAcum = /^Crescimento acumulado de (\d+)%$/.exec(a.detalhe);
      if (mAcum) return { label: A.crescimento.label, detalhe: A.crescimento.acumulado(mAcum[1]) };
      return { label: A.crescimento.label, detalhe: a.detalhe };
    }
    case "Unidades / localizações": {
      const map: Record<string, string> = {
        "Não indicado": A.unidades.naoIndicado,
        "Operação concentrada numa única localização": A.unidades.unica,
        "Operação multi-unidade (mais de 3 localizações)": A.unidades.maisDe3,
        "Não aplicável ao modelo de negócio": A.unidades.naoAplicavel,
        "Operação em 2-3 localizações": A.unidades.entre2e3,
      };
      return { label: A.unidades.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Concentração de clientes": {
      const map: Record<string, string> = {
        "Não indicada": A.concentracaoClientes.naoIndicada,
        "Base de clientes diversificada": A.concentracaoClientes.diversificada,
        "Concentração moderada nos 5 maiores clientes": A.concentracaoClientes.moderada,
        "Forte dependência dos 5 maiores clientes": A.concentracaoClientes.forte,
      };
      return { label: A.concentracaoClientes.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Geografia dos clientes": {
      const map: Record<string, string> = {
        "Não indicada": A.geografia.naoIndicada,
        "Equilíbrio nacional/internacional": A.geografia.equilibrio,
      };
      return { label: A.geografia.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dependência do acionista (faturação)": {
      const map: Record<string, string> = {
        "Não indicada": A.depFaturacao.naoIndicada,
        "Carteira pouco dependente do acionista": A.depFaturacao.baixa,
        "Forte dependência comercial do acionista": A.depFaturacao.alta,
        "Dependência moderada do acionista": A.depFaturacao.moderada,
      };
      return { label: A.depFaturacao.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Dependência do acionista (gestão)": {
      const map: Record<string, string> = {
        "Não indicada": A.depGestao.naoIndicada,
        "Gestão autónoma face ao acionista": A.depGestao.baixa,
        "Gestão fortemente centrada no acionista": A.depGestao.alta,
        "Dependência moderada do acionista": A.depGestao.moderada,
      };
      return { label: A.depGestao.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    case "Intensidade de investimento (capex)": {
      const map: Record<string, string> = {
        "Não indicada": A.capex.naoIndicada,
        "Capex recorrente reduzido face à faturação": A.capex.reduzido,
        "Capex recorrente relevante face à faturação": A.capex.relevante,
        "Capex recorrente elevado face à faturação": A.capex.elevado,
      };
      return { label: A.capex.label, detalhe: map[a.detalhe] ?? a.detalhe };
    }
    default:
      return { label: a.label, detalhe: a.detalhe };
  }
}

export function traduzirCenarioPressuposto(nome: string, pressuposto: string, lang: ReportLang): string {
  const C = t(lang).engine.cenarios;
  if (nome === "Conservador") return C.conservador;
  if (nome === "Base") return C.base;
  if (nome === "Otimista") return C.otimista;
  return pressuposto;
}

export function traduzirNomeCenario(nome: string, lang: ReportLang): string {
  const nomes: Record<string, Record<ReportLang, string>> = {
    Conservador: { pt: "Conservador", en: "Conservative", es: "Conservador" },
    Base: { pt: "Base", en: "Base", es: "Base" },
    Otimista: { pt: "Otimista", en: "Optimistic", es: "Optimista" },
  };
  return nomes[nome]?.[lang] ?? nome;
}

const VALORES_FORMULARIO: Record<ReportLang, Record<string, string>> = {
  pt: {},
  en: {
    Espanha: "Spain", Outro: "Other", "Outro (não listado)": "Other (not listed)",
    Agricultura: "Agriculture", Agroindústria: "Agro-industry", "Produção agrícola": "Agricultural production",
    Construção: "Construction", "Construção e obras públicas": "Construction and public works", "Produtos de Construção": "Construction products", "Promoção imobiliária": "Real estate development",
    Energia: "Energy", "Distribuição/Retalho energético": "Energy distribution/retail", "Eficiência energética/Serviços": "Energy efficiency/services",
    "Hotelaria e Turismo": "Hospitality and Tourism", Hotéis: "Hotels", Restauração: "Food service", Logística: "Logistics", "Logística/Armazenagem": "Logistics/warehousing", Transporte: "Transport",
    "Manufatura/Indústria": "Manufacturing/Industry", "Alimentar/Agroindústria": "Food/agro-industry", "Componentes automóvel": "Automotive components", Metalomecânica: "Metalworking", "Plásticos/Embalagem": "Plastics/packaging", Têxtil: "Textiles", "Maquinaria industrial": "Industrial machinery",
    Retalho: "Retail", "Retalho especializado": "Specialised retail", "Retalho generalista": "General retail", Saúde: "Healthcare", "Clínicas dentárias": "Dental clinics", "Clínicas médicas gerais": "General medical clinics", "Diagnóstico/Imagiologia": "Diagnostics/imaging", "Farmácias/Distribuição farmacêutica": "Pharmacies/pharmaceutical distribution", "Lares/Cuidados continuados": "Care homes/long-term care", "Clínicas veterinárias": "Veterinary clinics",
    "Serviços B2B": "B2B services", Consultoria: "Consulting", "Serviços profissionais": "Professional services", "Tecnologia/Software": "Technology/Software", Cibersegurança: "Cybersecurity", "Serviços de TI/Consultoria tecnológica": "IT services/technology consulting",
    "Localização única": "Single location", "2-3 localizações": "2-3 locations", "Mais de 3 localizações": "More than 3 locations", "Não aplicável": "Not applicable",
    "Exercício encerrado (contas aprovadas)": "Closed financial year (approved accounts)", "LTM — últimos 12 meses": "LTM — last 12 months", "Ano em curso anualizado": "Current year, annualised", "Estimativa de fecho do ano": "Year-end estimate", "Orçamento / plano de negócios": "Budget / business plan",
    "Nacional (<10% exportação)": "Domestic (<10% exports)", "Maioritariamente nacional (10%-35% exportação)": "Mostly domestic (10%-35% exports)", "Equilibrado (35%-65% exportação)": "Balanced (35%-65% exports)", "Maioritariamente internacional (65%-90% exportação)": "Mostly international (65%-90% exports)", "Internacional (>90% exportação)": "International (>90% exports)",
    "Baixa (0-20%)": "Low (0-20%)", "Média (20-50%)": "Medium (20-50%)", "Alta (50-100%)": "High (50-100%)", Baixa: "Low", Média: "Medium", Alta: "High", Sim: "Yes", Não: "No",
    "Venda de capital": "Equity sale", "Venda de ativos": "Asset sale", "Emissão de dívida": "Debt issuance", "Não sei / a explorar": "Not sure / to be explored", Sucessão: "Succession", Expansão: "Expansion", "Prospeção de mercado": "Market exploration", "Rentabilização do investimento": "Investment monetisation",
    "Imediato (0-6 meses)": "Immediate (0-6 months)", "1-2 anos": "1-2 years", "Sem prazo definido": "No defined timeframe", "Minoritária (<50%)": "Minority (<50%)", "Maioritária (50-90%)": "Majority (50-90%)", "Totalidade (90-100%)": "Full (90-100%)", "Ainda não decidido": "Not yet decided",
    "Saída imediata": "Immediate exit", "Transição até 12 meses": "Transition of up to 12 months", "Permanência 1-3 anos": "Remain for 1-3 years", "Permanência de longo prazo": "Long-term involvement", "Investidor estratégico (setor)": "Strategic (sector) investor", "Private equity / financeiro": "Private equity / financial", "Gestão interna (MBO)": "Internal management (MBO)", "Indiferente / a explorar": "Indifferent / to be explored",
    "Avaliação independente recente": "Recent independent valuation", "Avaliação bancária": "Bank valuation", "Estimativa do acionista": "Shareholder's estimate", "Valor contabilístico": "Book value",
  },
  es: {
    Espanha: "España", Outro: "Otro", "Outro (não listado)": "Otro (no listado)", Agroindústria: "Agroindustria", "Produção agrícola": "Producción agrícola", Construção: "Construcción", "Construção e obras públicas": "Construcción y obras públicas", "Produtos de Construção": "Productos de construcción", "Promoção imobiliária": "Promoción inmobiliaria", Energia: "Energía", "Distribuição/Retalho energético": "Distribución/venta minorista energética", "Eficiência energética/Serviços": "Eficiencia energética/servicios", "Hotelaria e Turismo": "Hostelería y Turismo", Hotéis: "Hoteles", Restauração: "Restauración", "Logística/Armazenagem": "Logística/almacenamiento", "Manufatura/Indústria": "Manufactura/Industria", "Alimentar/Agroindústria": "Alimentación/agroindustria", "Componentes automóvel": "Componentes de automoción", Metalomecânica: "Metalmecánica", "Plásticos/Embalagem": "Plásticos/embalaje", Têxtil: "Textil", Retalho: "Comercio minorista", "Retalho especializado": "Comercio minorista especializado", "Retalho generalista": "Comercio minorista generalista", Saúde: "Salud", "Clínicas dentárias": "Clínicas dentales", "Clínicas médicas gerais": "Clínicas médicas generales", "Diagnóstico/Imagiologia": "Diagnóstico/imagenología", "Farmácias/Distribuição farmacêutica": "Farmacias/distribución farmacéutica", "Lares/Cuidados continuados": "Residencias/cuidados continuados", "Clínicas veterinárias": "Clínicas veterinarias", "Serviços B2B": "Servicios B2B", Consultoria: "Consultoría", "Serviços profissionais": "Servicios profesionales", "Tecnologia/Software": "Tecnología/Software", Cibersegurança: "Ciberseguridad", "Serviços de TI/Consultoria tecnológica": "Servicios de TI/consultoría tecnológica",
    "Localização única": "Ubicación única", "2-3 localizações": "2-3 ubicaciones", "Mais de 3 localizações": "Más de 3 ubicaciones", "Não aplicável": "No aplicable", "Exercício encerrado (contas aprovadas)": "Ejercicio cerrado (cuentas aprobadas)", "Ano em curso anualizado": "Año en curso anualizado", "Estimativa de fecho do ano": "Estimación de cierre del año", "Orçamento / plano de negócios": "Presupuesto / plan de negocio", "Nacional (<10% exportação)": "Nacional (<10% exportación)", "Maioritariamente nacional (10%-35% exportação)": "Mayoritariamente nacional (10%-35% exportación)", "Equilibrado (35%-65% exportação)": "Equilibrado (35%-65% exportación)", "Maioritariamente internacional (65%-90% exportação)": "Mayoritariamente internacional (65%-90% exportación)", "Internacional (>90% exportação)": "Internacional (>90% exportación)",
    "Baixa (0-20%)": "Baja (0-20%)", "Média (20-50%)": "Media (20-50%)", "Alta (50-100%)": "Alta (50-100%)", Baixa: "Baja", Média: "Media", Sim: "Sí", Não: "No", "Venda de capital": "Venta de capital", "Venda de ativos": "Venta de activos", "Emissão de dívida": "Emisión de deuda", "Não sei / a explorar": "No lo sé / a explorar", Sucessão: "Sucesión", Expansão: "Expansión", "Prospeção de mercado": "Prospección de mercado", "Rentabilização do investimento": "Rentabilización de la inversión", "Imediato (0-6 meses)": "Inmediato (0-6 meses)", "1-2 anos": "1-2 años", "Sem prazo definido": "Sin plazo definido", "Minoritária (<50%)": "Minoritaria (<50%)", "Maioritária (50-90%)": "Mayoritaria (50-90%)", "Totalidade (90-100%)": "Totalidad (90-100%)", "Ainda não decidido": "Aún no decidido", "Saída imediata": "Salida inmediata", "Transição até 12 meses": "Transición de hasta 12 meses", "Permanência 1-3 anos": "Permanencia 1-3 años", "Permanência de longo prazo": "Permanencia a largo plazo", "Investidor estratégico (setor)": "Inversor estratégico (sector)", "Private equity / financeiro": "Private equity / financiero", "Gestão interna (MBO)": "Gestión interna (MBO)", "Avaliação independente recente": "Tasación independiente reciente", "Avaliação bancária": "Tasación bancaria", "Estimativa do acionista": "Estimación del accionista", "Valor contabilístico": "Valor contable",
  },
};

export function traduzirValorFormulario(valor: string | null | undefined, lang: ReportLang): string | null {
  if (!valor) return valor ?? null;
  return VALORES_FORMULARIO[lang][valor] ?? valor;
}

const DCF_TEXT: Record<Exclude<ReportLang, "pt">, Record<string, string>> = {
  en: {
    "CAGR da faturação (período explícito) vs. WACC": "Revenue CAGR (explicit period) vs. WACC", "CAGR receita": "Revenue CAGR",
    "Margem EBITDA média (período explícito) vs. WACC": "Average EBITDA margin (explicit period) vs. WACC", "Margem EBITDA": "EBITDA margin",
    "Crescimento na perpetuidade vs. WACC": "Perpetuity growth vs. WACC", "g terminal": "Terminal growth", "Capex (% da receita) vs. WACC": "Capex (% of revenue) vs. WACC",
    "Crescimento inicial da receita": "Initial revenue growth", "Margem EBITDA projetada": "Projected EBITDA margin", "Prémio de dimensão (PME)": "Size premium (SME)", "Prémio específico (iliquidez)": "Specific premium (illiquidity)", "Prémio específico do ativo": "Asset-specific premium", "Estrutura de capital (D / E)": "Capital structure (D / E)", "Crescimento estabilizado (anos 4-8)": "Stabilised growth (years 4-8)", "Crescimento na perpetuidade": "Perpetuity growth", "Convenção de desconto": "Discount convention",
    "Assumption": "Assumption", "Não projetado": "Not projected", "End of period convention": "End-of-period convention",
  },
  es: {
    "CAGR da faturação (período explícito) vs. WACC": "CAGR de la facturación (periodo explícito) vs. WACC", "CAGR receita": "CAGR de la facturación",
    "Margem EBITDA média (período explícito) vs. WACC": "Margen EBITDA medio (periodo explícito) vs. WACC", "Margem EBITDA": "Margen EBITDA",
    "Crescimento na perpetuidade vs. WACC": "Crecimiento a perpetuidad vs. WACC", "g terminal": "Crecimiento terminal", "Capex (% da receita) vs. WACC": "Capex (% de ingresos) vs. WACC",
    "Crescimento inicial da receita": "Crecimiento inicial de los ingresos", "Margem EBITDA projetada": "Margen EBITDA proyectado", "Prémio de dimensão (PME)": "Prima de tamaño (pyme)", "Prémio específico (iliquidez)": "Prima específica (iliquidez)", "Prémio específico do ativo": "Prima específica del activo", "Estrutura de capital (D / E)": "Estructura de capital (D / E)", "Crescimento estabilizado (anos 4-8)": "Crecimiento estabilizado (años 4-8)", "Crescimento na perpetuidade": "Crecimiento a perpetuidad", "Convenção de desconto": "Convención de descuento",
    "Assumption": "Hipótesis", "Não projetado": "No proyectado", "End of period convention": "Convención de fin de periodo",
  },
};

export function traduzirDcf(dcf: Extract<DcfResult, { ok: true }>, lang: ReportLang): Extract<DcfResult, { ok: true }> {
  if (lang === "pt") return dcf;
  const map = DCF_TEXT[lang];
  const tr = (value: string) => map[value] ?? value;
  const traduzirNota = (nota?: string) => {
    if (!nota) return nota;
    if (lang === "en") return nota
      .replace(" da receita", " of revenue")
      .replace("Convergência até ao ano 4 para o crescimento estabilizado: se o CAGR histórico estiver entre 2% e 3,5%, mantém-se; abaixo de 2% converge para 2%; acima de 3,5% fica limitado a 3,5%, alinhado com o crescimento nominal de longo prazo da economia.", "Convergence by year 4 to stabilised growth: the historical CAGR is retained between 2% and 3.5%; below 2% it converges to 2%; above 3.5% it is capped at 3.5%, in line with long-term nominal economic growth.")
      .replace("Alinhado com o objetivo de inflação de médio prazo do BCE; não assume crescimento real perpétuo.", "Aligned with the ECB's medium-term inflation target; no perpetual real growth is assumed.")
      .replace("Assume que os fluxos de caixa são gerados no final de cada período (ano), sendo descontados pelo número inteiro de anos.", "Assumes cash flows are generated at the end of each annual period and discounted by the corresponding whole number of years.")
      .replace("Margem EBITDA normalizada do último exercício (EBITDA normalizado sobre a receita do ano de referência), mantida constante ao longo do horizonte (sem ganhos de eficiência assumidos).", "Normalised EBITDA margin for the latest financial year, held constant throughout the forecast horizon with no assumed efficiency gains.");
    return nota
      .replace(" da receita", " de los ingresos")
      .replace("Convergência até ao ano 4 para o crescimento estabilizado: se o CAGR histórico estiver entre 2% e 3,5%, mantém-se; abaixo de 2% converge para 2%; acima de 3,5% fica limitado a 3,5%, alinhado com o crescimento nominal de longo prazo da economia.", "Convergencia hasta el año 4 hacia el crecimiento estabilizado: se mantiene el CAGR histórico entre el 2% y el 3,5%; por debajo del 2% converge al 2%; por encima del 3,5% se limita al 3,5%, en línea con el crecimiento nominal de la economía a largo plazo.")
      .replace("Alinhado com o objetivo de inflação de médio prazo do BCE; não assume crescimento real perpétuo.", "Alineado con el objetivo de inflación a medio plazo del BCE; no presupone crecimiento real perpetuo.")
      .replace("Assume que os fluxos de caixa são gerados no final de cada período (ano), sendo descontados pelo número inteiro de anos.", "Supone que los flujos de caja se generan al final de cada periodo anual y se descuentan por el número entero de años correspondiente.")
      .replace("Margem EBITDA normalizada do último exercício (EBITDA normalizado sobre a receita do ano de referência), mantida constante ao longo do horizonte (sem ganhos de eficiência assumidos).", "Margen EBITDA normalizado del último ejercicio, mantenido constante durante todo el horizonte sin asumir mejoras de eficiencia.");
  };
  return {
    ...dcf,
    matrizes: dcf.matrizes.map((m) => ({ ...m, titulo: tr(m.titulo), eixo_x_label: tr(m.eixo_x_label), eixo_y_label: tr(m.eixo_y_label) })),
    pressupostos: dcf.pressupostos.map((p) => ({ ...p, label: tr(p.label), valor: tr(p.valor).replace(lang === "en" ? " da receita" : " da receita", lang === "en" ? " of revenue" : " de los ingresos"), origem: tr(p.origem) as typeof p.origem, nota: traduzirNota(p.nota) })),
  };
}

export const DIMENSAO_MAP: Record<string, keyof ReturnType<typeof t>["engine"]["dimensoes"]> = {
  "Histórico financeiro": "historicoFinanceiro",
  "Qualidade do EBITDA": "qualidadeEbitda",
  "Posição financeira": "posicaoFinanceira",
  "Enquadramento setorial": "enquadramentoSetorial",
  "Perfil de risco": "perfilRisco",
};

export const ITEM_CONFIANCA_MAP: Record<string, keyof ReturnType<typeof t>["engine"]["itensConfianca"]> = {
  "Faturação do ano de referência": "faturacaoAnoReferencia",
  "Faturação do ano anterior": "faturacaoAnoAnterior",
  "Faturação de há três anos": "faturacaoTresAnos",
  "EBITDA do ano anterior": "ebitdaAnoAnterior",
  "EBITDA de há três anos": "ebitdaTresAnos",
  "Tipo de período de referência": "tipoPeriodoReferencia",
  "Despesas extraordinárias identificadas": "despesasExtraordinariasIdentificadas",
  "Enquadramento do imóvel de operação": "enquadramentoImovel",
  "Capex anual recorrente": "capexAnualRecorrente",
  "Caixa e depósitos": "caixaDepositos",
  "Dívida financeira": "dividaFinanceira",
  "Indústria identificada": "industriaIdentificada",
  "Sub-indústria identificada": "subindustriaIdentificada",
  "Atividade principal descrita": "atividadePrincipalDescrita",
  "Concentração dos 5 maiores clientes": "concentracaoTop5",
  "Peso do maior cliente": "pesoMaiorCliente",
  "Unidades / localizações": "unidadesLocalizacoes",
  "Geografia dos clientes": "geografiaClientes",
  "Dependência do acionista (faturação)": "depFaturacao",
  "Dependência do acionista (gestão)": "depGestao",
};
