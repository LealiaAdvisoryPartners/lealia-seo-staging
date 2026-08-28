-- Schedules the "enviar-relatorios" edge function to run every 15 minutes.
--
-- Plain-language summary: every 15 minutes, this job asks the database to check
-- which valuation reports are due to be emailed to leads (their scheduled send
-- time has arrived) and triggers the "enviar-relatorios" edge function to send
-- up to 20 of them. The edge function itself has built-in idempotency (it
-- reserves each lead row before sending) so a lead is never emailed twice even
-- if this cron job overlaps a previous run.
--
-- Trade-off: a 15-minute cadence means a report can be sent up to ~15 minutes
-- later than its exact scheduled time, and pg_cron/pg_net will make a tiny
-- HTTP call every 15 minutes (~96 calls/day) even when there is nothing to
-- send. This is a reasonable balance between timeliness and the recurring
-- cost of invoking the function; a tighter schedule (e.g. every minute) would
-- reduce delay but multiply the number of invocations (and their cost)
-- roughly 15x for no real user-facing benefit, since the email itself is
-- already deliberately deferred by several hours.

create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

select cron.unschedule(jobid)
from cron.job
where jobname = 'enviar-relatorios-every-15-min';

select cron.schedule(
  'enviar-relatorios-every-15-min',
  '*/15 * * * *',
  $$
  select net.http_post(
    url := 'https://bayjhgwdkqxgnhfqclyq.supabase.co/functions/v1/enviar-relatorios',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer sb_publishable_ELJ5CDRxTDCjRlZVvGjwFg_N2FQMuDA'
    ),
    body := '{}'::jsonb
  );
  $$
);
