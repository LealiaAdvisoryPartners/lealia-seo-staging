import { useSearchParams } from "react-router-dom";
import SEOHead from "@/components/SEOHead";
import { UpgradeCheckout } from "@/components/lealia/checkout/UpgradeCheckout";
import { useLanguage } from "@/contexts/LanguageContext";
import { checkoutCopy } from "@/translations/checkout";

/** Checkout do relatório completo: /{idioma}/upgrade?ref=empresa-abcd */
const Upgrade = () => {
  const [params] = useSearchParams();
  const { language } = useLanguage();
  const c = checkoutCopy[language];
  const referencia = params.get("ref");

  return (
    <>
      <SEOHead slug="upgrade" />
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        {referencia ? (
          <UpgradeCheckout referencia={referencia} reportUrl={`/${referencia}`} />
        ) : (
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="section-title mt-5 text-3xl md:text-5xl">{c.heading}</h1>
            <p className="mt-6 text-sm leading-relaxed font-light text-muted-foreground">{c.errors.missingRef}</p>
          </div>
        )}
      </section>
    </>
  );
};

export default Upgrade;
