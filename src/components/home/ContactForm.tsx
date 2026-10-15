import { useRef } from "react";
import { motion } from "framer-motion";
import { pushEvent } from "@/lib/tracking/datalayer";
import { getAttribution } from "@/lib/tracking/attribution";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const formSchema = z.object({
    name: z.string().min(2, t("contact.name.error")),
    email: z.string().email(t("contact.email.error")),
    company: z.string().optional(),
    message: z.string().min(10, t("contact.message.error")),
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const iniciado = useRef(false);
  const onStart = () => {
    if (iniciado.current) return;
    iniciado.current = true;
    pushEvent("form_start", { form_name: "contact" });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    formData.append('form-name', 'contact');
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    // Origem da visita (campo escondido, só campos autorizados, sem dados pessoais).
    const atribuicao = getAttribution();
    formData.append('attribution', atribuicao ? JSON.stringify(atribuicao) : '');

    try {
      const response = await fetch(window.location.pathname || '/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any),
      });

      if (response.ok) {
        pushEvent("form_submit", { form_name: "contact" });
        toast({
          title: t("contact.success.title"),
          description: t("contact.success.desc"),
        });
        form.reset();
        iniciado.current = false;
      } else {
        pushEvent("form_error", { form_name: "contact" });
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      pushEvent("form_error", { form_name: "contact" });
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* soft top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full"
        style={{ background: "radial-gradient(circle, hsl(var(--accent) / 0.10), transparent 70%)" }}
      />

      <div className="section-container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="eyebrow mb-6">{t("contact.title")}</span>
            <h2 className="section-title mt-6">
              Let's <span className="serif-accent text-accent">talk</span>.
            </h2>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-sm text-muted-foreground" style={{ letterSpacing: "0.12em" }}>
              <a href="mailto:geral@lealiaap.com" className="hover:text-accent transition-colors link-underline">
                GERAL@LEALIAAP.COM
              </a>
              <span className="hidden sm:inline text-border">·</span>
              <a href="tel:+351935882323" className="hover:text-accent transition-colors link-underline">
                +351 935 882 323
              </a>
            </div>
          </div>

          <div className="relative gradient-border p-8 md:p-10" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, () => pushEvent("form_error", { form_name: "contact" }))}
                onFocusCapture={onStart}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{t("contact.name")} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.name.placeholder")} {...field} className="rounded-lg border-border/70 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{t("contact.email")} *</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.email.placeholder")} {...field} className="rounded-lg border-border/70 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{t("contact.company")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("contact.company.placeholder")} {...field} className="rounded-lg border-border/70 h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">{t("contact.message")} *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t("contact.message.placeholder")}
                          className="min-h-[140px] rounded-lg border-border/70"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="btn-gold w-full h-12">
                  {t("contact.submit")}
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
