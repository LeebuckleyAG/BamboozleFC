interface HeaderProps {
  page: string;
  title: string;
  breadcrumb?: string;
  statusText?: string;
}

export default function Header({ page, title, breadcrumb, statusText }: HeaderProps) {
  return (
    <div className="shrink-0 border-b-2 border-[var(--tx-border)] bg-black px-3 pt-3 pb-2 sm:px-5 sm:pt-4">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-[10px] sm:text-xs tracking-widest text-[var(--tx-cyan)] crt-text">
          BAMBOOZLE FC
        </span>
        <span className="font-tele text-2xl sm:text-3xl leading-none text-[var(--tx-yellow)] crt-text">
          PAGE {page}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-2">
        <h1 className="font-tele text-3xl sm:text-4xl leading-none text-[var(--tx-white)] crt-text">
          {title}
        </h1>
      </div>
      {breadcrumb && (
        <p className="mt-1 font-mono text-[11px] tracking-wide text-[var(--tx-green)] tx-dim opacity-80">
          {breadcrumb}
        </p>
      )}
      {statusText && (
        <p className="mt-0.5 font-mono text-[10px] tracking-wide text-[var(--tx-white)] opacity-50">
          {statusText}
        </p>
      )}
      <div className="mt-2 h-[3px] w-full bg-gradient-to-r from-[var(--tx-cyan)] via-[var(--tx-magenta)] to-[var(--tx-yellow)] opacity-70" />
    </div>
  );
}
