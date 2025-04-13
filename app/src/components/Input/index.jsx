import styles from "./styles.module.css";

// export default function Input({ name, register, ...props }) {
//   return <input className={styles.input} {...props} {...register(name)} />;
// }

export default function Input({ ...props }) {
  return <input className={styles.input} {...props} />;
}
