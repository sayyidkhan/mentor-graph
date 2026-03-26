const SIZE_CLASS = {
  hero: "max-w-[260px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px]",
  md: "max-w-[180px] sm:max-w-[220px]",
  sm: "w-14 sm:w-16 md:w-[4.5rem]",
} as const;

type SageFigureProps = {
  size?: keyof typeof SIZE_CLASS;
  className?: string;
  /** Decorative-only (empty alt) for repeated marks */
  decorative?: boolean;
};

export function SageFigure({
  size = "hero",
  className = "",
  decorative = false,
}: SageFigureProps) {
  return (
    <div className={`relative shrink-0 ${SIZE_CLASS[size]} ${className}`}>
      <div
        className="orb animate-pulse-glow left-1/2 top-[45%] h-[min(55%,220px)] w-[min(55%,220px)] -translate-x-1/2 -translate-y-1/2 bg-sky-400/12"
        aria-hidden
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/sage.svg"
        alt={
          decorative
            ? ""
            : "The Sage — a hooded guide holding a staff topped with a glowing mentor graph"
        }
        {...(decorative ? { "aria-hidden": true as const } : {})}
        className="relative z-10 w-full drop-shadow-[0_0_48px_rgba(56,189,248,0.12)]"
      />
    </div>
  );
}
