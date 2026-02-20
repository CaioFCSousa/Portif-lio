export default function FooterSection() {
  return (
    <footer
      className="py-8 px-6 text-center"
      style={{ borderTop: "1px solid hsl(var(--border))" }}
    >
      <p className="mono text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
        <span style={{ color: "hsl(var(--primary))" }}>{">"} </span>
        Desenvolvido por CaioSousa — JavaScript, React &amp; Node.js —{" "}
        <span style={{ color: "hsl(var(--primary))" }}>2026</span>
      </p>
    </footer>
  );
}
