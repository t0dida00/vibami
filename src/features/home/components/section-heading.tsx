type SectionHeadingProps = {
  title: string;
  description: string;
  action?: React.ReactNode;
};

import styles from "./section-heading.module.scss";

export function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <div>
        <h2 className={styles.title}>
          {title} <span className={styles.mark}>※</span>
        </h2>
        <p className={styles.description}>{description}</p>
      </div>
      {action}
    </div>
  );
}
