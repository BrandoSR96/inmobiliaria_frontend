import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import Carousel from "./Carousel";
import { useColorMode } from "@chakra-ui/react";
import { useIdioma } from "../components/IdiomaContext";
import { textos } from "../components/traductor/textos";

const API_URL = import.meta.env.VITE_API_URL;

const buildImageUrl = (url) => {
  if (!url) return "/img/fondo.png";
  return url.startsWith("http") ? url : `${API_URL}${url}`;
};

const Terreno = ({ filteredPropiedades, filters, updateFilter }) => {
  const { idioma } = useIdioma();

  const { colorMode } = useColorMode();

  const fondo =
    colorMode === "light"
      ? "bg-[#FEF7F2] text-black"
      : "bg-gray-900 text-white";

  const fondoSeccion = colorMode === "light" ? "bg-white" : "bg-gray-800";

  const fondoPrecio = colorMode === "light" ? "text-amber-950" : "bg-gray-800";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  console.log(setScrollBehavior);

  const btnRef = React.useRef(null);

  const [propiedades, setPropiedades] = useState([]);
  console.log(propiedades);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [direction, setDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);

  console.log(setSize, setDirection);

  const hayFiltrosActivos = Object.entries(filters).some(
    ([key, value]) => key !== "busqueda" && value !== ""
  );

  const limpiarFiltros = () => {
    updateFilter("tipo", "");
    updateFilter("estado", "");
    updateFilter("precioMin", "");
    updateFilter("precioMax", "");
    updateFilter("areaMin", "");
    updateFilter("areaMax", "");
    updateFilter("distrito", "");
  };

  const cargarPropiedadesPage = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/propiedades/paginadas`, {
        params: {
          page,
          size,
          sortBy: "precio",
          direction,
        },
      });
      setPropiedades(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error al listar propiedades:", error);
    } finally {
      setLoading(false);
    }
  }, [page, size, direction]); //, tipo, estado, precioMin, precioMax, areaMin, areaMax, distrito

  useEffect(() => {
    cargarPropiedadesPage();
  }, [cargarPropiedadesPage]);

  const [selectedProp, setSelectedProp] = useState(null);

  if (loading) return <p class="text-center p-8">Cargando propiedades...</p>;

  return (
    <div
      class={`grid gap-6 bg-[#FEF7F2] 2xl:w-full 2xl:grid-cols-[280px_1fr] 2xl:gap-6 xl:grid-cols-[280px_1fr] xl:px-0 lg:px-0  2xl:px-0 lg:grid-cols-[280px_1fr] md:grid-cols-1 sm:grid-cols-1  lg:w-full lg:px-auto justify-center items-center md:w-full ${fondo}`}
    >
      <section
        className={`sticky top-4 mb-[45px] self-start w-full h-fit bg-white rounded-xl shadow-md z-20 ${fondo}`}
      >
        <div
          className={`w-full md:w-[100%] sm:w-[100%] xs:w-[100%] 2xl:w-[280px] lg:w-[280px] rounded-lg border p-[16px] shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-4 ${fondoSeccion} overflow-hidden`}
        >
          <div className="pb-4 text-lg flex justify-between items-center flex-row">
            <p className="font-semibold text-[22px]">
              {textos[idioma].Terreno.filtros.filtro}
            </p>

            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="flex justify-between text-[10px] gap-[5px] text-black items-center !text-black-500 w-fit font-sans !px-[8px] !py-[3px] hover:shadow-sm hover:rounded-xl hover:border hover:!text-white hover:font-semibold hover:gap-[5px] hover:!bg-green-700"
              >
                <AiOutlineClose className="text-black-600 hover:font-extrabold hover:text-white" />
                {textos[idioma].Terreno.filtros.limpiar}
              </button>
            )}
          </div>

          <div className="pb-4">
            <label
              htmlFor="opciones"
              className="text-[15px] font-sans font-semibold"
            >
              {textos[idioma].Terreno.filtros.tipo}
            </label>
            <div className="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="tipo"
                className={`!border !border-gray-400 rounded-md w-fit h-[36px] content-start flex items-center justify-center !px-[8px] ${fondoSeccion}`}
                value={filters.tipo}
                onChange={(e) => updateFilter("tipo", e.target.value)}
              >
                <option
                  value=""
                  className={`text-[15px] w-fit ${fondoSeccion}`}
                >
                  {textos[idioma].Terreno.filtros.todo}
                </option>
                <option value="TERRENO_URBANO" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.urbano}
                </option>
                <option value="TERRENO_AGRICOLA" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.agricola}
                </option>
                <option value="LOTIZACIÓN" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.localizacion}
                </option>
              </select>
            </div>
          </div>

          <div className="pb-4">
            <label
              htmlFor="opciones1"
              className="font-sans font-semibold text-[15px]"
            >
              {textos[idioma].Terreno.filtros.estado}
            </label>
            <div className="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="estado"
                className={`!border !border-gray-400 rounded-md w-fit h-[36px] content-start flex items-center justify-center !px-[8px] ${fondoSeccion}`}
                value={filters.estado}
                onChange={(e) => updateFilter("estado", e.target.value)}
              >
                <option value="" className="text-[15px] w-50px">
                  {textos[idioma].Terreno.filtros.todo}
                </option>
                <option value="DISPONIBLE" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.disponible}
                </option>
                <option value="RESERVADO" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.reservado}
                </option>
                <option value="VENDIDO" className="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.vendido}
                </option>
              </select>
            </div>
          </div>

          <div className="pb-4">
            <label className="font-sans font-semibold text-[18px]">
              {textos[idioma].Terreno.filtros.rango}
            </label>
            <br />
            <div className="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.minimo}
                className="!border !border-gray-500 !appearance-none rounded-md h-[36px] !py-[5px] !px-[8px]"
                value={filters.precioMin}
                onChange={(e) => updateFilter("precioMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.maximo}
                className="!border !border-gray-500 !appearance-none rounded-md h-[36px] !py-[5px] !px-[8px]"
                value={filters.precioMax}
                onChange={(e) => updateFilter("precioMax", e.target.value)}
                min={0}
              />
            </div>
          </div>

          <div className="pb-4">
            <label
              htmlFor="areaMax"
              className="font-sans font-semibold text-[18px]"
            >
              {textos[idioma].Terreno.filtros.area} (m²)
            </label>
            <br />
            <div className="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.minimo}
                className="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMin}
                onChange={(e) => updateFilter("areaMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.maximo}
                className="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMax}
                onChange={(e) => updateFilter("areaMax", e.target.value)}
                min={0}
              />
            </div>
          </div>
          <div className="pb-4">
            <label
              htmlFor="distrito"
              className="font-sans font-semibold text-[18px]"
            >
              {textos[idioma].Terreno.filtros.distrito}
            </label>
            <div className="pt-2">
              <input
                type="text"
                id="distrito"
                placeholder={textos[idioma].Terreno.filtros.distrito}
                className="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px] w-full"
                value={filters.distrito}
                onChange={(e) => updateFilter("distrito", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="terrenosUp"
        class="sm:px-0 xl:gap-6 2xl:gap-5 md:px-0 2xl:w-full "
      >
        <p class="w-full pb-5 px-2 ">
          {filteredPropiedades.length} {textos[idioma].Terreno.lista}
        </p>
        <div className="w-full pb-5">
          {filteredPropiedades.length > 0 ? (
            <div
              ref={btnRef}
              className="lg:sticky grid w-full h-fit justify-center sm:grid-cols-1 md:grid-cols-2 xl:gap-6 gap-6 2xl:grid-cols-3 xl:grid-cols-3 2xl:gap-6 lg:grid-cols-2 lg:gap-6 md:gap-6 2xl:w-full lg:w-full md:justify-center md:items-center sm:justify-center sm:items-center md:w-full"
            >
              {/* lg:sticky w-full h-fit onClick={onOpen} */}
              {filteredPropiedades.map((prop) => {
                return (
                  <div
                    key={prop.id}
                    onClick={() => {
                      setSelectedProp(prop);
                      onOpen();
                    }}
                    className={`h-[523px] w-[360px] xl:w-full md:w-full bg-card text-card-foreground flex flex-col gap-3 py-6 rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group 2xl:w-full lg:w-full sm:w-full ${fondoSeccion}`}
                  >
                    <div class="flex gap-6 flex-col md:gap-3">
                      <div class="relative overflow-hidden h-40 bg-muted">
                        <span class="absolute left-70 top-1 inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 z-10 text-foreground md:left-3 sm:left-3 2xl:left-3 lg:left-3 xl:left-3">
                          {prop.estado === "DISPONIBLE" && (
                            <p class="text-[11px] text-white py-0.5 px-2 items-center w-fit bg-green-700 ">
                              {" "}
                              {textos[idioma].Terreno.modal.disponible}{" "}
                            </p>
                          )}
                          {prop.estado === "RESERVADO" && (
                            <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-yellow-600">
                              {textos[idioma].Terreno.modal.reservado}{" "}
                            </p>
                          )}
                          {prop.estado === "VENDIDO" && (
                            <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-red-700">
                              {textos[idioma].Terreno.modal.vendido}{" "}
                            </p>
                          )}
                        </span>
                        <img
                          class="object-cover group-hover:scale-105 transition-transform duration-300 z-0 
                       inset-0 text-transparent h-[fit] w-[fit] mx-auto 2xl:h-[100%] 2xl:w-[100%] lg:h-[100%] lg:w-[100%] xl:h-[100%] xl:w-[100%] md:h-[100%] md:w-[100%]"
                          //   class="object-cover group-hover:scale-105 transition-transform duration-300 z-0
                          //  inset-0 text-transparent h-[fit] w-[fit] mx-auto 2xl:h-[100%] 2xl:w-[100%] lg:h-[100%] lg:w-[100%] xl:h-[100%] xl:w-[100%] md:h-fit md:w-fit "
                          // sm:w-full sm:h-full
                          src={buildImageUrl(prop.multimedia?.[0]?.url)}
                          alt={prop.titulo}
                        />
                      </div>
                      <div class="p-[16px] flex flex-col gap-6">
                        <div class="flex gap-1 items-start justify-between">
                          <h1 class="text-[15px] w-[150px] text-left lg:w-[150px] !xl:w-[150px] 2xl:w-[200px]">
                            {prop.titulo.length > 17
                              ? prop.titulo.substring(0, 17) + "..."
                              : prop.titulo}
                          </h1>
                          <p
                            class={`inline-flex !w-[90px] items-start px-1 h-fit text-xs justify-center rounded-md py-0.5  text-black  outline-2 outline-amber-700/100 content-center ${fondo}`}
                            style={{ minWidth: "100px" }}
                            bg-yellow-100
                            text-black
                            bg-amber-800
                          >
                            {prop.tipo === "TERRENO_AGRICOLA" && (
                              <p class="text-[11px]  items-center w-fit">
                                {textos[idioma].Terreno.modal.agricola}{" "}
                              </p>
                            )}
                            {prop.tipo === "TERRENO_URBANO" && (
                              <p class="text-[11px] xl:text-[10px] w-fit items-center">
                                {textos[idioma].Terreno.modal.urbano}{" "}
                              </p>
                            )}
                            {prop.tipo === "LOTIZACIÓN" && (
                              <p class="text-[11px] w-fit items-center">
                                {textos[idioma].Terreno.modal.localizacion}{" "}
                              </p>
                            )}
                          </p>
                        </div>
                        <div>
                          <p class="text-sm text-left">
                            {prop.descripcion.length > 92
                              ? prop.descripcion.substring(0, 92) + "..."
                              : prop.descripcion}
                          </p>
                        </div>
                        <div class="flex gap-6 flex-col">
                          <div class="flex gap-6">
                            <img
                              class="w-5 h-5 text-xs"
                              src="img/MapPin.svg"
                              alt=""
                            />
                            <p>
                              {" "}
                              {prop.direccion.length > 20
                                ? prop.direccion.substring(0, 20) + "..."
                                : prop.direccion}
                            </p>
                          </div>
                          <div class="flex gap-6">
                            <img
                              class="w-5 text-xs"
                              src="img/Arrow-Arrow-expand.svg"
                              alt=""
                            />
                            <p>{prop.metrosCuadrados} m²</p>
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-6 px-4 pb-4">
                        <p class={`text-2xl  font-bold ${fondoPrecio}`}>
                          {prop?.precio != null && (
                            <span>
                              {" "}
                              S/ {Number(prop.precio).toLocaleString(
                                "es-PE"
                              )}{" "}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div class="text-gray-500 w-[100%] h-[500px] flex justify-center items-center">
              {textos[idioma].Terreno.sinTerrenos}
            </div>
          )}
        </div>

        <Modal
          onClose={onClose}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          class={`w-[300px] h-[300px] p-[20px] max-sm:w-[90%] sm:h-[290px] lg:w-[300px] md:w-[250px] 2xl:w-[90%] ${fondoSeccion}`}
          finalFocusRef={btnRef}
          scrollBehavior={scrollBehavior}
          isCentered
        >
          <ModalOverlay />
          <ModalContent class=" 2xl:w-[850px] lg:w-[750px] md:w-[650px] sm:w-[550px] max-sm:w-[440px]">
            <ModalBody
              pr={0}
              pl={0}
              pt={0}
              pb={0}
              className={`${fondoSeccion}`}
            >
              {selectedProp && (
                <div
                  key={selectedProp.id}
                  class={`h-[523px] w-[460px] max-sm:max-w-[300px] xl:w-full md:w-full bg-card text-card-foreground flex flex-col cursor-pointer `}
                >
                  <div class={`flex justify-between items-center px-[0px] `}>
                    <ModalHeader class={`py-[15px] !px-[10px] text-[24px] `}>
                      {selectedProp.titulo}
                    </ModalHeader>
                    <ModalCloseButton class="w-[30px] p-[10px]" />
                  </div>
                  <div class={`flex gap-6 flex-col `}>
                    <div class={`h-full bg-muted `}>
                      {(() => {
                        const imagenesProp =
                          selectedProp?.multimedia?.map((img) =>
                            buildImageUrl(img.url)
                          ) || [];
                        return (
                          <Carousel
                            images={
                              imagenesProp.length > 0
                                ? imagenesProp
                                : ["/img/fondo.png"]
                            }
                          />
                        );
                      })()}
                    </div>

                    <div class="p-[16px] flex flex-col gap-6 ">
                      <div class="flex gap-2 items-center ">
                        <span class="text-[10px] bg-white text-amber-700 rounded-sm outline-2 outline-amber-700/100  px-2 py-1 font-bold">
                          {selectedProp.estado}
                        </span>
                        {/* {estados[selectedProp.estado]?.[idioma] || selectedProp.estado} */}

                        <span class="text-[10px] text-white bg-amber-800 font-bold px-2 py-1 rounded">
                          {selectedProp.tipo === "TERRENO_AGRICOLA" &&
                            textos[idioma].Terreno.modal.agricola}
                          {selectedProp.tipo === "TERRENO_URBANO" &&
                            textos[idioma].Terreno.modal.urbano}
                          {selectedProp.tipo === "LOTIZACIÓN" &&
                            textos[idioma].Terreno.modal.localizacion}
                        </span>
                      </div>
                      <div class="grid grid-cols-2 gap-[15px] sm:text-[10px] md:text-[12px] lg:text-[14px] xl:text-[15px] 2xl:text-[16px]">
                        <div class=" flex gap-2 items-start ">
                          <p class="text-[20px] items-start text-amber-950 px-2">
                            S/
                          </p>
                          <div class="flex flex-col ">
                            <p class="text-[1rem] text-zinc-400 ">
                              {textos[idioma].Modal.precio}
                            </p>
                            <p class="text-[1rem] text-black-400 font-bold">
                              {" "}
                              {selectedProp?.precio != null && (
                                <span>
                                  {" "}
                                  S/{" "}
                                  {Number(selectedProp.precio).toLocaleString(
                                    "es-PE"
                                  )}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              class="icon icon-tabler icons-tabler-outline icon-tabler-arrows-diagonal"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M16 4l4 0l0 4" />
                              <path d="M14 10l6 -6" />
                              <path d="M8 20l-4 0l0 -4" />
                              <path d="M4 20l6 -6" />
                            </svg>
                            {/* <img class="flex gap-2 items-start" src="/public/img/Arrow-Arrow-expand.svg" alt="arrow"/> */}
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[1rem] text-zinc-400">
                              {textos[idioma].Modal.area}
                            </p>
                            <p class="text-black-400 font-bold text-[1rem]">
                              {selectedProp.metrosCuadrados} m²
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            <img class="w-5" src="img/MapPin.svg" />
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[1rem] text-zinc-400">
                              {textos[idioma].Modal.distrito}
                            </p>
                            <p class="text-black-400 font-bold text-[1rem]">
                              {selectedProp.direccion}
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            🗓️
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[1rem] text-zinc-400">
                              {textos[idioma].Modal.publicado}
                            </p>
                            <p class="text-black text-[1rem] font-bold">
                              {selectedProp.fechaPublicacion}
                            </p>
                          </div>
                        </div>
                      </div>
                      <footer class="flex flex-col gap-2">
                        <div class="flex flex-row gap-[10px]">
                          <p class="text-[15px] text-zinc-400">📝</p>
                          <p class="text-[1rem] text-black-400 font-bold">
                            {textos[idioma].Modal.descripcion}
                          </p>
                        </div>
                        <p class="text-[1rem]">{selectedProp.descripcion}</p>
                      </footer>
                    </div>
                    <div class="pt-[10px] pb-[5px] px-[16px]">
                      <Button
                        onClick={onClose}
                        colorScheme="red"
                        variant="outline"
                        w={"100%"}
                        mt={"10px"}
                        mb={"10px"}
                      >
                        {textos[idioma].Modal.cerrar}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <div class="flex justify-center items-center gap-4 mt-6 text-black">
          <button
            onClick={() => {
              setPage((p) => {
                const newPage = Math.max(p - 1, 0);
                window.scrollTo({ top: 70, behavior: "instant" });
                return newPage;
              });
            }}
            disabled={page === 0}
            class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {/* Anterior */}
          </button>
          {/* <span>
            Página {page + 1} de {totalPages}
          </span> */}
          <button
            onClick={() => {
              setPage((p) => {
                const newPage = Math.min(p + 1, totalPages - 1);
                window.scrollTo({ top: 70, behavior: "instant" });
                return newPage;
              });
            }}
            disabled={page + 1 >= totalPages}
            class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {/* Siguiente */}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Terreno;

{
  /* <section className={` lg:sticky  mb-[45px] self-start top-4 w-full  h-fit bg-white rounded-xl shadow-md ${fondo}`}>
  
        <div className={`w-full md:w-[100%] sm:w-[100%] xs:w-[100%] 2xl:w-[280px] lg:w-[280px] rounded-lg border p-[16px] shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col gap-4 ${fondoSeccion}`}>
          <div class="pb-4 text-lg flex justify-between items-center flex-row">
            <p class="font-semibold text-[22px]">{textos[idioma].Terreno.filtros.filtro}</p>
            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                class="flex justify-between text-[10px] gap-[5px] text-black  items-center !text-black-500 w-fit font-sans !px-[8px] !py-[3px] hover:shadow-sm hover:rounded-xl hover:border hover:!text-white hover:font-semibold hover:gap-[5px] hover:!bg-green-700">
                <AiOutlineClose class="text-black-600 hover:font-extrabold hover:text-white" />
                {textos[idioma].Terreno.filtros.limpiar}
              </button>
            )}
          </div>
          <div class="pb-4">
            <label
              htmlFor="opciones"
              class="text-[15px] font-sans font-semibold"
            >
              {textos[idioma].Terreno.filtros.tipo}
            </label>
            <div class="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="tipo"
                // !appearance-none md:w-[95px] sm:w-[95px] !py-[5px] !px-[8px] bg-transparent
                class={`!border !border-gray-400 rounded-md w-fit  h-[36px] content-start flex items-center justify-center !px-[8px] ${fondoSeccion}`}
                value={filters.tipo}
                onChange={(e) => updateFilter("tipo", e.target.value)} >
                <option value="" class={`text-[15px] w-fit ${fondoSeccion}`} >
                  {textos[idioma].Terreno.filtros.todo}
                </option>
                <option value="TERRENO_URBANO" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.urbano}
                </option>
                <option value="TERRENO_AGRICOLA" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.agricola}
                </option>
                <option value="LOTIZACIÓN" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.localizacion}
                </option>
              </select>
            </div>
          </div>
          <div class="pb-4">
            <label
              htmlFor="opciones1"
              class="font-sans font-semibold text-[15px]">
              {textos[idioma].Terreno.filtros.estado}
            </label>
            <div class="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="estado"
                // !appearance-none sm:w-[95px] md:w-[95px] !py-[5px] !px-[10px] bg-transparent 
                class={`!border !border-gray-400 rounded-md w-fit h-[36px] content-start flex items-center justify-center !px-[8px] ${fondoSeccion}`}
                value={filters.estado}
                onChange={(e) => updateFilter("estado", e.target.value)}
              >
                <option value="" class="text-[15px] w-50px">
                  {textos[idioma].Terreno.filtros.todo}
                </option>
                <option value="DISPONIBLE" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.disponible}
                </option>
                <option value="RESERVADO" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.reservado}
                </option>
                <option value="VENDIDO" class="text-[15px] w-fit">
                  {textos[idioma].Terreno.filtros.vendido}
                </option>
              </select>
            </div>
          </div>
          <div class="pb-4">
            <label htmlFor="" class="font-sans font-semibold text-[18px]">
              {textos[idioma].Terreno.filtros.rango}
            </label>{" "}
            <br />
            <div class="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.minimo}
                class="!border !border-gray-500 !appearance-none rounded-md h-[36px] !py-[5px] !px-[8px]"
                // class="border rounded px-3 py-1 h-[30px] "
                value={filters.precioMin}
                onChange={(e) => updateFilter("precioMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.maximo}
                // class="border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md h-[36px] !py-[5px] !px-[8px]"
                value={filters.precioMax}
                onChange={(e) => updateFilter("precioMax", e.target.value)}
                min={0}
              />
            </div>
          </div>

          <div class="pb-4">
            <label
              htmlFor="areaMax"
              class="font-sans font-semibold text-[18px]"
            >
              {textos[idioma].Terreno.filtros.area} (m²)
            </label>{" "}
            <br />
            <div class="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.minimo}
                // class=" border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMin}
                onChange={(e) => updateFilter("areaMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder={textos[idioma].Terreno.filtros.maximo}
                // class="border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMax}
                onChange={(e) => updateFilter("areaMax", e.target.value)}
                min={0}
              />
            </div>
          </div>
          <div class="pb-4">
            <label
              htmlFor="distrito"
              class="font-sans font-semibold text-[18px]"
            >
              {textos[idioma].Terreno.filtros.distrito}
            </label>
            <div class="pt-2">
              <input
                type="text"
                id="distrito"
                placeholder={textos[idioma].Terreno.filtros.distrito}
                // class="border rounded px-3 py-1 w-full h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px] w-full"
                value={filters.distrito}
                onChange={(e) => updateFilter("distrito", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section> */
}
