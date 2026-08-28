import SEOHead, { pageMeta } from "@/components/SEOHead";
import { AvaliacaoTool } from "@/components/lealia/AvaliacaoTool";

const Valuation = () => {
  return (
    <>
      <SEOHead
        titleKey={pageMeta.valuation.titleKey}
        descriptionKey={pageMeta.valuation.descriptionKey}
        path="valuation"
      />
      <AvaliacaoTool />
    </>
  );
};

export default Valuation;
