-- Atribuição de campanhas (first/last touch) nos leads de avaliação.
-- Rollback: ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_atribuicao_formato; ALTER TABLE public.leads DROP COLUMN IF EXISTS atribuicao;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS atribuicao jsonb;
ALTER TABLE public.leads ADD CONSTRAINT leads_atribuicao_formato CHECK (
  atribuicao IS NULL OR (
    jsonb_typeof(atribuicao) = 'object'
    AND pg_column_size(atribuicao) <= 4096
    AND (atribuicao - 'first_touch' - 'last_touch') = '{}'::jsonb
  )
);
COMMENT ON COLUMN public.leads.atribuicao IS 'Origem da visita: {first_touch, last_touch} com campos autorizados (utm_*, gclid, gbraid, wbraid, msclkid, li_fat_id, landing_page, referrer, captured_at). Sem dados pessoais. Validado em registar-lead.';