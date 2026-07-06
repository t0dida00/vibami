import { BreadIcon } from "@phosphor-icons/react/dist/ssr/Bread";
import { HeartIcon } from "@phosphor-icons/react/dist/ssr/Heart";
import { LeafIcon } from "@phosphor-icons/react/dist/ssr/Leaf";
import { PepperIcon } from "@phosphor-icons/react/dist/ssr/Pepper";

const values = [
  { title: "Fresh everyday", text: "Fresh ingredients prepared daily.", icon: LeafIcon },
  { title: "Baked daily", text: "Baguettes baked fresh every morning.", icon: BreadIcon },
  { title: "Bold Vietnamese flavor", text: "Authentic recipes with perfect balance.", icon: PepperIcon },
  { title: "Made with love", text: "A taste of Vietnam, wherever you are.", icon: HeartIcon },
];

import styles from "./values-footer.module.scss";

export function ValuesFooter() {
  return (
    <footer className={styles.footer} id="about">
      <div className={styles.grid}>
        {values.map(({ title, text, icon: Icon }) => (
          <div className={styles.item} key={title}>
            <Icon className={styles.icon} size={42} weight="duotone" />
            <div>
              <h2 className={styles.title}>{title}</h2>
              <p className={styles.text}>{text}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={styles.copyright}>
        © {new Date().getFullYear()} Bánh Mì Station. Freshly made, always.
      </p>
    </footer>
  );
}
