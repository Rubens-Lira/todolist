import styles from "./style.module.css";
import { Button, FormGroup, Input } from "../";

export default function UserForm({ title, buttonLabel, inputs, values, onChange, onSubmit }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h2>{title}</h2>

      {inputs.map((input) => (
        <FormGroup key={input.name}>
          <Input
            type={input.type ?? "text"}
            name={input.name}
            placeholder={input.label}
            value={values[input.name] || ""}
            onChange={onChange}
            required
          />
        </FormGroup>
      ))}

      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
}
