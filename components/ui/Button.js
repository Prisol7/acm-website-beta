"use client";

// Colors pull from the site-wide --button-color token (see globals.css)
// so every button variant stays in sync with a single value. Hover motion
// (lift + shadow) matches the other CTA buttons across the site.
const variants = {
  primary:
    "bg-[var(--button-color)] text-white hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "bg-[var(--button-color)] text-white hover:shadow-lg hover:-translate-y-0.5",
  outline:
    "border border-[var(--button-color)] text-[var(--button-color)] hover:bg-[var(--button-color)] hover:text-white hover:-translate-y-0.5",
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
