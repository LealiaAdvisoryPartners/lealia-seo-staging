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

export function ReportDocument({
  d,
  modo = "completo",
  upgradeUrl,
}: {
  d: ReportData;
  modo?: ReportModo;
  upgradeUrl?: string;
}) {
  const lang: ReportLang = (d as { lang?: ReportLang }).lang ?? "pt";
  const bloqueadas = new Map(lockedPages(lang).map((pagina) => [pagina.numero, pagina.titulo]));
  const paginaBloqueada = (numero: number) => {
    const titulo = bloqueadas.get(numero);
    return titulo ? <LockedPage numero={numero} titulo={titulo} lang={lang} upgradeUrl={upgradeUrl} /> : null;
  };

  return (
    <EmpresaContext.Provider value={d.empresa}>
      <article className="report-doc">
        <Cover d={d} lang={lang} />
        {modo === "completo" ? <Slide02Sumario d={d} lang={lang} /> : paginaBloqueada(2)}
        <Slide03Perfil d={d} lang={lang} />
        <Slide04Ambito d={d} lang={lang} />
        <Slide05Metodo lang={lang} />
        <Slide06Ajustes d={d} lang={lang} />
        {modo === "completo" ? <Slide07Cenarios d={d} lang={lang} /> : paginaBloqueada(7)}
        {modo === "completo" ? <Slide08Bridge d={d} lang={lang} /> : paginaBloqueada(8)}
        {modo === "completo" ? <Slide09Drivers d={d} lang={lang} /> : paginaBloqueada(9)}
        {modo === "completo" ? <DcfPage d={d} numero={10} lang={lang} /> : paginaBloqueada(10)}
        {modo === "completo" ? <SensitivityPage d={d} numero={11} lang={lang} /> : paginaBloqueada(11)}
        {modo === "completo" ? <Slide12Plano d={d} lang={lang} /> : paginaBloqueada(12)}
        <Slide13Processo lang={lang} />
        <Slide14Final d={d} lang={lang} />
      </article>
    </EmpresaContext.Provider>
  );
}
