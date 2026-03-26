import Link from "next/link";
import { SageFigure } from "@/components/SageFigure";

const FEATURES = [
  {
    title: "Reveal your mentors",
    description:
      "Names surface from ChatGPT history, notes, or any paste — the people who actually show up in how you think.",
    quote: "You cannot shape what you cannot see.",
  },
  {
    title: "Map the domains",
    description:
      "Each mentor lands in Wealth, Business, Engineering, or Investing so you see the shape of your influences.",
    quote: "Wisdom has many paths. Know which ones you walk.",
  },
  {
    title: "See your mentor graph",
    description:
      "A structured tree: you at the root, domains as branches, mentors as the minds on each line.",
    quote: "The root grows stronger when you understand its branches.",
  },
  {
    title: "Hear the counsel",
    description:
      "Insights on blind spots and dominant lanes — practical nudges toward a more balanced mentor stack.",
    quote: "A heavy reliance on one domain creates blind spots. Seek balance.",
  },
];

const STEP_DELAYS = ["delay-100", "delay-200", "delay-300"] as const;
const FEATURE_DELAYS = [
  "delay-100",
  "delay-200",
  "delay-300",
  "delay-400",
] as const;

const STEPS = [
  {
    title: "Summon the prompt",
    description:
      "The Sage gives you words to ask your AI. Copy them; let the model list who you have been learning from.",
  },
  {
    title: "Offer the reply",
    description:
      "Paste the response here. Raw text is enough — the Sage sifts and structures it.",
  },
  {
    title: "Follow the graph",
    description:
      "Your mentor tree, domains, and counsel appear — a map toward the sources you may still need.",
  },
];

export default function LandingPage() {
  return (
    <div className="sage-canvas relative min-h-dvh">
      <div className="orb animate-pulse-glow top-[-4%] left-[12%] h-[380px] w-[380px] bg-sky-500/10 sm:h-[480px] sm:w-[480px]" />
      <div className="orb animate-pulse-glow delay-300 top-[22%] right-[3%] h-[320px] w-[320px] bg-indigo-500/10 sm:h-[420px] sm:w-[420px]" />
      <div className="orb animate-pulse-glow delay-600 bottom-[12%] left-[22%] h-[280px] w-[280px] bg-violet-500/8" />

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16 md:py-20">
        <section className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
          <div className="animate-fade-up w-full md:w-auto">
            <div className="animate-sage-hover mx-auto w-fit md:mx-0">
              <SageFigure size="hero" />
            </div>
          </div>

          <div className="text-center md:flex-1 md:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 text-xs font-medium text-sky-200/90 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]" />
                Mentor Graph · guided by The Sage
              </span>
            </div>
            <h1 className="animate-fade-up delay-100 mt-5 text-3xl font-extrabold tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl">
              <span className="text-white">A guide to the mentors</span>
              <br />
              <span className="text-gradient">you actually need</span>
            </h1>
            <p className="animate-fade-up delay-200 mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base md:text-lg">
              Identify the best mentors that shape your thinking from your AI
              conversations. The Sage turns noise into a clear graph — who
              influences you, where the gaps are, and how to balance your
              stack.
            </p>
            <div className="animate-fade-up delay-300 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row md:justify-start">
              <Link
                href="/analyze"
                className="btn-glow inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(56,189,248,0.2)] sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              >
                Meet The Sage
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700/80 bg-slate-950/40 px-8 py-3.5 text-sm font-medium text-slate-300 transition-all hover:border-sky-500/30 hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-base"
              >
                How the path works
              </a>
            </div>
          </div>
        </section>

        <section className="animate-fade-up delay-400 mt-16 sm:mt-24">
          <div className="glass glow-blue mx-auto max-w-2xl rounded-2xl border-sky-500/10 p-6 sm:p-8">
            <p className="text-center text-sm italic leading-relaxed text-slate-400 sm:text-base md:text-lg">
              &ldquo;You consume the thoughts of many, yet know not who guides
              your path — nor which well you have yet to drink from. Let me
              show you the map.&rdquo;
            </p>
            <p className="mt-4 text-center text-xs font-semibold tracking-[0.2em] text-sky-400/70 sm:text-sm">
              THE SAGE
            </p>
          </div>
        </section>

        <section className="animate-fade-up delay-500 mt-12 sm:mt-16">
          <div className="glass glow-blue mx-auto max-w-lg rounded-2xl border-white/[0.06] p-5 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500 sm:text-sm">
              What the staff reveals
            </p>
            <p className="mb-4 text-xs text-slate-500 sm:text-sm">
              Your mentor graph — same structure the app builds from your text:
            </p>
            <pre className="font-mono text-xs leading-loose sm:text-sm">
              <span className="font-bold text-sky-400">You</span>
              {"\n"}
              <span className="text-slate-600">├── </span>
              <span className="font-bold text-emerald-400">Wealth</span>
              {"\n"}
              <span className="text-slate-600">│   ├── </span>
              <span className="text-slate-200">Naval Ravikant</span>
              {"\n"}
              <span className="text-slate-600">│   └── </span>
              <span className="text-slate-200">MJ DeMarco</span>
              {"\n"}
              <span className="text-slate-600">├── </span>
              <span className="font-bold text-violet-400">Business</span>
              {"\n"}
              <span className="text-slate-600">│   └── </span>
              <span className="text-slate-200">Alex Hormozi</span>
              {"\n"}
              <span className="text-slate-600">└── </span>
              <span className="font-bold text-pink-400">Engineering</span>
              {"\n"}
              <span className="text-slate-600">    └── </span>
              <span className="text-slate-200">Linus Torvalds</span>
            </pre>
          </div>
        </section>

        <div className="divider-gradient mx-auto mt-20 max-w-xs sm:mt-28" />

        <section id="how-it-works" className="mt-20 scroll-mt-20 sm:mt-28">
          <h2 className="animate-fade-up text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Three steps with{" "}
            <span className="text-gradient-subtle">The Sage</span>
          </h2>
          <p className="animate-fade-up delay-100 mx-auto mt-3 max-w-md text-center text-sm text-slate-500 sm:text-base">
            No sign-up. Paste text, get mentors, domains, and counsel.
          </p>
          <ol className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            {STEPS.map((step, i) => (
              <li
                key={i}
                className={`glass glass-hover animate-fade-up ${STEP_DELAYS[i]} rounded-2xl border-sky-500/5 p-5 sm:p-7`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/25 to-indigo-500/20 text-sm font-bold text-sky-200 sm:h-12 sm:w-12 sm:text-base">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-white sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="divider-gradient mx-auto mt-20 max-w-xs sm:mt-28" />

        <section className="mt-20 sm:mt-28">
          <h2 className="animate-fade-up text-center text-2xl font-bold sm:text-3xl md:text-4xl">
            Still the same{" "}
            <span className="text-gradient">mentor graph</span>
            <br />
            <span className="text-slate-400">— clearer, because The Sage frames it</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-6">
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className={`glass glass-hover animate-fade-up ${FEATURE_DELAYS[i]} rounded-2xl border-white/[0.05] p-5 sm:p-7`}
              >
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {feature.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {feature.description}
                </p>
                <p className="mt-3 border-t border-white/5 pt-3 text-xs italic text-sky-400/45 sm:text-sm">
                  &ldquo;{feature.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="divider-gradient mx-auto mt-20 max-w-xs sm:mt-28" />

        <section className="mt-20 text-center sm:mt-28">
          <div className="mx-auto mb-6 flex justify-center sm:mb-8">
            <div className="animate-sage-hover opacity-80">
              <SageFigure size="md" decorative />
            </div>
          </div>
          <h2 className="animate-fade-up text-2xl font-bold sm:text-3xl md:text-4xl">
            The Sage points toward the source.
            <br />
            <span className="text-gradient">Walk the path when you are ready.</span>
          </h2>
          <p className="animate-fade-up delay-100 mx-auto mt-4 max-w-md text-sm italic text-slate-500 sm:text-base">
            &ldquo;Sifting through the noise&hellip; distilling your
            influences.&rdquo;
          </p>
          <div className="animate-fade-up delay-200 mt-8">
            <Link
              href="/analyze"
              className="btn-glow inline-flex items-center justify-center rounded-xl bg-sky-600 px-10 py-3.5 text-sm font-semibold text-white sm:px-12 sm:py-4 sm:text-base"
            >
              Open the counsel
            </Link>
          </div>
        </section>

        <footer className="mt-24 pb-8 text-center sm:mt-32">
          <p className="text-xs text-slate-600 sm:text-sm">
            Mentor Graph — don&rsquo;t just map mentors; choose better ones.
            <span className="mx-2 text-slate-700">·</span>
            &copy; {new Date().getFullYear()}
          </p>
        </footer>
      </main>
    </div>
  );
}
