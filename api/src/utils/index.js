import { validate as uuidValidate } from "uuid";

export function formatFullDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function emailIsValid(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export function phoneIsValid(phone) {
  const regex = /^\d{10,11}$/;
  return regex.test(phone);
}

export function colorIsValid(color) {
  const regex = /^#?[0-9A-Fa-f]{6}$/
  return regex.test(color)
}

export function schemeIsValid(scheme){
  const regex = /^Bearer$/i
  return regex.test(scheme)
}

export function uuidIsValids(uudis) {
  if (!Array.isArray(uudis) || uudis.length === 0) return []

  const valids = [...new Set(uudis.filter((id) => uuidValidate(id)))]
  return valids
}
