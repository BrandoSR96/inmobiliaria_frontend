import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useColorMode } from "@chakra-ui/react";
import Footer from "../components/Footer";
import Formulario from "../components/Formulario";
import Navbar from "../components/Navbar";
import Terreno from "../components/Terreno";
import { usePropiedadesFilter } from "../hooks/usePropiedadesFilter";
import axios from "axios";
import { useIdioma } from "../components/IdiomaContext";
import { textos } from "../components/traductor/textos";

const API_URL = import.meta.env.VITE_API_URL;

const Inicio = () => {
  const { idioma } = useIdioma();

  const [propiedades, setPropiedades] = useState([]);
  const { filteredPropiedades, filters, updateFilter } =
    usePropiedadesFilter(propiedades);

  const { colorMode } = useColorMode();

  const fondo =
    colorMode === "light"
      ? "bg-[#FEF7F2] text-black"
      : "bg-gray-900 text-white";

  const fondoSeccion = colorMode === "light" ? "bg-[#FEF7F2]" : "bg-gray-800";

  useEffect(() => {
    const cargarPropiedades = async () => {
      const response = await axios.get(`${API_URL}/api/propiedades/listar`);
      setPropiedades(response.data);
    };
    cargarPropiedades();
  }, []);

  const hayFiltrosBusqueda = filters.busqueda.trim() !== "";

  return (
    <div
      className={`m-0 box-border w-full overflow-x-hidden transition-colors duration-300 ${fondoSeccion}`}
    >
      {/* overflow-x-hidden */}
      <header className={`flex justify-center ${fondoSeccion}`}>
        <Navbar />
      </header>

      <main className={`flex justify-center p-2 pt-3 ${fondoSeccion}`}>
        <section
          class={`relative py-[32px] max-w-[1468px] h-[100%] bg-[#FEF7F2] my-auto flex justify-center flex-col xl:px-[64px] xl:mx-[20px] lg:px-[16px] lg:mx-[20px] 2xl:w-full 2xl:justify-center md:px-[35px] md:mx-[35px] md:items-center sm:px-[35px] sm:mx-[35px] 2xl:mx-auto ${fondo}`}
        >
          <div
            class={`relative max-w-[100%] mx-auto max-h-[48px] flex justify-center py-1 mb-10 items-center 2xl:px-0  xl:w-[100%] xl:px-0 md:px-0 md:w-[100%] lg:w-full bg-[#FEF7F2] lg:px-0 2xl:w-full sm:w-full sm:px-[0px] ${fondo} w-full px-[15px]`}
          >
            {/* w-[400px] */}
            <input
              type="text"
              // placeholder="Buscar por ubicación..."
              placeholder={textos[idioma].inicio.buscar}
              value={filters.busqueda}
              onChange={(e) => updateFilter("busqueda", e.target.value)}
              className={`lg:w-full pb-2 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-1 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-md file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-[#8a3a13] focus-visible:ring-[#8a3a13]/50 focus-visible:ring-[5px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive !pl-3 !h-10 text-base  ${fondo}`}
            />

            {hayFiltrosBusqueda && (
              <button
                onClick={() => updateFilter("busqueda", "")}
                className="absolute right-3 top-4"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>

          <Terreno
            filteredPropiedades={filteredPropiedades}
            filters={filters}
            updateFilter={updateFilter}
          />

          <Formulario />
          <Footer />
        </section>
        <div class=" fixed  bottom-5 right-5 ">
          <a
            class="!hover:bg-amber-400"
            href="https://wa.me/+51919527727?text=Hola%2C%20deseo%20informaci%C3%B3n%20de%20los%20terrenos%2C%20por%20favor"
            target="_blank"
          >
            <img
              className="w-12 sm:w-14 md:w-16 transition-all duration-200"
              src="../../img/whatsapp.png"
              alt=""
            />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
