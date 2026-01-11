import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Datos = () => {
  const [propiedades, setPropiedades] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(2);
  const [direccion, setDireccion] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);
  console.log(setSize, setDireccion);

  const fetchPage = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/propiedades/paginadas`, {
        params: { page, size, sortBy: "precio", direction: direccion },
      });
      const data = response.data;
      setPropiedades(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error al obtener propiedades:", error);
    }
  }, [page, size, direccion]); // ✅ Dependencias correctas

  useEffect(() => {
    fetchPage();
  }, [fetchPage]); // ✅ No más advertencias

  return (
    <div className="p-4">
      <h2>Propiedades disponibles</h2>
      <ul>
        {propiedades.map((prop) => (
          <li key={prop.id}>
            <strong>{prop.titulo}</strong> — S/.{prop.precio} ({prop.tipo})
          </li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Anterior
        </button>
        <span>
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Datos;
