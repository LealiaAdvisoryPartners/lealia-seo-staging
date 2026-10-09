import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import { faqCopy } from "@/translations/faq";

const FAQ = () => {
  const { language } = useLanguage();
  const copy = faqCopy[language];

  const url = `https://www.lealiaap.com/${language}/faq`;
  const org = { "@type": "ProfessionalService", name: "Lealia Advisory Partners", url: "https://www.lealiaap.com" };
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    name: copy.heading,
    description: copy.lead,
    inLanguage: language,
    isPartOf: { "@type": "WebSite", name: org.name, url: org.url },
    publisher: org,
    about: ["Mergers and acquisitions", "Company valuation", "Selling a business", "Buying a business"],
    mainEntity: copy.categorias.flatMap((c) =>
      c.itens.map((i) => ({
        "@type": "Question",
        name: i.q,
        inLanguage: language,
        acceptedAnswer: { "@type": "Answer", text: i.a, author: org },
      })),
    ),
  };

  return (
    <>
      <SEOHead slug="faq" />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1 className="section-title mt-5 text-4xl md:text-6xl">{copy.heading}</h1>
        <p className="mt-6 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">{copy.lead}</p>
        <div className="mt-6 h-px w-16 bg-accent" />

        {copy.categorias.map((c) => (
          <div key={c.titulo} className="mt-16">
            <h2 className="section-title text-2xl md:text-3xl">{c.titulo}</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {c.itens.map((i) => (
                <details key={i.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base md:text-lg">
                    <h3 className="font-normal">{i.q}</h3>
                    <span className="text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="body-justified mt-4 text-sm font-light leading-relaxed text-muted-foreground md:text-base">{i.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default FAQ;
