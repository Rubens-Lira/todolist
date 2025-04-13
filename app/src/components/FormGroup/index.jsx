import styles from "./styles.module.css";

export default function FormGroup({ children }) {
  return <div className={styles.formGroup}>{children}</div>;
}
