import { UserForm } from "../../";

export default function CteateTag() {
  const inputs = [
    { name: "title", label: "Nome da tag" },
    { type: "color", name: "color", label: "" },
  ];

  return (
    <UserForm
      title="Cadastre-se"
      buttonLabel="Cadastrar"
      inputs={inputs}
    />
  );
}
