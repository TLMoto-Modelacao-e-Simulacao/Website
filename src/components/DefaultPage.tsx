import { ReactNode } from "react";
import { useInternalHref } from "../utils/useInternalHref";

export default function MyDefaultPage({ children }: { children: ReactNode }) {
  const { href: backgroundHref } = useInternalHref("/images/blue_black_background.webp");

  return (
    <div className="relative">
      {/* Background Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0"
        style={{ backgroundImage: `url('${backgroundHref}')` }}
      ></div>

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
