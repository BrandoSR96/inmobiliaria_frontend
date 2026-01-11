import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const usePropiedadesPage = (initialParams = {}) => {
  const [propiedades, setPropiedades] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Parámetros de paginación y filtros
  const [page, setPage] = useState(initialParams.page || 0);
  const [size, setSize] = useState(initialParams.size || 6);
  const [direction, setDirection] = useState(initialParams.direction || "asc");

  const [tipo, setTipo] = useState(initialParams.tipo || "");
  const [estado, setEstado] = useState(initialParams.estado || "");
  const [precioMin, setPrecioMin] = useState(initialParams.precioMin || "");
  const [precioMax, setPrecioMax] = useState(initialParams.precioMax || "");
  const [areaMin, setAreaMin] = useState(initialParams.areaMin || "");
  const [areaMax, setAreaMax] = useState(initialParams.areaMax || "");
  const [distrito, setDistrito] = useState(initialParams.distrito || "");

  // 📦 Función para cargar propiedades con filtros y paginación
  const cargarPropiedadesPage = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/propiedades/paginadas`, {
        params: {
          page,
          size,
          sortBy: "precio",
          direction,
          tipo,
          estado,
          precioMin,
          precioMax,
          areaMin,
          areaMax,
          distrito,
        },
      });

      setPropiedades(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error al listar propiedades:", error);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    size,
    direction,
    tipo,
    estado,
    precioMin,
    precioMax,
    areaMin,
    areaMax,
    distrito,
  ]);

  // 🔁 Recargar cada vez que cambien los filtros o la página
  useEffect(() => {
    cargarPropiedadesPage();
  }, [cargarPropiedadesPage]);

  return {
    propiedades,
    totalPages,
    loading,
    page,
    setPage,
    size,
    setSize,
    direction,
    setDirection,
    tipo,
    setTipo,
    estado,
    setEstado,
    precioMin,
    setPrecioMin,
    precioMax,
    setPrecioMax,
    areaMin,
    setAreaMin,
    areaMax,
    setAreaMax,
    distrito,
    setDistrito,
    cargarPropiedadesPage,
  };
};

export default usePropiedadesPage;
