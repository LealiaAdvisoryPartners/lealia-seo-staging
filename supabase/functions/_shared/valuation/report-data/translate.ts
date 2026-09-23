// Mapeadores de textos gerados pelo motor de cálculo (chaves canónicas em PT)
// para os três idiomas do relatório.
import { t, type ReportLang } from "../report-i18n/index.ts";
import type { Ajuste, Confianca } from "../valuation.ts";

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
