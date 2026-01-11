const API_URL = import.meta.env.VITE_API_URL;
const ApiMultimedia = `${API_URL}/api/multimedia/subir`;

export const subirMultimedia = async (archivo, tipo, propiedadId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("tipo", tipo);
    formData.append("propiedadId", propiedadId);

    const respuesta = await fetch(ApiMultimedia, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // El navegador define correctamente multipart/form-data
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al subir multimedia:", error);
    throw error;
  }
};
