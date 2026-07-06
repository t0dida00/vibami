import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>That page wandered off.</h1>
        <p className={styles.copy}>The foundation is here; this route is not.</p>
        <Link className={`${buttonVariants()} ${styles.link}`} href="/">
          Back home
        </Link>
      </div>
    </main>
  );
}
