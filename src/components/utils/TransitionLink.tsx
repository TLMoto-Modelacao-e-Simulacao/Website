"use client";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useInternalHref } from "../../utils/useInternalHref";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface TransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
}

export const TransitionLink = ({ children, href, onClick, ...props }: TransitionLinkProps) => {
  const router = useRouter();
  const { href: targetHref, isFileProtocol } = useInternalHref(href);

  const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);

    if (e.defaultPrevented) {
      return;
    }

    if (isFileProtocol) {
      return;
    }

    e.preventDefault();

    const body = document.querySelector("body");

    body?.classList.add("page-transition");

    await sleep(450);

    router.push(targetHref);

    await sleep(450);

    body?.classList.remove("page-transition");
  };

  if (isFileProtocol) {
    return (
      <a href={targetHref} onClick={handleTransition} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link onClick={handleTransition} href={targetHref} {...props}>
      {children}
    </Link>
  );
};
