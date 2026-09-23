import * as React from "react";
import logo from "@/assets/lealia-logo.png";
import { t, type ReportLang } from "@core/report-i18n";

export const EmpresaContext = React.createContext<string>("");

export function Page({
  numero,
  titulo,
  id,
  className,
  children,
  empresaOverride,
  lang,
}: {
  numero: number;
  titulo?: string;
  id?: string;
  className?: string;
  children: React.ReactNode;
  empresaOverride?: string;
  lang: ReportLang;
}) {
  const empresaCtx = React.useContext(EmpresaContext);
  const empresa = empresaOverride ?? empresaCtx;
  return (
    <section className={`report-page${className ? ` ${className}` : ""}`} id={id}>
      <header className="report-head">
        <img src={logo} alt="Lealia Advisory Partners" className="h-6 w-auto" />
        {titulo ? <span className="report-head-title">{titulo}</span> : null}
      </header>
      <div className="report-body">{children}</div>
      <footer className="report-foot">
        <span>{t(lang).doc.footer(empresa)}</span>
        <span>{numero}</span>
      </footer>
    </section>
  );
}

export const H = ({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <h2 className={`report-h2${className ? ` ${className}` : ""}`} style={style}>
    {children}
  </h2>
);

export const Kv = ({ label, value }: { label: React.ReactNode; value: React.ReactNode }) => (
  <div className="report-kv">
    <span>{label}</span>
    <span className="report-kv-value">{value}</span>
  </div>
);
