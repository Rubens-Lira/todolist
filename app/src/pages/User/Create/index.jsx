import { useState } from "react";
import { UserForm } from "../../";
import UserService from "../../../services/UserService";
import { useNavigate } from "react-router-dom";  

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_2: "",
  });
  const navigate = useNavigate();

  const inputs = [
    { name: "name", label: "Nome Completo" },
    { type: "email", name: "email", label: "E-mail" },
    { name: "phone", label: "Telefone, apenas números" },
    { type: "password", name: "password", label: "Senha" },
    { type: "password", name: "password_2", label: "Confirme sua senha" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password_2, ...userData } = formData;

      if (formData.password !== password_2) {
        alert("As senhas não coincidem");
        return;
      }

      const response = await UserService.createUser(userData);
      alert("Usuário cadastrado com sucesso!");

      
      navigate("/login"); 

      console.log(response);
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error.response?.data?.message || "Erro ao cadastrar.");
    }
  };

  return (
    <UserForm
      title="Cadastre-se"
      buttonLabel="Cadastrar"
      inputs={inputs}
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={formData}
    />
  );
}
