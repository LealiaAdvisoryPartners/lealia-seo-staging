-- 1. Estado da submissão no lead existente
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'pending',
  ADD COLUMN IF NOT EXISTS full_report_token uuid NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS full_report_pago_em timestamp with time zone;

ALTER TABLE public.leads
  DROP CONSTRAINT IF EXISTS leads_status_check;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_status_check
  CHECK (status IN ('pending', 'sample_sent', 'full_paid'));

CREATE INDEX IF NOT EXISTS leads_status_idx ON public.leads (status);
CREATE UNIQUE INDEX IF NOT EXISTS leads_full_report_token_idx ON public.leads (full_report_token);

-- Backfill coerente: quem já recebeu o resumo fica marcado como tal.
UPDATE public.leads
   SET status = 'sample_sent'
 WHERE email_relatorio_enviado_em IS NOT NULL
   AND status = 'pending';

-- 2. Pagamentos
CREATE TABLE IF NOT EXISTS public.payments (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  ifthenpay_order_id varchar(15) NOT NULL UNIQUE,
  method text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  amount numeric(10,2) NOT NULL DEFAULT 299.00,
  currency text NOT NULL DEFAULT 'EUR',
  request_id text,
  payment_details jsonb,
  nif text,
  nome_fiscal text,
  morada_fiscal text,
  fatura_estado text NOT NULL DEFAULT 'nao_aplicavel',
  fatura_referencia text,
  paid_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT payments_method_check CHECK (method IN ('mbway', 'credit_card')),
  CONSTRAINT payments_status_check CHECK (status IN ('pending', 'paid', 'expired', 'failed')),
  CONSTRAINT payments_fatura_estado_check CHECK (fatura_estado IN ('nao_aplicavel', 'pendente', 'emitida', 'falhada'))
);

GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pagamentos sao geridos apenas pelo servidor"
  ON public.payments FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS payments_submission_id_idx ON public.payments (submission_id);
CREATE INDEX IF NOT EXISTS payments_status_idx ON public.payments (status);

-- 3. Registo de eventos
CREATE TABLE IF NOT EXISTS public.submission_audit_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  payment_id uuid REFERENCES public.payments(id) ON DELETE SET NULL,
  event text NOT NULL,
  details jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.submission_audit_logs TO service_role;
ALTER TABLE public.submission_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Registo de eventos e gerido apenas pelo servidor"
  ON public.submission_audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS submission_audit_logs_submission_id_idx
  ON public.submission_audit_logs (submission_id, created_at DESC);

-- 4. updated_at automático
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 5. Vista de consulta rápida (service_role apenas)
CREATE OR REPLACE VIEW public.submission_overview AS
SELECT
  l.id                            AS submission_id,
  l.created_at                    AS submetido_em,
  l.empresa,
  l.nome,
  l.email,
  l.idioma,
  l.status                        AS estado_submissao,
  l.email_relatorio_agendado_para AS resumo_agendado_para,
  l.email_relatorio_enviado_em    AS resumo_enviado_em,
  l.relatorio_slug,
  l.full_report_pago_em,
  p.id                            AS payment_id,
  p.ifthenpay_order_id,
  p.method                        AS metodo_pagamento,
  p.status                        AS estado_pagamento,
  p.amount                        AS valor,
  p.paid_at
FROM public.leads l
LEFT JOIN LATERAL (
  SELECT *
    FROM public.payments pp
   WHERE pp.submission_id = l.id
   ORDER BY (pp.status = 'paid') DESC, pp.created_at DESC
   LIMIT 1
) p ON true;

REVOKE ALL ON public.submission_overview FROM anon, authenticated;
GRANT SELECT ON public.submission_overview TO service_role;