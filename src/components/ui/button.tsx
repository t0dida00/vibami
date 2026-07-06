import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import styles from "./button.module.scss";

type ButtonVariant = "primary" | "outline" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant };

function buttonVariants({ variant = "primary" }: { variant?: ButtonVariant } = {}) {
  return cn(styles.button, styles[variant]);
}

export function Button({ className, variant, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant: variant ?? undefined }), className)} {...props} />;
}

export { buttonVariants };
