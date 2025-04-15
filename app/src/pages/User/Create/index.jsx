// src/pages/Auth/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserForm } from "../../"; // certifique-se do caminho correto
import UserService from "../../../services/UserService";

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

    const { password, password_2, ...userData } = formData;

    if (password !== password_2) {
      return alert("As senhas não coincidem");
    }

    try {
      await UserService.createUser({ ...userData, password });
      alert("Usuário cadastrado com sucesso!");
      navigate("/login");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert(error?.response?.data?.error || "Erro ao cadastrar.");
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
