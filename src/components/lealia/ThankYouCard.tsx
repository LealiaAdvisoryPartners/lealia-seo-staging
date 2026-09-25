import { useLanguage } from "@/contexts/LanguageContext";
import { pageCopy } from "@/translations/valuation-page";
import { calendlyLinkProps } from "@/lib/calendly";

export function ThankYouCard({
  empresa,
  calculoPossivel,
}: {
  empresa: string;
  calculoPossivel: boolean;
}) {
  const { language } = useLanguage();
  const c = pageCopy[language].thankYou;

  return (
    <div className="w-full">
      <p className="flex">
        <span className="eyebrow">{c.eyebrow}</span>
      </p>
      <h2 className="section-title mt-4 text-3xl md:text-5xl">{c.heading}</h2>

      <div className="card-elegant mt-8 p-8 text-left sm:p-10">
        {calculoPossivel ? (
          <>
            <p className="body-justified text-sm leading-relaxed font-light text-muted-foreground">
              {c.ok.p1Prefix}
              {empresa ? (
                <>
                  {c.ok.p1CompanyPrefix}
                  <strong className="font-normal text-foreground">{empresa}</strong>
                </>
              ) : null}
              {c.ok.p1Suffix}
            </p>
            <p className="body-justified mt-5 text-sm leading-relaxed font-light text-muted-foreground">
              {c.ok.p2Prefix}{" "}
              <a href={`mailto:${c.ok.email}`} className="text-accent underline">
                {c.ok.email}
              </a>
              .
            </p>

            <div className="mt-8 border-t border-border pt-8">
              <p className="eyebrow">{c.ok.nextStepEyebrow}</p>
              <p className="body-justified mt-3 text-sm font-light text-muted-foreground">{c.ok.nextStepText}</p>
              <a className="btn-primary mt-6 inline-block" {...calendlyLinkProps}>
                {c.ok.cta}
              </a>
            </div>
          </>
        ) : (
          <>
            <p className="body-justified text-sm leading-relaxed font-light text-muted-foreground">
              {c.notOk.p1Prefix}
              {empresa ? (
                <>
                  {c.notOk.p1CompanyPrefix}
                  <strong className="font-normal text-foreground">{empresa}</strong>
                </>
              ) : null}
              {c.notOk.p1Suffix}
            </p>
            <p className="body-justified mt-5 text-sm leading-relaxed font-light text-muted-foreground">
              {c.notOk.p2}
            </p>

            <div className="mt-8 border-t border-border pt-8">
              <p className="eyebrow">{c.notOk.nextStepEyebrow}</p>
              <p className="body-justified mt-3 text-sm font-light text-muted-foreground">{c.notOk.nextStepText}</p>
              <a className="btn-primary mt-6 inline-block" {...calendlyLinkProps}>
                {c.notOk.cta}
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
