export function ThankYouCard({
  empresa,
  calculoPossivel,
  onAgendar,
}: {
  empresa: string;
  calculoPossivel: boolean;
  onAgendar: () => void;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="flex justify-center">
        <span className="eyebrow">Submissão recebida</span>
      </p>
      <h2 className="section-title mt-4 text-3xl md:text-5xl">Obrigado pela sua submissão</h2>

      <div className="card-elegant mt-10 p-8 text-left sm:p-12">
        {calculoPossivel ? (
          <>
            <p className="body-justified text-sm leading-relaxed font-light text-muted-foreground">
              Recebemos os dados{empresa ? <> da <strong className="font-normal text-foreground">{empresa}</strong></> : null}. A
              nossa equipa vai agora trabalhar a informação submetida e enviamos-lhe o relatório de
              avaliação indicativa, por email, assim que estiver finalizado.
            </p>
            <p className="body-justified mt-5 text-sm leading-relaxed font-light text-muted-foreground">
              Para qualquer questão entretanto, pode contactar-nos através de{" "}
              <a href="mailto:valuations@lealiaap.com" className="text-accent underline">
                valuations@lealiaap.com
              </a>
              .
            </p>

            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="eyebrow">Próximo passo — reunião de 20 minutos</p>
              <p className="body-justified mt-3 text-sm font-light text-muted-foreground">
                Apresentação e discussão do relatório completo com um Managing Partner.
              </p>
              <button className="btn-primary mt-6" onClick={onAgendar}>
                Agendar reunião
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="body-justified text-sm leading-relaxed font-light text-muted-foreground">
              Recebemos os dados{empresa ? <> da <strong className="font-normal text-foreground">{empresa}</strong></> : null}. A
              informação indicada não permite, nesta fase, uma estimativa automática fiável pelo
              método de múltiplo de EBITDA.
            </p>
            <p className="body-justified mt-5 text-sm leading-relaxed font-light text-muted-foreground">
              Isto não significa que não tenha valor: fale connosco para analisarmos a situação
              específica e ajudarmos com um processo de avaliação personalizado.
            </p>

            <div className="mt-8 border-t border-border pt-8 text-center">
              <p className="eyebrow">Próximo passo — reunião de 20 minutos</p>
              <p className="body-justified mt-3 text-sm font-light text-muted-foreground">
                Vamos analisar o perfil da sua empresa e apresentar as opções de avaliação mais
                adequadas.
              </p>
              <button className="btn-primary mt-6" onClick={onAgendar}>
                Falar com a equipa
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
