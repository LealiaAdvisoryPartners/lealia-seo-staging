const SECCOES = [
  {
    numero: "01",
    titulo: "Sumário executivo",
    texto:
      "Síntese da posição da empresa, range de Enterprise Value e de Equity Value indicativos e pontos fulcrais da análise.",
  },
  {
    numero: "02",
    titulo: "Perfil da empresa e outros indicadores",
    texto:
      "Retrato do negócio, evolução de faturação e EBITDA dos últimos exercícios, posição líquida e outros indicadores operacionais relevantes.",
  },
  {
    numero: "03",
    titulo: "Qualidade dos resultados",
    texto:
      "Normalização do EBITDA, tratamento de despesas extraordinárias e leitura da sustentabilidade da margem ao longo do período analisado.",
  },
  {
    numero: "04",
    titulo: "Método e alternativas",
    texto:
      "Enquadramente e explicação da metodologia aplicada e comparativo face a abordagens alternativas de avaliação.",
  },
  {
    numero: "05",
    titulo: "Ajustes ao múltiplo",
    texto:
      "Detalhe de cada ajuste aplicado ao múltiplo base do setor: dimensão, crescimento, recorrência, concentração de clientes e dependência da gestão.",
  },
  {
    numero: "06",
    titulo: "Cenários e sensibilidade",
    texto:
      "Análise de sensibilidade do Enterprise Value a variações de EBITDA e de múltiplo, com cenários conservador, base e otimista.",
  },
  {
    numero: "07",
    titulo: "Equity Bridge e contexto da transação",
    texto:
      "Passagem de Enterprise Value a Equity Value — dívida, caixa e imóvel no perímetro — e leitura e enquadramento da estrutura de transação pretendida.",
  },
  {
    numero: "08",
    titulo: "Drivers de valor",
    texto:
      "Identificação e sugestão de plano de ação sobre os principais fatores que expandem ou comprimem o valor do negócio.",
  },
  {
    numero: "09",
    titulo: "Preparação para o mercado",
    texto:
      "Alterações de implementação imediata para maximizar o valor do negócio, com prioridades e horizonte de execução.",
  },
];

export function SampleReport({ onAgendar }: { onAgendar: () => void }) {
  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SECCOES.map((s) => (
          <div key={s.numero} className="card-elegant p-8">
            <span className="num-index">{s.numero}</span>
            <h3 className="mt-3 text-xl">{s.titulo}</h3>
            <p className="body-justified mt-3 text-sm leading-relaxed font-light text-muted-foreground">{s.texto}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <button className="btn-primary" onClick={onAgendar}>
          Quero o relatório completo e uma análise personalizada
        </button>
      </div>
    </div>
  );
}
