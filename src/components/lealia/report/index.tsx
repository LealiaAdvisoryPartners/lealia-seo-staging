import type { ReportData } from "@core/report-data";
import { type ReportLang } from "@core/report-i18n";
import { EmpresaContext } from "./primitives";
import { Cover } from "./slides/Cover";
import { Slide02Sumario } from "./slides/Slide02Sumario";
import { Slide03Perfil } from "./slides/Slide03Perfil";
import { Slide04Ambito } from "./slides/Slide04Ambito";
import { Slide05Metodo } from "./slides/Slide05Metodo";
import { Slide06Ajustes } from "./slides/Slide06Ajustes";
import { Slide07Cenarios } from "./slides/Slide07Cenarios";
import { Slide08Bridge } from "./slides/Slide08Bridge";
import { Slide09Drivers } from "./slides/Slide09Drivers";
import { Slide12Plano } from "./slides/Slide12Plano";
import { Slide13Processo } from "./slides/Slide13Processo";
import { Slide14Final } from "./slides/Slide14Final";
import { DcfPage } from "./DcfPage";
import { SensitivityPage } from "./SensitivityPage";
import { lockedPages, LockedPage } from "./LockedPage";

export type ReportModo = "completo" | "teaser";

export function ReportDocument({ d, modo = "completo" }: { d: ReportData; modo?: ReportModo }) {
  const lang: ReportLang = (d as { lang?: ReportLang }).lang ?? "pt";

  return (
    <EmpresaContext.Provider value={d.empresa}>
      <article className="report-doc">
        <Cover d={d} lang={lang} />
        <Slide02Sumario d={d} lang={lang} />
        <Slide03Perfil d={d} lang={lang} />

        {modo === "completo" ? (
          <>
            <Slide04Ambito d={d} lang={lang} />
            <Slide05Metodo lang={lang} />
            <Slide06Ajustes d={d} lang={lang} />
            <Slide07Cenarios d={d} lang={lang} />
            <Slide08Bridge d={d} lang={lang} />
            <Slide09Drivers d={d} lang={lang} />
            <DcfPage d={d} numero={10} lang={lang} />
            <SensitivityPage d={d} numero={11} lang={lang} />
            <Slide12Plano d={d} lang={lang} />
            <Slide13Processo lang={lang} />
          </>
        ) : (
          lockedPages(lang).map((p) => <LockedPage key={p.numero} numero={p.numero} titulo={p.titulo} lang={lang} />)
        )}

        <Slide14Final d={d} lang={lang} />
      </article>
    </EmpresaContext.Provider>
  );
}
