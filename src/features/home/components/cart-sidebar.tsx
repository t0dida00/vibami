"use client";

import { MinusIcon } from "@phosphor-icons/react/dist/csr/Minus";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { ShoppingCartIcon } from "@phosphor-icons/react/dist/csr/ShoppingCart";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";

import styles from "./cart-sidebar.module.scss";

export type CartItem = {
  id: string;
  ingredients?: string[];
  name: string;
  price: number;
  quantity: number;
};

type CartSidebarProps = {
  items: CartItem[];
  isOpen: boolean;
  onCheckout: () => void;
  onClear: () => void;
  onClose: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};

const currencyFormatter = new Intl.NumberFormat("en-IE", {
  currency: "EUR",
  style: "currency",
});

export function formatCartPrice(value: number) {
  return currencyFormatter.format(value);
}

export function CartSidebar({
  items,
  isOpen,
  onCheckout,
  onClear,
  onClose,
  onRemove,
  onUpdateQuantity,
}: CartSidebarProps) {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      {isOpen ? <button aria-label="Close cart" className={styles.backdrop} onClick={onClose} type="button" /> : null}

      <aside
        aria-label="Shopping cart"
        aria-modal={isOpen}
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
        id="cart"
        role="dialog"
      >
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Your order</p>
            <h2 className={styles.title}>Cart</h2>
          </div>
          <button aria-label="Close cart" className={styles.iconButton} onClick={onClose} type="button">
            <XIcon size={19} weight="bold" />
          </button>
        </div>

        <div className={styles.body}>
          {items.length ? (
            <ul className={styles.items}>
              {items.map((item) => (
                <li className={styles.item} key={item.id}>
                  <div className={styles.itemTop}>
                    <div>
                      <h3 className={styles.itemName}>{item.name}</h3>
                      {item.ingredients?.length ? (
                        <ul className={styles.ingredients}>
                          {item.ingredients.map((ingredient) => (
                            <li key={ingredient}>{ingredient}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                    <button
                      aria-label={`Remove ${item.name}`}
                      className={styles.remove}
                      onClick={() => onRemove(item.id)}
                      type="button"
                    >
                      <TrashIcon size={16} weight="bold" />
                    </button>
                  </div>
                  <div className={styles.itemBottom}>
                    <div className={styles.quantity}>
                      <button
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        type="button"
                      >
                        <MinusIcon size={14} weight="bold" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        type="button"
                      >
                        <PlusIcon size={14} weight="bold" />
                      </button>
                    </div>
                    <span className={styles.itemPrice}>{formatCartPrice(item.price * item.quantity)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <ShoppingCartIcon size={30} weight="bold" />
              <p>Your cart is empty.</p>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.totalRow}>
            <span>Subtotal</span>
            <strong>{formatCartPrice(subtotal)}</strong>
          </div>
          <button className={styles.checkout} disabled={!items.length} onClick={onCheckout} type="button">
            Checkout
          </button>
          <button className={styles.clear} disabled={!items.length} onClick={onClear} type="button">
            Clear cart
          </button>
        </div>
      </aside>
    </>
  );
}
