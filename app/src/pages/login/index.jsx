import { UserForm } from "../";

export default function Login() {
  const inputs = [
    {type: "email", name: "email", label: "E-mail"},
    {type: "password", name: "password", label: "Senha"},
  ]
  return (
    <UserForm
      title = "Login"
      buttonLabel = "Entrar"
      inputs = {inputs}
    />
  )
}
