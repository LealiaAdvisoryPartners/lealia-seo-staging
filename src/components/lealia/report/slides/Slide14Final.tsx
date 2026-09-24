import logo from "@/assets/lealia-logo.png";
import type { ReportData } from "@core/report-data";
import { type ReportLang, t } from "@core/report-i18n";
import { Page } from "../primitives";

export function Slide14Final({ d, lang }: { d: ReportData; lang: ReportLang }) {
  const dict = t(lang).doc;
  return (
    <Page numero={14} titulo={dict.p14.titulo} id="agendar" lang={lang}>
      <div className="report-final">
        <div className="report-final-left">
          <h2 className="report-closing-title">{dict.p14.obrigado}</h2>
          <p className="report-closing-lead">{dict.p14.lead}</p>

          <div className="report-next-step-card report-final-card">
            <strong>{dict.p14.proximoPassoTitulo}</strong>
            <p>{dict.p14.proximoPassoDesc}</p>
            <a
              href="https://calendly.com/lealiaap-drp/valuationcall"
              target="_blank"
              rel="noreferrer"
              className="report-next-step-btn"
            >
              {dict.p14.agendarReuniao}
            </a>
          </div>

          <div className="report-final-brand">
            <img src={logo} alt="Lealia Advisory Partners" className="report-contacts-logo" />
            <ul className="report-contact-list">
              <li>
                <a href="https://lealiaap.com" target="_blank" rel="noreferrer">
                  lealiaap.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/lealia-ap" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:geral@lealiaap.com">geral@lealiaap.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="report-final-right">
          <span className="report-final-eyebrow">{dict.p14.contactos}</span>

          <div className="report-contact-card">
            <strong>Ricardo Nascimento Ferreira</strong>
            <span>{dict.p14.managingPartner}</span>
            <ul className="report-contact-list">
              <li>
                <a href="mailto:ricardo.ferreira@lealiaap.com">ricardo.ferreira@lealiaap.com</a>
              </li>
              <li>
                <a href="tel:+351917179408">+351 917 179 408</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ricardo-a-n-ferreira" target="_blank" rel="noreferrer">
                  linkedin.com/in/ricardo-a-n-ferreira
                </a>
              </li>
            </ul>
          </div>

          <div className="report-contact-card">
            <strong>Duarte Rocha Pereira</strong>
            <span>{dict.p14.managingPartner}</span>
            <ul className="report-contact-list">
              <li>
                <a href="mailto:duarte.pereira@lealiaap.com">duarte.pereira@lealiaap.com</a>
              </li>
              <li>
                <a href="tel:+351935882323">+351 935 882 323</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/duarte-rocha-pereira" target="_blank" rel="noreferrer">
                  linkedin.com/in/duarte-rocha-pereira
                </a>
              </li>
            </ul>
          </div>

          <p className="report-closing-note">{dict.p14.notaFinal(d.empresa)}</p>
        </div>
      </div>
    </Page>
  );
}
