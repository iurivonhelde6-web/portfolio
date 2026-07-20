import { useEffect, useRef, useState, type ReactNode, type RefObject, Fragment } from "react";
import portraitImg from "./assets/portrait.jpg";
import {
  Mail,
  ArrowUpRight,
  Database,
  Cloud,
  GitBranch,
  Terminal,
  Layers,
  Users,
  Server,
  Boxes,
  GraduationCap,
  MapPin,
  Menu,
  X,
} from "lucide-react";

/* lucide-react no longer ships brand marks (Github/Linkedin), so these
   are small inline SVGs sized to match the lucide icon grid. */
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.42.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}


/* ---------------------------------------------------------------
   DATA — everything sourced from Iuri's LinkedIn + GitHub
--------------------------------------------------------------- */

const NAV = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencia", label: "Experiência" },
  { id: "projetos", label: "Projetos" },
  { id: "skills", label: "Stack" },
  { id: "formacao", label: "Formação" },
  { id: "contato", label: "Contato" },
];

const INITIATIVES = [
  {
    tag: "ARCH",
    title: "Arquitetura do ERP “Mover”",
    body: "Liderança técnica na idealização e construção estrutural de um sistema web de larga escala para fluxo de caixa e logística corporativa. Backend em Java e Spring Boot, comunicação eficiente com MySQL e MongoDB, otimização de queries e alta disponibilidade para relatórios críticos.",
    icon: Server,
  },
  {
    tag: "FRONTEND",
    title: "Ecossistema Task-Flow",
    body: "Concepção de uma plataforma de alta performance para gestão de tarefas organizacionais, com frontend em React.js e tipagem estrita em TypeScript, consumindo APIs em Node.js construídas sob princípios RESTful.",
    icon: Layers,
  },
  {
    tag: "REFACTOR",
    title: "Modernização e quebra de monólitos",
    body: "Liderança em refatorações complexas, desacoplando arquiteturas monolíticas legadas para ecossistemas distribuídos e escaláveis em microsserviços, reduzindo significativamente o tempo de resposta das aplicações.",
    icon: Boxes,
  },
  {
    tag: "CLOUD",
    title: "Mensageria Kafka & Cloud (AWS)",
    body: "Engenharia de soluções assíncronas com AWS SQS e Lambda (serverless) para processamento em background, garantindo tolerância a falhas e escalabilidade elástica sob demanda.",
    icon: Cloud,
  },
  {
    tag: "QUALITY",
    title: "Mentoria & qualidade de software",
    body: "Implementação de cultura de Code Review, automação de CI/CD via GitHub Actions e mentoria técnica de desenvolvedores juniores/plenos, garantindo entregas consistentes, padronizadas e seguras.",
    icon: Users,
  },
];

const PROJECTS = [
  {
    name: "Mover — ERP Corporativo",
    kind: "Case interno",
    desc: "Sistema web de larga escala para fluxo de caixa e logística. Migração de monólito para microsserviços com mensageria assíncrona.",
    stack: ["Java", "Spring Boot", "MySQL", "MongoDB", "Kafka", "AWS SQS", "Lambda"],
    href: null,
  },
  {
    name: "Task-Flow",
    kind: "Case interno",
    desc: "Plataforma de gestão de tarefas organizacionais, com API RESTful própria e frontend tipado de ponta a ponta.",
    stack: ["React", "TypeScript", "Node.js", "REST"],
    href: null,
  },
  {
    name: "Loja MOVER",
    kind: "Projeto full-stack",
    desc: "E-commerce completo: precificação promocional, autenticação com JWT e autorização por papéis, modelagem de dados relacional.",
    stack: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "JWT"],
    href: null,
  },
  {
    name: "DevHub",
    kind: "Open source",
    desc: "Plataforma de portfólio para desenvolvedores, construída do zero até o deploy em produção.",
    stack: ["React", "TypeScript", "Vite"],
    href: "https://github.com/von-helde/DevHub",
    live: "https://dev-hub-von-heldes-projects.vercel.app",
  },
  {
    name: "Sistema de Padaria",
    kind: "Open source",
    desc: "Sistema de gestão para operação de padaria — controle de produção e vendas.",
    stack: ["TypeScript"],
    href: "https://github.com/iurivonhelde6-web/iurivonhelde6-web-s-Org",
  },
  {
    name: "Smart Sheets",
    kind: "Open source",
    desc: "Ferramenta para resolução e manipulação de planilhas.",
    stack: ["TypeScript"],
    href: "https://github.com/iurivonhelde6-web/Smart-Sheets",
  },
  {
    name: "Cadastro de Produtos (FIAP)",
    kind: "Acadêmico",
    desc: "Sistema de cadastro de produtos com interface desktop, projeto da formação em Engenharia de Software.",
    stack: ["Java", "Swing"],
    href: "https://github.com/iurivonhelde6-web/Java-Project---FIAP-",
  },
  {
    name: "Lista de Tarefas",
    kind: "Open source",
    desc: "Aplicação de tarefas com persistência local e arquitetura de componentes modular.",
    stack: ["React", "TypeScript"],
    href: "https://github.com/iurivonhelde6-web/Lista-de-tarefas",
  },
];

const SKILLS = [
  { group: "Linguagens", icon: Terminal, items: ["Java", "JavaScript", "TypeScript", "PHP", "Python", "C#"] },
  { group: "Backend", icon: Server, items: ["Spring Boot", "Node.js", "REST APIs", "GraphQL"] },
  { group: "Frontend", icon: Layers, items: ["React.js", "TypeScript", "Html", "CSS", "Vite"] },
  { group: "Dados", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB"] },
  { group: "Cloud & DevOps", icon: Cloud, items: ["AWS (SQS, Lambda)", "Azure Cloud", "Kafka", "GitHub Actions", "Microsserviços"] },
];

const MARQUEE_ITEMS = [
  "Java", "PHP", "Spring Boot", "React", "TypeScript", "Node.js", "AWS SQS", "Lambda",
  "Kafka", "MySQL", "PostgreSQL", "MongoDB", "Azure Cloud", "Python", "C#",
  "GraphQL", "Microsserviços", "GitHub Actions",
];

const STATS = [
  { value: 7, suffix: "+", label: "anos dedicados a sistemas corporativos" },
  { value: INITIATIVES.length, suffix: "", label: "frentes técnicas lideradas no ERP Mover" },
  { value: PROJECTS.length, suffix: "", label: "projetos no portfólio, do case interno ao open source" },
];

/* ---------------------------------------------------------------
   ENVIRONMENT HOOKS
--------------------------------------------------------------- */

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

function useReveal<T extends HTMLElement = HTMLDivElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "opacity, transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
      }}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   INTERACTIVE PRIMITIVES
--------------------------------------------------------------- */

/* Custom cursor: a dot that tracks the pointer exactly, and a ring that
   trails behind it with spring easing. Grows + tints brass over anything
   interactive. Desktop (fine pointer) only. */
function CustomCursor({ enabled }: { enabled: boolean }) {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%,-50%)`;
      }
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit = t.closest && t.closest("a, button, .card, .chip, .tag, .skill-card, .photo-shell, input, [data-cursor='hover']");
      if (ringRef.current) ringRef.current.classList.toggle("cursor-ring--hover", !!hit);
    };
    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* Magnetic wrapper: pulls its child toward the cursor within a radius. */
function Magnetic({
  children,
  strength = 0.35,
  enabled,
}: {
  children: ReactNode;
  strength?: number;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    ref.current.style.transition = "transform 0s";
    ref.current.style.transform = `translate(${relX * strength}px, ${relY * strength}px)`;
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <div ref={ref} className="magnetic" onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

/* Tilt wrapper: 3D tilt + a spotlight highlight that follows the cursor,
   used on the glass project/skill cards. */
function TiltCard({
  children,
  className = "",
  enabled,
}: {
  children: ReactNode;
  className?: string;
  enabled: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rotateY = (px - 0.5) * 10;
    const rotateX = (0.5 - py) * 10;
    ref.current.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
    ref.current.style.setProperty("--spot", "1");
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    ref.current.style.setProperty("--spot", "0");
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* Count-up stat, triggered once the number scrolls into view. */
function Counter({
  value,
  suffix = "",
  duration = 1200,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [ref, visible] = useReveal<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, value, duration]);
  return (
    <span ref={ref} className="counter mono">
      {display}
      {suffix}
    </span>
  );
}

/* Headline with a masked line-reveal per word — classic "cinematic" intro. */
function RevealHeading({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(<em>.*?<\/em>)/g).filter(Boolean);
  let wordIndex = 0;
  return (
    <h1 className={className}>
      {parts.map((part: string, pi: number) => {
        const isEm = part.startsWith("<em>");
        const clean = part.replace(/<\/?em>/g, "");
        const words = clean.split(" ").filter(Boolean);
        return words.map((w: string, wi: number) => {
          const idx = wordIndex++;
          const el = (
            <span className="word-mask" key={`${pi}-${wi}`}>
              <span style={{ animationDelay: `${0.35 + idx * 0.07}s` }}>{w}</span>
            </span>
          );
          return (
            <Fragment key={`${pi}-${wi}-wrap`}>
              {isEm ? <em key={`${pi}-${wi}-em`}>{el}</em> : el}
              {" "}
            </Fragment>
          );
        });
      })}
    </h1>
  );
}

/* Auto-scrolling tech ribbon. */
function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {loop.map((it, i) => (
          <span className="marquee-item mono" key={i}>
            {it} <span className="marquee-dot">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* Scroll progress bar, fixed to the top of the viewport. */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrolled = h.scrollTop;
        const max = h.scrollHeight - h.clientHeight;
        setPct(max > 0 ? (scrolled / max) * 100 : 0);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

/* Right-side scrollspy dots. */
function SectionDots({
  sections,
  active,
  onJump,
}: {
  sections: { id: string; label: string }[];
  active: string;
  onJump: (id: string) => void;
}) {
  return (
    <nav className="section-dots" aria-label="Navegação por seção">
      {sections.map((s) => (
        <button
          key={s.id}
          className={`dot ${active === s.id ? "dot--active" : ""}`}
          onClick={() => onJump(s.id)}
          aria-label={s.label}
        >
          <span className="dot-tooltip mono">{s.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ---------------------------------------------------------------
   HERO DIAGRAM — a small service map: gateway → services → queue → lambda.
   Hovering a node highlights the edges connected to it, so the diagram
   reads as something you can actually inspect, not just decoration.
--------------------------------------------------------------- */

function ServiceMap() {
  type MapNode = { id: string; x: number; y: number; label: string };
  const nodes: MapNode[] = [
    { id: "gw", x: 60, y: 130, label: "api-gateway" },
    { id: "auth", x: 230, y: 40, label: "auth-svc" },
    { id: "orders", x: 230, y: 130, label: "orders-svc" },
    { id: "inv", x: 230, y: 220, label: "inventory-svc" },
    { id: "queue", x: 400, y: 175, label: "sqs::queue" },
    { id: "lambda", x: 540, y: 175, label: "λ worker" },
  ];
  const edges: [string, string][] = [
    ["gw", "auth"],
    ["gw", "orders"],
    ["gw", "inv"],
    ["orders", "queue"],
    ["inv", "queue"],
    ["queue", "lambda"],
  ];
  const find = (id: string): MapNode => nodes.find((n) => n.id === id) ?? nodes[0];
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <svg
      viewBox="0 0 600 270"
      className="service-map"
      role="img"
      aria-label="Diagrama de arquitetura: gateway conectado a serviços de autenticação, pedidos e inventário, que publicam em uma fila SQS consumida por uma função Lambda. Passe o mouse sobre um nó para destacar suas conexões."
    >
      {edges.map(([a, b], i) => {
        const A = find(a);
        const B = find(b);
        const active = hovered && (a === hovered || b === hovered);
        return (
          <line
            key={i}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            className={`edge ${active ? "edge--active" : ""}`}
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        );
      })}
      {nodes.map((n, i) => (
        <g
          key={n.id}
          className={`node-g ${hovered === n.id ? "node-g--active" : ""}`}
          style={{ animationDelay: `${i * 0.12}s` }}
          onMouseEnter={() => setHovered(n.id)}
          onMouseLeave={() => setHovered(null)}
        >
          <circle cx={n.x} cy={n.y} r={n.id === "gw" ? 9 : 6.5} className="node-hit" fillOpacity="0" />
          <circle cx={n.x} cy={n.y} r={n.id === "gw" ? 9 : 6.5} className="node" />
          <text x={n.x} y={n.y - 16} className="node-label" textAnchor="middle">
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ---------------------------------------------------------------
   MAIN
--------------------------------------------------------------- */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("sobre");
  const [loading, setLoading] = useState(true);

  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isFinePointer = useMediaQuery("(pointer: fine)");
  const interactiveFx = isFinePointer && !prefersReducedMotion;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), prefersReducedMotion ? 0 : 900);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const observers = NAV.map((n) => {
      const el = document.getElementById(n.id);
      if (!el) return null;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(n.id);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={`ivh-root ${interactiveFx ? "ivh-root--fx" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .ivh-root {
          --ink: #0A1420;
          --panel: rgba(23, 42, 61, 0.42);
          --panel-2: rgba(28, 50, 72, 0.5);
          --glass-border: rgba(210, 224, 236, 0.14);
          --glass-shine: rgba(255, 255, 255, 0.06);
          --line: #223B52;
          --brass: #CC9A44;
          --brass-soft: #E8C77E;
          --paper: #ECEEEA;
          --muted: #9BB0C2;
          --ok: #6FBF8B;
          font-family: 'IBM Plex Sans', system-ui, sans-serif;
          background: var(--ink);
          color: var(--paper);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .ivh-root, .ivh-root * { box-sizing: border-box; }
        .ivh-root--fx, .ivh-root--fx a, .ivh-root--fx button { cursor: none; }

        .ivh-root::before {
          content: "";
          position: fixed;
          inset: 0;
          background:
            radial-gradient(60% 50% at 12% 8%, rgba(204,154,68,0.16), transparent 60%),
            radial-gradient(55% 45% at 88% 18%, rgba(66,120,168,0.20), transparent 60%),
            radial-gradient(70% 60% at 50% 100%, rgba(37,66,95,0.28), transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        .ivh-root .shell { position: relative; z-index: 1; }

        .mono { font-family: 'IBM Plex Mono', monospace; }
        .display { font-family: 'Space Grotesk', sans-serif; }

        /* ---------- PRELOADER ---------- */
        .preloader {
          position: fixed; inset: 0; z-index: 200;
          background: var(--ink);
          display: flex; align-items: center; justify-content: center;
          transition: opacity .6s ease, transform .8s cubic-bezier(.76,0,.24,1);
        }
        .preloader--out { opacity: 0; transform: translateY(-100%); pointer-events: none; }
        .preloader-mark {
          font-family: 'Space Grotesk', sans-serif; font-size: 15px; letter-spacing: 0.3em;
          text-transform: uppercase; color: var(--brass-soft);
          animation: markPulse 1.1s ease-in-out infinite;
        }
        @keyframes markPulse { 0%,100% { opacity: .45; } 50% { opacity: 1; } }

        /* ---------- CUSTOM CURSOR ---------- */
        .cursor-dot {
          position: fixed; top: 0; left: 0; width: 6px; height: 6px; border-radius: 50%;
          background: var(--brass-soft); pointer-events: none; z-index: 90; will-change: transform;
        }
        .cursor-ring {
          position: fixed; top: 0; left: 0; width: 34px; height: 34px; border-radius: 50%;
          border: 1px solid var(--brass-soft); pointer-events: none; z-index: 90; will-change: transform;
          transition: width .25s ease, height .25s ease, opacity .25s ease, border-color .25s ease;
          mix-blend-mode: difference;
        }
        .cursor-ring--hover { width: 56px; height: 56px; border-color: var(--paper); }

        /* ---------- SCROLL PROGRESS ---------- */
        .scroll-progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 60; background: transparent; }
        .scroll-progress-bar { height: 100%; background: linear-gradient(90deg, var(--brass), var(--brass-soft)); transition: width .1s linear; }

        /* ---------- SECTION DOTS ---------- */
        .section-dots {
          position: fixed; right: 26px; top: 50%; transform: translateY(-50%); z-index: 40;
          display: none; flex-direction: column; gap: 14px;
        }
        @media (min-width: 1100px) { .section-dots { display: flex; } }
        .dot {
          width: 9px; height: 9px; border-radius: 50%; border: 1px solid var(--glass-border);
          background: transparent; cursor: pointer; position: relative; padding: 0; transition: background .2s, transform .2s;
        }
        .dot:hover { transform: scale(1.3); }
        .dot--active { background: var(--brass); border-color: var(--brass); transform: scale(1.3); }
        .dot-tooltip {
          position: absolute; right: 20px; top: 50%; transform: translateY(-50%);
          font-size: 11px; color: var(--muted); white-space: nowrap; opacity: 0; transition: opacity .2s;
          background: rgba(10,20,32,0.85); border: 1px solid var(--glass-border); padding: 3px 8px; border-radius: 5px;
        }
        .dot:hover .dot-tooltip { opacity: 1; }

        .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--brass);
        }

        /* NAV */
        .nav {
          position: sticky; top: 0; z-index: 30;
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          background: rgba(10,20,32,0.55);
          border-bottom: 1px solid var(--glass-border);
        }
        .nav-inner {
          max-width: 1100px; margin: 0 auto; padding: 16px 24px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .brand { font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 17px; letter-spacing: -0.01em; }
        .brand span { color: var(--brass); }
        .nav-links { display: none; gap: 28px; }
        .nav-links button {
          background: none; border: none; color: var(--muted); cursor: pointer;
          font-size: 14px; font-family: 'IBM Plex Sans', sans-serif; transition: color .2s; position: relative; padding: 2px 0;
        }
        .nav-links button::after {
          content: ""; position: absolute; left: 0; bottom: -4px; height: 1px; width: 0; background: var(--brass-soft);
          transition: width .25s cubic-bezier(.16,1,.3,1);
        }
        .nav-links button:hover, .nav-links button:focus-visible { color: var(--paper); }
        .nav-links button:hover::after, .nav-links button.nav-active::after { width: 100%; }
        .nav-links button.nav-active { color: var(--brass-soft); }
        .nav-toggle { display: block; background: none; border: 1px solid var(--glass-border); border-radius: 6px; padding: 8px; color: var(--paper); }
        .mobile-menu {
          border-bottom: 1px solid var(--glass-border);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          background: rgba(15,30,46,0.6);
          display: flex; flex-direction: column; padding: 8px 24px 16px;
        }
        .mobile-menu button {
          text-align: left; padding: 12px 0; background: none; border: none; border-bottom: 1px solid var(--glass-border);
          color: var(--paper); font-size: 15px;
        }
        @media (min-width: 768px) {
          .nav-links { display: flex; }
          .nav-toggle { display: none; }
        }

        /* HERO */
        .hero {
          max-width: 1100px; margin: 0 auto; padding: 72px 24px 40px;
          display: grid; gap: 40px;
        }
        .status-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border: 1px solid var(--glass-border); border-radius: 999px; padding: 6px 12px;
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          background: rgba(23,42,61,0.35);
          font-size: 12px; color: var(--muted); width: fit-content; margin-bottom: 22px;
          opacity: 0; animation: fadeUp .7s cubic-bezier(.16,1,.3,1) .1s forwards;
        }
        .status-dot { width: 7px; height: 7px; border-radius: 999px; background: var(--ok); box-shadow: 0 0 0 3px rgba(111,191,139,0.18); animation: statusPulse 2s ease-in-out infinite; }
        @keyframes statusPulse { 0%,100% { box-shadow: 0 0 0 3px rgba(111,191,139,0.18); } 50% { box-shadow: 0 0 0 6px rgba(111,191,139,0.08); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .hero h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: clamp(32px, 5.2vw, 54px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          max-width: 18ch;
          margin: 0 0 20px;
        }
        .hero h1 em { font-style: normal; color: var(--brass); }
        .word-mask { display: inline-block; overflow: hidden; vertical-align: top; }
        .word-mask span {
          display: inline-block; transform: translateY(115%); opacity: 0;
          animation: wordIn .85s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes wordIn { to { transform: translateY(0); opacity: 1; } }

        .hero p.lede {
          color: var(--muted); font-size: 17px; line-height: 1.65; max-width: 56ch; margin: 0 0 28px;
          opacity: 0; animation: fadeUp .8s cubic-bezier(.16,1,.3,1) 1.05s forwards;
        }
        .hero-meta {
          display: flex; flex-wrap: wrap; gap: 18px; color: var(--muted); font-size: 13px; margin-bottom: 30px;
          opacity: 0; animation: fadeUp .8s cubic-bezier(.16,1,.3,1) 1.2s forwards;
        }
        .hero-meta span { display: inline-flex; align-items: center; gap: 6px; }

        .cta-row {
          display: flex; flex-wrap: wrap; gap: 12px;
          opacity: 0; animation: fadeUp .8s cubic-bezier(.16,1,.3,1) 1.35s forwards;
        }
        .magnetic { display: inline-flex; }
        .btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 18px; border-radius: 8px; font-size: 14px; font-weight: 500;
          text-decoration: none; cursor: pointer; border: 1px solid transparent;
          transition: background .2s ease, border-color .2s ease, color .2s ease;
        }
        .btn-primary { background: var(--brass); color: #1a1204; }
        .btn-primary:hover { background: var(--brass-soft); }
        .btn-ghost { border-color: var(--glass-border); color: var(--paper); background: transparent; }
        .btn-ghost:hover { border-color: var(--brass); color: var(--brass-soft); }

        /* service map */
        .map-wrap {
          border: 1px solid var(--glass-border); border-radius: 16px;
          background: linear-gradient(160deg, var(--glass-shine), transparent 40%), var(--panel);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow: 0 20px 50px rgba(0,0,0,0.35);
          padding: 18px 8px 8px;
          opacity: 0; animation: fadeUp 1s cubic-bezier(.16,1,.3,1) .5s forwards;
        }
        .map-caption { padding: 0 14px 10px; font-size: 11px; color: var(--muted); }
        .service-map { width: 100%; height: auto; display: block; }

        /* HERO VISUAL STACK (photo + service map) */
        .hero-visual { display: flex; flex-direction: column; gap: 26px; }
        .photo-float {
          align-self: center; width: fit-content;
          opacity: 0; animation: fadeUp .9s cubic-bezier(.16,1,.3,1) .3s forwards, floatY 4.6s ease-in-out .9s infinite;
        }
        @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .photo-shell { position: relative; width: 210px; }
        .photo-frame {
          position: relative; width: 210px; height: 268px; border-radius: 22px;
          padding: 3px; overflow: hidden;
          box-shadow: 0 20px 45px rgba(0,0,0,0.4);
        }
        .photo-frame::before {
          content: ""; position: absolute; inset: -60%;
          background: conic-gradient(from 0deg, var(--brass), transparent 25%, var(--brass-soft), transparent 60%, var(--brass));
          animation: spin 7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .photo-frame img {
          position: relative; z-index: 1; display: block; width: 100%; height: 100%;
          object-fit: cover; border-radius: 19px;
        }
        .photo-online {
          position: absolute; top: 8px; right: 8px; width: 15px; height: 15px; border-radius: 50%;
          background: var(--ok); border: 3px solid var(--ink); z-index: 2;
          box-shadow: 0 0 0 3px rgba(111,191,139,0.22);
          animation: statusPulse 2s ease-in-out infinite;
        }
        .photo-tag {
          position: absolute; left: -12px; bottom: -14px; z-index: 2;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 6px 12px; border-radius: 999px; border: 1px solid var(--glass-border);
          background: rgba(15,30,46,0.88);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          font-size: 11px; color: var(--paper); white-space: nowrap;
          box-shadow: 0 10px 24px rgba(0,0,0,0.4);
        }
        .edge {
          stroke: var(--line); stroke-width: 1.4;
          stroke-dasharray: 5 5;
          animation: dash 3.2s linear infinite;
          opacity: 0;
          animation-fill-mode: forwards, none;
          transition: stroke .3s ease, stroke-width .3s ease;
        }
        .edge--active { stroke: var(--brass-soft); stroke-width: 2.2; }
        @keyframes dash { to { stroke-dashoffset: -60; } }
        .node-g { opacity: 0; animation: nodeIn .6s ease forwards; cursor: pointer; }
        .node-hit { cursor: pointer; }
        @keyframes nodeIn { to { opacity: 1; } }
        .node { fill: var(--ink); stroke: var(--brass); stroke-width: 2; transition: r .2s ease, stroke .2s ease; }
        .node-g--active .node { stroke: var(--brass-soft); }
        .node-label { fill: var(--muted); font-family: 'IBM Plex Mono', monospace; font-size: 9px; transition: fill .2s ease; }
        .node-g--active .node-label { fill: var(--brass-soft); }
        @media (min-width: 900px) {
          .hero { grid-template-columns: 1.05fr 0.95fr; align-items: center; }
        }

        /* MARQUEE */
        .marquee {
          border-top: 1px solid var(--glass-border); border-bottom: 1px solid var(--glass-border);
          overflow: hidden; padding: 16px 0; position: relative; z-index: 1;
        }
        .marquee-track {
          display: flex; width: max-content; gap: 0;
          animation: marqueeScroll 32s linear infinite;
        }
        .marquee:hover .marquee-track { animation-play-state: paused; }
        .marquee-item { font-size: 13px; color: var(--muted); padding: 0 18px; white-space: nowrap; }
        .marquee-dot { color: var(--brass); margin-left: 18px; }
        @keyframes marqueeScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* STATS */
        .stats-row { display: grid; gap: 24px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 44px; }
        .stat { border-left: 2px solid var(--brass); padding-left: 16px; }
        .counter { font-family: 'Space Grotesk', sans-serif; font-size: 34px; color: var(--brass-soft); display: block; margin-bottom: 6px; }
        .stat-label { color: var(--muted); font-size: 13px; line-height: 1.5; max-width: 26ch; }

        /* SECTION shell */
        section.block { max-width: 1100px; margin: 0 auto; padding: 88px 24px; border-top: 1px solid var(--glass-border); }
        .section-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 40px; }
        .section-head .num { font-family: 'IBM Plex Mono', monospace; color: var(--brass); font-size: 13px; }
        .section-head h2 { font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 600; margin: 0; letter-spacing: -0.01em; }

        /* ABOUT */
        .about-grid { display: grid; gap: 28px; }
        .about-text { color: var(--muted); font-size: 16px; line-height: 1.8; max-width: 68ch; }
        .about-text strong { color: var(--paper); font-weight: 500; }

        /* INITIATIVES */
        .initiative {
          display: grid; grid-template-columns: 46px 1fr; gap: 18px;
          padding: 26px 0; border-bottom: 1px solid var(--glass-border);
          transition: transform .35s cubic-bezier(.16,1,.3,1);
        }
        .initiative:hover { transform: translateX(6px); }
        .initiative:last-child { border-bottom: none; }
        .init-icon {
          width: 46px; height: 46px; border-radius: 9px; border: 1px solid var(--glass-border);
          display: flex; align-items: center; justify-content: center; color: var(--brass);
          background: var(--panel);
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);
          transition: border-color .3s ease, color .3s ease;
        }
        .initiative:hover .init-icon { border-color: var(--brass); color: var(--brass-soft); }
        .init-tag { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--brass); letter-spacing: 0.08em; }
        .initiative h3 { font-family: 'Space Grotesk', sans-serif; font-size: 18px; margin: 4px 0 8px; font-weight: 600; }
        .initiative p { color: var(--muted); font-size: 14.5px; line-height: 1.65; margin: 0; max-width: 68ch; }

        /* TILT wrapper */
        .tilt { transform-style: preserve-3d; will-change: transform; transition: transform .4s cubic-bezier(.16,1,.3,1); }

        /* PROJECTS */
        .project-grid { display: grid; gap: 18px; grid-template-columns: 1fr; }
        @media (min-width: 700px) { .project-grid { grid-template-columns: 1fr 1fr; } }
        .card {
          border: 1px solid var(--glass-border); border-radius: 14px;
          background: linear-gradient(160deg, var(--glass-shine), transparent 45%), var(--panel);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow: 0 14px 34px rgba(0,0,0,0.28);
          padding: 22px; display: flex; flex-direction: column; height: 100%;
          transition: border-color .2s ease;
          position: relative; overflow: hidden;
        }
        .card::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          background: radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(232,199,126,0.16), transparent 65%);
          opacity: var(--spot, 0); transition: opacity .3s ease;
        }
        .card:hover { border-color: rgba(204,154,68,0.55); }
        .card-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 6px; }
        .card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 17px; margin: 0; font-weight: 600; }
        .card .kind { font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
        .card p.desc { color: var(--muted); font-size: 14px; line-height: 1.6; margin: 10px 0 16px; flex: 1; }
        .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 4px; }
        .tag {
          font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; color: var(--brass-soft);
          border: 1px solid var(--glass-border); background: rgba(255,255,255,0.03); border-radius: 5px; padding: 3px 7px;
          transition: border-color .2s ease, background .2s ease;
        }
        .tag:hover { border-color: var(--brass); background: rgba(204,154,68,0.12); }
        .card-link { display: inline-flex; align-items: center; gap: 5px; color: var(--paper); font-size: 13px; text-decoration: none; margin-top: 14px; width: fit-content; }
        .card-link:hover { color: var(--brass-soft); }
        .card-link svg:last-child { transition: transform .25s cubic-bezier(.16,1,.3,1); }
        .card-link:hover svg:last-child { transform: translate(3px,-3px); }

        /* SKILLS */
        .skills-grid { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 700px) { .skills-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1000px) { .skills-grid { grid-template-columns: repeat(3, 1fr); } }
        .skill-card {
          border: 1px solid var(--glass-border); border-radius: 14px; padding: 20px;
          background: linear-gradient(160deg, var(--glass-shine), transparent 45%), var(--panel);
          backdrop-filter: blur(22px) saturate(160%);
          -webkit-backdrop-filter: blur(22px) saturate(160%);
          box-shadow: 0 14px 34px rgba(0,0,0,0.28);
          position: relative; overflow: hidden;
        }
        .skill-card::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; border-radius: inherit;
          background: radial-gradient(180px circle at var(--mx,50%) var(--my,50%), rgba(232,199,126,0.16), transparent 65%);
          opacity: var(--spot, 0); transition: opacity .3s ease;
        }
        .skill-head { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; color: var(--brass); }
        .skill-head h3 { font-family: 'Space Grotesk', sans-serif; font-size: 15px; margin: 0; color: var(--paper); font-weight: 600; }
        .chip-row { display: flex; flex-wrap: wrap; gap: 7px; }
        .chip {
          font-size: 12.5px; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.03);
          border-radius: 999px; padding: 5px 11px; color: var(--muted); transition: border-color .2s ease, color .2s ease;
        }
        .chip:hover { border-color: var(--brass); color: var(--brass-soft); }

        /* EDUCATION */
        .edu-item { display: flex; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--glass-border); transition: transform .3s cubic-bezier(.16,1,.3,1); }
        .edu-item:hover { transform: translateX(6px); }
        .edu-item:last-child { border-bottom: none; }
        .edu-icon { color: var(--brass); flex-shrink: 0; margin-top: 2px; }
        .edu-item h3 { font-family: 'Space Grotesk', sans-serif; font-size: 16px; margin: 0 0 4px; font-weight: 600; }
        .edu-item p { color: var(--muted); font-size: 13.5px; margin: 0; }

        /* CONTACT / FOOTER */
        .contact-block { text-align: center; padding-top: 88px; padding-bottom: 60px; }
        .contact-block h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(26px, 4vw, 38px); margin: 0 0 16px; }
        .contact-block p { color: var(--muted); max-width: 50ch; margin: 0 auto 30px; }
        .contact-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        footer.foot { border-top: 1px solid var(--glass-border); padding: 24px; text-align: center; color: var(--muted); font-size: 12.5px; }

        @media (prefers-reduced-motion: reduce) {
          .edge, .node-g, .status-badge, .status-dot, .hero p.lede, .hero-meta, .cta-row, .map-wrap,
          .word-mask span, .marquee-track, .preloader { animation: none !important; opacity: 1 !important; transform: none !important; }
          .tilt, .card, .initiative, .edu-item { transition: none !important; }
        }
      `}</style>

      {!prefersReducedMotion && (
        <div className={`preloader ${!loading ? "preloader--out" : ""}`} aria-hidden="true">
          <div className="preloader-mark mono">IVH // carregando</div>
        </div>
      )}

      <CustomCursor enabled={interactiveFx} />
      <ScrollProgress />
      <SectionDots sections={NAV} active={activeSection} onJump={scrollTo} />

      <div className="shell">
        {/* NAV */}
        <nav className="nav">
          <div className="nav-inner">
            <div className="brand">Iuri <span>Von Helde</span></div>
            <div className="nav-links">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  className={activeSection === n.id ? "nav-active" : ""}
                  onClick={() => scrollTo(n.id)}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <button className="nav-toggle" onClick={() => setMenuOpen((v) => !v)} aria-label="Abrir menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              {NAV.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}>{n.label}</button>
              ))}
            </div>
          )}
        </nav>

        {/* HERO */}
        <header className="hero">
          <div>
            <div className="status-badge"><span className="status-dot" />Aberto a novas oportunidades full stack</div>
            <RevealHeading text="Da complexidade do <em>monólito</em> à performance dos <em>microsserviços</em>." />
            <p className="lede">
              <strong>Iuri Von Helde</strong> — Engenheiro de Software sênior, à frente da arquitetura técnica
              do ERP Mover desde 2019: backend em Java e Spring Boot, frontend em React e TypeScript,
              e mensageria assíncrona na AWS para sistemas de missão crítica.
            </p>
            <div className="hero-meta">
              <span className="mono"><MapPin size={13} /> Rio de Janeiro, Brasil</span>
              <span className="mono">senior_software_engineer · 2019—atual</span>
            </div>
            <div className="cta-row">
              <Magnetic enabled={interactiveFx}>
                <button className="btn btn-primary" onClick={() => scrollTo("projetos")}>
                  Ver projetos <ArrowUpRight size={15} />
                </button>
              </Magnetic>
              <Magnetic enabled={interactiveFx}>
                <a className="btn btn-ghost" href="https://www.linkedin.com/in/iuri-von-helde-082320261" target="_blank" rel="noreferrer">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic enabled={interactiveFx}>
                <a className="btn btn-ghost" href="https://github.com/iurivonhelde6-web" target="_blank" rel="noreferrer">
                  <GithubIcon size={15} /> GitHub
                </a>
              </Magnetic>
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-float">
              <TiltCard enabled={interactiveFx}>
                <div className="photo-shell">
                  <div className="photo-frame">
                    <img src={portraitImg} alt="Foto de Iuri Von Helde" />
                  </div>
                  <span className="photo-online" title="Aberto a oportunidades" />
                  <div className="photo-tag mono"><MapPin size={12} /> Rio de Janeiro, BR</div>
                </div>
              </TiltCard>
            </div>
            <div className="map-wrap">
              <ServiceMap />
              <div className="map-caption mono">passe o mouse sobre um nó · gateway → serviços → fila SQS → worker λ</div>
            </div>
          </div>
        </header>

        <Marquee items={MARQUEE_ITEMS} />

        {/* ABOUT */}
        <section id="sobre" className="block">
          <Reveal>
            <div className="section-head"><span className="num mono">01</span><h2>Sobre</h2></div>
            <div className="about-grid">
              <p className="about-text">
                Engenheiro de software com base sólida em <strong>lógica de programação, estruturas de dados
                e desenvolvimento de APIs</strong>, hoje atuando na liderança técnica de sistemas corporativos
                críticos. Tenho experiência prática guiando a modernização de arquiteturas monolíticas para
                ecossistemas distribuídos, sempre buscando entender a melhor forma de construir sistemas
                <strong> eficientes, seguros e escaláveis</strong>.
              </p>
              <p className="about-text">
                Tenho interesse especial em <strong>Java, JavaScript/Node.js, TypeScript, PhP, Python e C#</strong>,
                além de bancos <strong>SQL e NoSQL</strong> e conhecimento em <strong>Azure Cloud</strong> e
                <strong> Spring Boot</strong>. Gosto de resolver problemas, aprender novas ferramentas e
                trabalhar de forma colaborativa — sou comprometido, curioso e disciplinado.
              </p>
            </div>
            <div className="stats-row">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 100}>
                  <div className="stat">
                    <Counter value={s.value} suffix={s.suffix} />
                    <div className="stat-label">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>

        {/* EXPERIENCE */}
        <section id="experiencia" className="block">
          <Reveal>
            <div className="section-head"><span className="num mono">02</span><h2>Experiência</h2></div>
            <p style={{ color: "var(--muted)", marginTop: "-20px", marginBottom: "30px", fontSize: 14 }}>
              <strong style={{ color: "var(--paper)" }}>Senior Software Engineer</strong> · 2019 — atual · Desenvolvimento corporativo de aplicações críticas
            </p>
          </Reveal>
          <div>
            {INITIATIVES.map((it, i) => (
              <Reveal key={it.tag} delay={i * 60}>
                <div className="initiative">
                  <div className="init-icon"><it.icon size={20} /></div>
                  <div>
                    <div className="init-tag">[{it.tag}]</div>
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projetos" className="block">
          <Reveal>
            <div className="section-head"><span className="num mono">03</span><h2>Projetos</h2></div>
          </Reveal>
          <div className="project-grid">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={(i % 2) * 60}>
                <TiltCard enabled={interactiveFx}>
                  <div className="card">
                    <div className="card-top">
                      <h3>{p.name}</h3>
                    </div>
                    <div className="kind">{p.kind}</div>
                    <p className="desc">{p.desc}</p>
                    <div className="tags">
                      {p.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                    </div>
                    {p.href && (
                      <a className="card-link" href={p.href} target="_blank" rel="noreferrer">
                        <GitBranch size={13} /> Ver repositório <ArrowUpRight size={13} />
                      </a>
                    )}
                    {p.live && (
                      <a className="card-link" href={p.live} target="_blank" rel="noreferrer">
                        <ArrowUpRight size={13} /> Ver deploy
                      </a>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="block">
          <Reveal>
            <div className="section-head"><span className="num mono">04</span><h2>Stack</h2></div>
          </Reveal>
          <div className="skills-grid">
            {SKILLS.map((s, i) => (
              <Reveal key={s.group} delay={i * 50}>
                <TiltCard enabled={interactiveFx}>
                  <div className="skill-card">
                    <div className="skill-head"><s.icon size={17} /><h3>{s.group}</h3></div>
                    <div className="chip-row">
                      {s.items.map((it) => <span key={it} className="chip">{it}</span>)}
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="formacao" className="block">
          <Reveal>
            <div className="section-head"><span className="num mono">05</span><h2>Formação</h2></div>
            <div>
              <div className="edu-item">
                <GraduationCap size={20} className="edu-icon" />
                <div>
                  <h3>FIAP</h3>
                  <p>Engenharia de Software</p>
                </div>
              </div>
              <div className="edu-item">
                <GraduationCap size={20} className="edu-icon" />
                <div>
                  <h3>UVA — Universidade Veiga de Almeida</h3>
                  <p>Formação complementar em Tecnologia</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* CONTACT */}
        <section id="contato" className="block contact-block">
          <Reveal>
            <h2>Vamos conversar?</h2>
            <p>Aberto a oportunidades como desenvolvedor full stack — Java/Spring Boot, React/TypeScript e Node.js.</p>
            <div className="contact-links">
              <Magnetic enabled={interactiveFx}>
                <a className="btn btn-primary" href="https://www.linkedin.com/in/iuri-von-helde-082320261" target="_blank" rel="noreferrer">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
              </Magnetic>
              <Magnetic enabled={interactiveFx}>
                <a className="btn btn-ghost" href="https://github.com/iurivonhelde6-web" target="_blank" rel="noreferrer">
                  <GithubIcon size={15} /> GitHub
                </a>
              </Magnetic>
              <Magnetic enabled={interactiveFx}>
                <a className="btn btn-ghost" href="mailto:seu-email@exemplo.com">
                  <Mail size={15} /> E-mail
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        <footer className="foot mono">
          © {new Date().getFullYear()} Iuri Von Helde — construído com React &amp; TypeScript
        </footer>
      </div>
    </div>
  );
}
