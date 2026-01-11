const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/api/propiedades`;

// 🧩 GET - Listar propiedad
export async function listarPropiedades() {
  try {
    const response = await fetch(`${API_URL}/listar`);
    if (!response.ok) {
      throw new Error(`Error al listar propiedades: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("❌ Error al obtener propiedades:", error);
    throw error;
  }
}

// 🧩 PUT - Actualizar propiedad
export async function actualizarPropiedad(id, data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Error al actualizar (${response.status}): ${text}`);
    }
    return true;
  } catch (error) {
    console.error("Error en actualizarPropiedad:", error);
    return false;
  }
}

// 🧩 POST - Crear propiedad
export async function crearPropiedad(data) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");
    console.log("Token usado:", token);
    console.log("Datos enviados:", data);

    const response = await fetch(`${API_URL}/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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

// 🧩 DELETE - Eliminar propiedad
export async function eliminarPropiedad(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await response.text(); // obtiene la respuesta como texto
    console.log("🔍 Backend response:", response.status, text);

    if (!response.ok) {
      throw new Error(
        `Error al eliminar propiedad (${response.status}): ${text}`
      );
    }
    return true;
  } catch (error) {
    console.error("Error en eliminarPropiedad:", error);
    return false;
  }
}
