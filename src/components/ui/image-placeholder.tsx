import { ImageIcon } from "@phosphor-icons/react/dist/ssr/Image";

import { cn } from "@/lib/utils";

import styles from "./image-placeholder.module.scss";

type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export function ImagePlaceholder({ label, className }: ImagePlaceholderProps) {
  return (
    <div
      aria-label={`${label} image placeholder`}
      className={cn(styles.placeholder, className)}
      role="img"
    >
      <div className={styles.content}>
        <ImageIcon size={28} weight="duotone" />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
