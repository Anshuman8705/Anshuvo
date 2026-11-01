const variants = {
  yellow: "bg-sunny border-sunny-dark hover:bg-sunny-dark text-ink",
  orange: "bg-ember border-ember-dark hover:bg-ember-dark text-ink",
  ghost: "bg-white border-line hover:bg-gray-50 text-ink",
};

// Shared ANSHUVO button styles keep actions consistent across the store.
export default function Button({ variant = "yellow", className = "", type = "button", ...rest }) {
  return (
    <button
      type={type}
      className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    />
  );
}
