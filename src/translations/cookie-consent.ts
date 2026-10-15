/**
 * Textos do banner de cookies. SUJEITO A VALIDAÇÃO JURÍDICA ANTES DE PUBLICAÇÃO.
 */
import type { Language } from "@/lib/routing";

type Copy = {
  title: string;
  text: string;
  acceptAll: string;
  rejectOptional: string;
  configure: string;
  save: string;
  close: string;
  privacyLink: string;
  footerLink: string;
  alwaysOn: string;
  categories: Record<"necessary" | "analytics" | "marketing" | "experience", { name: string; desc: string }>;
};

export const cookieCopy: Record<Language, Copy> = {
  pt: {
    title: "Cookies e privacidade",
    text: "Usamos armazenamento estritamente necessário para o site funcionar. Com a sua autorização, usaremos também cookies de analítica, marketing e experiência. Pode alterar a escolha a qualquer momento em “Definições de cookies”, no rodapé.",
    acceptAll: "Aceitar todos",
    rejectOptional: "Recusar opcionais",
    configure: "Configurar",
    save: "Guardar escolha",
    close: "Fechar",
    privacyLink: "Política de privacidade",
    footerLink: "Definições de cookies",
    alwaysOn: "Sempre ativos",
    categories: {
      necessary: { name: "Necessários", desc: "Idioma, escolha de cookies, progresso do formulário e segurança. Não podem ser desativados." },
      analytics: { name: "Analítica", desc: "Medir visitas e utilização do site de forma agregada (Google Analytics, quando ativado)." },
      marketing: { name: "Marketing", desc: "Medir campanhas e conversões (Google Ads, LinkedIn, quando ativados)." },
      experience: { name: "Experiência", desc: "Perceber como o site é usado para o melhorar (Microsoft Clarity, quando ativado)." },
    },
  },
  en: {
    title: "Cookies and privacy",
    text: "We use strictly necessary storage to make the site work. With your permission, we will also use analytics, marketing and experience cookies. You can change your choice at any time under “Cookie settings” in the footer.",
    acceptAll: "Accept all",
    rejectOptional: "Reject optional",
    configure: "Configure",
    save: "Save choice",
    close: "Close",
    privacyLink: "Privacy policy",
    footerLink: "Cookie settings",
    alwaysOn: "Always on",
    categories: {
      necessary: { name: "Necessary", desc: "Language, cookie choice, form progress and security. Cannot be turned off." },
      analytics: { name: "Analytics", desc: "Measure visits and site usage in aggregate (Google Analytics, when enabled)." },
      marketing: { name: "Marketing", desc: "Measure campaigns and conversions (Google Ads, LinkedIn, when enabled)." },
      experience: { name: "Experience", desc: "Understand how the site is used to improve it (Microsoft Clarity, when enabled)." },
    },
  },
  es: {
    title: "Cookies y privacidad",
    text: "Utilizamos almacenamiento estrictamente necesario para que el sitio funcione. Con su permiso, también usaremos cookies de analítica, marketing y experiencia. Puede cambiar su elección en cualquier momento en “Configuración de cookies”, en el pie de página.",
    acceptAll: "Aceptar todas",
    rejectOptional: "Rechazar opcionales",
    configure: "Configurar",
    save: "Guardar elección",
    close: "Cerrar",
    privacyLink: "Política de privacidad",
    footerLink: "Configuración de cookies",
    alwaysOn: "Siempre activas",
    categories: {
      necessary: { name: "Necesarias", desc: "Idioma, elección de cookies, progreso del formulario y seguridad. No se pueden desactivar." },
      analytics: { name: "Analítica", desc: "Medir visitas y uso del sitio de forma agregada (Google Analytics, cuando esté activado)." },
      marketing: { name: "Marketing", desc: "Medir campañas y conversiones (Google Ads, LinkedIn, cuando estén activados)." },
      experience: { name: "Experiencia", desc: "Entender cómo se usa el sitio para mejorarlo (Microsoft Clarity, cuando esté activado)." },
    },
  },
};
