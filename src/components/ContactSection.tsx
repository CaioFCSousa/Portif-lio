import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Endereço de email inválido").max(255),
  subject: z.string().trim().min(3, "Assunto deve ter pelo menos 3 caracteres").max(150),
  message: z
    .string()
    .trim()
    .min(20, "Mensagem deve ter pelo menos 20 caracteres")
    .max(2000),
});

type FormData = z.infer<typeof contactSchema>;
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const validate = (): boolean => {
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const errs: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormData;
        errs[key] = issue.message;
      });
      setErrors(errs);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    // Simulate async send
    await new Promise((res) => setTimeout(res, 1500));
    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const fields: Array<{
    key: keyof FormData;
    label: string;
    placeholder: string;
    type?: string;
    multiline?: boolean;
  }> = [
    { key: "name", label: "Nome", placeholder: "João Silva" },
    { key: "email", label: "Email", placeholder: "joao@example.com", type: "email" },
    { key: "subject", label: "Assunto", placeholder: "Colaboração em projeto" },
    {
      key: "message",
      label: "Mensagem",
      placeholder: "Conte-me sobre seu projeto...",
      multiline: true,
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span
            className="mono text-sm tracking-widest uppercase"
            style={{ color: "hsl(var(--primary))" }}
          >
            // Contato
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold mt-3 section-heading"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Vamos Trabalhar Juntos?
          </h2>
          <p
            className="mt-4 text-base max-w-xl"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Estou aberto a oportunidades de emprego, estágios e projetos freelance. Não hesite em entrar em contato — responderei em menos de 24 horas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div
                className="glass-card rounded-xl p-10 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[400px]"
              >
                <CheckCircle
                  size={48}
                  style={{ color: "hsl(var(--primary))" }}
                />
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "hsl(var(--foreground))" }}
                >
                  Mensagem Enviada!
                </h3>
                <p style={{ color: "hsl(var(--muted-foreground))" }}>
                  Obrigado por entrar em contato. Responderei em menos de 24 horas.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="btn-neon px-6 py-2.5 rounded-lg mt-2"
                >
                  Enviar Outro
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-xl p-8 flex flex-col gap-5"
              >
                {fields.map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={field.key}
                      className="mono text-xs tracking-wider"
                      style={{ color: "hsl(var(--primary))" }}
                    >
                      &gt; {field.label}
                    </label>
                    {field.multiline ? (
                      <textarea
                        id={field.key}
                        name={field.key}
                        value={form[field.key]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        rows={5}
                        className="terminal-input w-full rounded-lg px-4 py-3 resize-none"
                        style={{
                          borderColor: errors[field.key]
                            ? "hsl(var(--destructive))"
                            : undefined,
                        }}
                      />
                    ) : (
                      <input
                        id={field.key}
                        name={field.key}
                        type={field.type ?? "text"}
                        value={form[field.key]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="terminal-input w-full rounded-lg px-4 py-3"
                        style={{
                          borderColor: errors[field.key]
                            ? "hsl(var(--destructive))"
                            : undefined,
                        }}
                      />
                    )}
                    {errors[field.key] && (
                      <div
                        className="flex items-center gap-1.5 text-xs mono"
                        style={{ color: "hsl(var(--destructive))" }}
                      >
                        <AlertCircle size={12} />
                        {errors[field.key]}
                      </div>
                    )}
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-neon-filled px-6 py-3.5 rounded-lg flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <span className="animate-spin">⟳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Sidebar links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Info box */}
            <div className="glass-card rounded-xl p-6 flex flex-col gap-4">
              <h3
                className="font-bold text-lg"
                style={{ color: "hsl(var(--foreground))" }}
              >
                Informações Rápidas
              </h3>
              {[
                { label: "Localização", value: "Teresina, PI - Brasil" },
                { label: "Status", value: "Procurando oportunidades" },
                { label: "Tempo de resposta", value: "< 24 horas" },
                { label: "Email", value: "caiofernandocardoso6@gmail.com" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-0.5">
                  <span
                    className="mono text-xs"
                    style={{ color: "hsl(var(--primary))" }}
                  >
                    {item.label}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/CaioFCSousa?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 flex items-center gap-4 group no-underline"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: "hsl(var(--primary) / 0.1)",
                    border: "1px solid hsl(var(--primary) / 0.2)",
                  }}
                >
                  <Github
                    size={18}
                    style={{ color: "hsl(var(--primary))" }}
                  />
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    GitHub
                  </div>
                  <div
                    className="mono text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    CaioFCSousa
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/caio-fernando-cardoso/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-5 flex items-center gap-4 group no-underline"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "hsl(195 100% 50% / 0.1)",
                    border: "1px solid hsl(195 100% 50% / 0.2)",
                  }}
                >
                  <Linkedin
                    size={18}
                    style={{ color: "hsl(195 100% 50%)" }}
                  />
                </div>
                <div>
                  <div
                    className="font-semibold text-sm"
                    style={{ color: "hsl(var(--foreground))" }}
                  >
                    LinkedIn
                  </div>
                  <div
                    className="mono text-xs"
                    style={{ color: "hsl(var(--muted-foreground))" }}
                  >
                    Caio Fernando
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
