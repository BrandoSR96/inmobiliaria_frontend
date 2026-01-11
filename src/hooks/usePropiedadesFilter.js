import { useMemo, useState } from "react";

export const usePropiedadesFilter = (propiedades) => {
  const [filters, setFilters] = useState({
    tipo: "",
    estado: "",
    precioMin: "",
    precioMax: "",
    areaMin: "",
    areaMax: "",
    distrito: "",
    busqueda: "",
  });

  const filteredPropiedades = useMemo(() => {
    if (!Array.isArray(propiedades)) return []; // protección
    return propiedades.filter((prop) => {
      const matchesTipo = !filters.tipo || prop.tipo === filters.tipo;
      const matchesEstado = !filters.estado || prop.estado === filters.estado;
      const matchesPrecioMin =
        !filters.precioMin || prop.precio >= Number(filters.precioMin);
      const matchesPrecioMax =
        !filters.precioMax || prop.precio <= Number(filters.precioMax);
      const matchesAreaMin =
        !filters.areaMin || prop.metrosCuadrados >= Number(filters.areaMin);
      const matchesAreaMax =
        !filters.areaMax || prop.metrosCuadrados <= Number(filters.areaMax);
      const matchesDistrito =
        !filters.distrito ||
        prop.direccion?.toLowerCase().includes(filters.distrito.toLowerCase()) ||
        (prop.distrito &&
          prop.distrito.toLowerCase().includes(filters.distrito.toLowerCase()));

      const matchBusqueda =
        !filters.busqueda ||
        prop.titulo?.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
        prop.descripcion?.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
        prop.direccion?.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
        (prop.distrito &&
          prop.distrito.toLowerCase().includes(filters.busqueda.toLowerCase()));

      return (
        matchesTipo &&
        matchesEstado &&
        matchesPrecioMin &&
        matchesPrecioMax &&
        matchesAreaMin &&
        matchesAreaMax &&
        matchesDistrito &&
        matchBusqueda
      );
    });
  }, [propiedades, filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return { filteredPropiedades, filters, updateFilter };
};


// import { useMemo, useState } from "react";

// export const usePropiedadesFilter = (propiedades) => {
//   const [filters, setFilters] = useState({
//     tipo: "",
//     estado: "",
//     precioMin: "",
//     precioMax: "",
//     areaMin: "",
//     areaMax: "",
//     distrito: "",
//     busqueda: "", 
//   });

//   const filteredPropiedades = useMemo(() => {
//     return propiedades.filter((prop) => {
//       const matchesTipo = !filters.tipo || prop.tipo === filters.tipo;
//       const matchesEstado = !filters.estado || prop.estado === filters.estado;
//       const matchesPrecioMin =
//         !filters.precioMin || prop.precio >= Number(filters.precioMin);
//       const matchesPrecioMax =
//         !filters.precioMax || prop.precio <= Number(filters.precioMax);
//       const matchesAreaMin =
//         !filters.areaMin || prop.metrosCuadrados >= Number(filters.areaMin);
//       const matchesAreaMax =
//         !filters.areaMax || prop.metrosCuadrados <= Number(filters.areaMax);
//       const matchesDistrito =
//         !filters.distrito ||
//         prop.direccion.toLowerCase().includes(filters.distrito.toLowerCase()) ||
//         (prop.distrito &&
//           prop.distrito.toLowerCase().includes(filters.distrito.toLowerCase()));

//       const matchBusqueda =
//         !filters.busqueda ||
//         prop.titulo.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
//         prop.descripcion.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
//         prop.direccion.toLowerCase().includes(filters.busqueda.toLowerCase()) ||
//         (prop.distrito &&
//           prop.distrito.toLowerCase().includes(filters.busqueda.toLowerCase()));

//       return (
//         matchesTipo &&
//         matchesEstado &&
//         matchesPrecioMin &&
//         matchesPrecioMax &&
//         matchesAreaMin &&
//         matchesAreaMax &&
//         matchesDistrito &&
//         matchBusqueda
//       );
//     });
//   }, [propiedades, filters]);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   return { filteredPropiedades, filters, updateFilter };
// };
