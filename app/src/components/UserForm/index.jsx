import styles from "./style.module.css";
import { Button, FormGroup, Input } from "../";

export default function UserForm({ title, buttonLabel, inputs }) {
  return (
    <form className={styles.form}>
      <h2>{title}</h2>
      {inputs.map((key) => (
        <FormGroup key={key.name}>
          <Input type={key.type ?? "text"} name={key.name} placeholder={key.label} />
        </FormGroup>
      ))}
      <Button>{buttonLabel}</Button>
    </form>
  );
}
