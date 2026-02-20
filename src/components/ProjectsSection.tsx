import { motion } from "framer-motion";
import { Github, ExternalLink, Server } from "lucide-react";

const projects = [
  {
    title: "Terra Sense",
    description:
      "Plataforma web de análise de solo via processamento de imagem, auxiliando produtores no manejo de plantio. Projeto apresentado e validado na banca da Campus Party Teresina.",
    tags: ["React", "Node.js", "Image Processing", "APIs"],
    github: "https://github.com/CaioFCSousa",
    live: "#",
    accent: "hsl(var(--primary))",
    status: "Julho - Outubro 2025",
  },
  {
    title: "Plant Care",
    description:
      "Aplicativo móvel para identificação e diagnóstico de saúde de plantas através de fotos com guias de cuidados personalizados e monitoramento de saúde vegetal.",
    tags: ["React Native", "MongoDB", "Image Recognition", "Mobile"],
    github: "https://github.com/CaioFCSousa",
    live: "#",
    accent: "hsl(195 100% 50%)",
    status: "Outubro - Dezembro 2025",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card rounded-xl p-6 flex flex-col gap-5 group"
      style={{
        background: `linear-gradient(145deg, hsl(220 15% 11% / 0.8), hsl(220 18% 8% / 0.8))`,
      }}
    >
      {/* Top row: title + status */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
          >
            <Server size={14} style={{ color: project.accent }} />
          </div>
          <h3
            className="text-lg font-bold leading-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="mono text-xs px-2 py-1 rounded flex-shrink-0"
          style={{
            color: project.accent,
            background: `${project.accent}18`,
            border: `1px solid ${project.accent}25`,
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="tech-tag">
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <a
          href={project.github}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium mono transition-all duration-200 flex-1 justify-center"
          style={{
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
            background: "hsl(var(--muted) / 0.3)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = `${project.accent}60`;
            e.currentTarget.style.color = project.accent;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "hsl(var(--border))";
            e.currentTarget.style.color = "hsl(var(--foreground))";
          }}
        >
          <Github size={13} />
          GitHub
        </a>
        <a
          href={project.live}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium mono transition-all duration-200 flex-1 justify-center"
          style={{
            color: project.accent,
            border: `1px solid ${project.accent}40`,
            background: `${project.accent}08`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${project.accent}18`;
            e.currentTarget.style.boxShadow = `0 0 15px ${project.accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${project.accent}08`;
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <ExternalLink size={13} />
          Ver Projeto
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
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
            // Projetos
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold mt-3 section-heading"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Coisas que Construí
          </h2>
          <p
            className="mt-4 text-base max-w-xl"
            style={{ color: "hsl(var(--muted-foreground))" }}
          >
            Uma seleção de projetos showcasing design de API, performance e fundamentos de engenharia.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
