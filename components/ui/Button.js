"use client";

const variants = {
  primary:
    "bg-[var(--acm-blue)] text-white hover:opacity-90",
  secondary:
    "bg-[var(--acm-purple)] text-white hover:opacity-90",
  outline:
    "border border-[var(--acm-blue)] text-[var(--acm-blue)] hover:bg-[var(--acm-blue)] hover:text-white",
};

export default function Button({
  children,
  onClick,
  href,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer";
  const classes = `${base} ${variants[variant] ?? variants.primary} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
