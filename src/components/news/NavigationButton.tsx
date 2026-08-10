export default function NavigationButton({
  direction,
  onClick,
  disabled = false,
  ariaLabel,
  variant = "default",
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
  variant?: "default" | "modal";
}) {
  const variants = {
    default: "bg-gray-800 bg-opacity-50 hover:bg-opacity-75",
    modal: "bg-zinc-600 text-slate-300 hover:bg-zinc-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`text-white p-3 rounded-full transition disabled:opacity-40 ${variants[variant]}`}
    >
      {direction === "prev" ? "❮" : "❯"}
    </button>
  );
}
