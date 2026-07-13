export default function NavigationButton({
  direction,
  onClick,
  disabled = false,
  ariaLabel,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  ariaLabel: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="bg-gray-800 bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition disabled:opacity-40"
    >
      {direction === "prev" ? "❮" : "❯"}
    </button>
  );
}
