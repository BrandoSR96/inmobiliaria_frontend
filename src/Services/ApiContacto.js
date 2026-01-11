const BASE_URL = import.meta.env.VITE_API_URL;
const API_CONTAC = `${BASE_URL}/api/contacto`;

// 🧩 POST - Crear propiedad
export async function crearContacto(data) {
  try {
    console.log("Datos enviados:", data);
    const response = await fetch(`${API_CONTAC}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const text = await response.text();
    let responseData = {};
    try {
      responseData = text ? JSON.parse(text) : {}; // Si hay texto, intenta parsear
    } catch (err) {
      console.warn("No se pudo parsear la respuesta JSON:", err);
      responseData = { message: text || "Respuesta no válida del servidor" };
    }
    if (!response.ok) {
      const errorMessage =
        responseData?.message ||
        `Error al crear propiedad (status ${response.status})`;
      throw new Error(errorMessage);
    }
    return responseData;
  } catch (error) {
    console.error("Error en crearPropiedad:", error);
    throw error;
  }
}

import axios from "axios";

export const listarContactos = async () => {
  try {
    const res = await axios.get(`${API_CONTAC}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ejemplo
      },
    });
    return res;
  } catch (error) {
    console.error("Error al listar propiedades:", error.response?.status);
    throw new Error("Error al listar propiedades: " + error.response?.status);
  }
};
