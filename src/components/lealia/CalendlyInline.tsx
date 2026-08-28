import { useEffect, useRef, useState } from "react";

type Props = {
  url: string;
  className?: string;
};

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/** Official Calendly inline widget — brandado e sem o chrome do site do Calendly. */
export function CalendlyInline({ url, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      if ((window as unknown as { Calendly?: unknown }).Calendly) setReady(true);
      else existing.addEventListener("load", () => setReady(true), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.addEventListener("load", () => setReady(true), { once: true });
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    const Calendly = (window as unknown as {
      Calendly?: { initInlineWidget: (o: Record<string, unknown>) => void };
    }).Calendly;
    if (!ready || !Calendly || !ref.current) return;
    ref.current.innerHTML = "";
    Calendly.initInlineWidget({
      url: `${url}?hide_gdpr_banner=1&hide_landing_page_details=1&hide_event_type_details=1&background_color=ffffff&text_color=0e1b2c&primary_color=b08d4f`,
      parentElement: ref.current,
      prefill: {},
      utm: {},
    });
  }, [ready, url]);

  return (
    <div className={className}>
      <div ref={ref} className="h-[560px] w-full [&_iframe]:!h-full [&_iframe]:!w-full" />
      {!ready && (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          A carregar agenda…
        </div>
      )}
    </div>
  );
}
