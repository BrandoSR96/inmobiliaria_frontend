// import BtnAgregar from "../components/BtnAgregar";
// import BtnActualizar from "../components/BtnActualizar";
// import BtnSalir from "../components/BtnSalir";
// import { eliminarPropiedad } from "../Services/ApiServices";
// import usePropiedadesPage from "../hooks/usePropiedadesPage";
// import { useState } from "react";
// import { useToast, Button, Box, Flex, Text } from "@chakra-ui/react";
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
// import TabUsuario from "../components/TabUsuario";

// const Crud = () => {
//   const [mensaje, setMensaje] = useState("");
//   console.log(mensaje)
//   const toast=useToast()

//   // ✅ Usamos solo el hook personalizado
//   const { propiedades, totalPages, loading, page, setPage, cargarPropiedadesPage, } = usePropiedadesPage({ size: 8, direction: "desc" });

//   // 🧩 Manejar eliminación
//   const handleDelete = async (id) => {
//   // Mostramos el toast de confirmación
//   localStorage.setItem("ID", id); // Guardar ID temporalmente
//   toast({
//     duration: null,
//     position: "top",
//     render: ({ onClose }) => (
//       <Box position="fixed"
//         bg="#FEF7F2" color="#8A3A13" p={5} borderRadius="md" textAlign="center" boxShadow="lg" >
//         <Text fontWeight="bold" mb={4}>
//           ¿Eliminar esta propiedad?
//         </Text>

//         <Flex justify="center" gap={3}>
//           <Button bg="#8A3A13" color="white" _hover={{ bg: "#6d2d0f" }} size="sm"
//             onClick={async () => {
//               onClose();
//               const exito = await eliminarPropiedad(id);
//               if (exito) {
//                 toast({
//                   title: "Exitoso",
//                   description: `Propiedad ${id} eliminada correctamente`,
//                   status: "error",
//                   duration: 2000,
//                   isClosable: true,
//                 });
//                 setMensaje("✅ Propiedad eliminada correctamente");
//                 cargarPropiedadesPage(); 
//               } else {
//                 toast({
//                   title: "Error",
//                   description: `No se pudo eliminar la propiedad ${id}`,
//                   status: "info",
//                   duration: 2000,
//                   isClosable: true,
//                 });
//               }
//             }}
//           >
//             Sí
//           </Button>

//           <Button variant="outline" borderColor="#8A3A13"
//             color="#8A3A13" size="sm"
//             onClick={() => {
//               onClose();
//               toast({
//                 title: "Cancelado",
//                 description: `Propiedad ${id} no fue eliminada`,
//                 status: "info",
//                 duration: 2000,
//                 isClosable: true,
//               });
//             }}
//           >
//             No
//           </Button>
//         </Flex>
//       </Box>
//     ),
//   });
// };

//   if (loading) return <p>Cargando propiedades...</p>;

//   return (
//     <div class="flex flex-col gap-6">
//       <BtnSalir />

//       <Tabs isManual variant="enclosed" class="flex justify-center flex-col items-center" >
//         {/* class='flex justify-center flex-col items-center' */}
//         <TabList>
//           <Tab color={'silver'} fontWeight={'400'} _selected={{ bg: "#FEF7F2", color: "#952C00", fontWeight: "600", boxShadow: "-1px 0px 5px 0px rgb(149,44,0,0.4)", }}>
//             Administrar Terreno
//           </Tab>
//           <Tab color={'silver'} fontWeight={'400'} _selected={{ bg: "#FEF7F2", color: "#952C00", fontWeight: "600", boxShadow: "1px 0px 5px 0px rgb(149,44,0,0.4)", }}>
//             Administrar Usuarios
//           </Tab>
//         </TabList>
//         <TabPanels class="w-fit">
//           <TabPanel>
//             <Box as="main" class="mx-auto px-6 py-8 !bg-[#FEF7F2]">
//               <div class="flex items-center justify-between mb-6 border-b border-red-200">
//                 <div class="text-[25px]">
//                   <h1 textColor={'black'} class="text-[25px] font-bold">
//                     Panel de Administración de Terrenos
//                   </h1>
//                   <p class="text-gray-400 text-[15px]">
//                     Gestiona todos los terrenos disponibles
//                   </p>
//                 </div>

//                 <BtnAgregar
//                   onPropiedadCreada={cargarPropiedadesPage}
//                   class="inline-flex items-center w-[190px] px-4 py-2 justify-center bg-[#952C00] rounded-md text-white hover:bg-[#7a2200] transition-colors "
//                 />
//               </div>

//               <table class=" w-full caption-bottom text-sm border-collapse md:border-separate md:rounded-lg overflow-hidden ">
//                 <thead class='!border-1 !border-black !rounded-lg h-[40px]'>
//                   <tr class="text-foreground text-center font-medium whitespace-nowrap bg-[#dac6be] h-[40px]">
//                     <th class="w-[250px] text-left text-[14px] px-5 border border-gray-300 text-black ">
//                       Título
//                     </th>
//                     <th className="hidden 2xl:block xl:block lg:block w-[300px] text-left text-[14px] px-5 border border-gray-300 text-black h-[40px] content-center ">
//                       Ubicación
//                     </th>
//                     <th class="w-[151px] text-left text-[14px] px-5 border border-gray-300 text-black ">
//                       Tipo
//                     </th>
//                     <th class="hidden 2xl:block xl:block lg:block w-[111px] text-left text-[14px] px-5 border border-gray-300 text-black h-[40px] content-center">
//                       Área
//                     </th>
//                     <th className="w-[160px] text-left text-[14px] px-5 border border-gray-300 text-black ">
//                       Precio
//                     </th>
//                     <th class="hidden 2xl:block xl:block lg:block md:block w-[144px] text-left text-[14px] px-5 border border-gray-300 text-black h-[40px] content-center">
//                       Estado
//                     </th>
//                     <th class="w-[146px] text-right text-[14px] px-5 border border-gray-300 text-black ">
//                       Acciones
//                     </th>
//                   </tr>
//                 </thead>

//                 <tbody class='!border-1 !border-black !rounded-lg'>
//                   {propiedades.length > 0 ? (
//                     propiedades.map((prop) => (
//                       <tr key={prop.id}
//                         class="hover:bg-muted/50 border-b transition-colors !border-1 !border-black ">
//                         <Box as='td' class="p-2 flex text-left items-center whitespace-nowrap h-[52px] max-w-[250px] truncate text-[14px] text-black" className="p-2">
//                           {prop.titulo}
//                         </Box>
//                         <Box as='td' class="hidden 2xl:block xl:block lg:block text-left p-2 h-[52px] text-[14px] text-black" className="pl-[15px]">
//                           {prop.direccion}
//                         </Box>
//                         <Box as='td' className=" text-left p-2 h-[52px] text-[14px] ">
//                           <Box as='span'
//                             class="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs text-black "
//                             style={{ minWidth: "90px" }} >
//                             {prop.tipo}
//                           </Box>
//                         </Box>
//                         <Box as='td' class="hidden 2xl:block xl:block lg:block text-left p-3 h-[52px] text-[14px] text-black" className="pl-[15px]">
//                           {prop.metrosCuadrados} m²
//                         </Box>
//                         <Box as='td' class=" text-left p-2 h-[52px] text-[14px] text-black"  className="pl-[15px]">
//                           S./ {prop.precio}
//                         </Box>
//                         <td class="hidden 2xl:block xl:block lg:block md:block text-left p-2 h-[52px] text-[14px] text-black ">
//                           <span
//                             class="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs "style={{ minWidth: "90px" }}>
//                             {prop.estado === "DISPONIBLE" && (
//                               <p class="text-[11px] text-white py-0.5 px-2 items-center w-fit bg-green-700 rounded-md  border">
//                                 DISPONIBLE
//                               </p>
//                             )}
//                             {prop.estado === "RESERVADO" && (
//                               <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-yellow-600 rounded-md border">
//                                 RESERVADO
//                               </p>
//                             )}
//                             {prop.estado === "VENDIDO" && (
//                               <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-red-700 rounded-md border">
//                                 VENDIDO
//                               </p>
//                             )}
//                           </span>
//                         </td>
//                         <td class="p-0 text-center">
//                           <div class="flex justify-center gap-4 items-center text-black">
//                             {/* 🧩 Botón Editar */}
//                             <BtnActualizar
//                               propiedad={prop}
//                               onActualizado={cargarPropiedadesPage} // 🔄 refresca después de editar
//                             />

//                             {/* 🧩 Botón Eliminar */}
//                             <button
//                               onClick={() => handleDelete(prop.id)}
//                               class="bg-red text-white p-2 rounded-sm hover:bg-red-600 transition-colors duration-200 bg-[#FEF7F2] cursor-pointer"
//                               title="Eliminar propiedad"
//                             >
//                               <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="red" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-5 h-5" >
//                                 <path
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                                 ></path>
//                               </svg>
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td
//                         colSpan="7"
//                         class="text-center py-6 text-gray-500 italic"
//                       >
//                         No hay propiedades registradas.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>

//               {/* Paginación */}
//               <div class="flex justify-center items-center gap-4 mt-6">
//                 <button
//                   onClick={() => {
//                     setPage((p) => Math.max(p - 1, 0));
//                     window.scrollTo({ top: 0, behavior: "instant" });
//                   }}
//                   disabled={page === 0}
//                   class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//                 >
//                   Anterior
//                 </button>

//                 <span>
//                   Página {page + 1} de {totalPages}
//                 </span>

//                 <button
//                   onClick={() => {
//                     setPage((p) => Math.min(p + 1, totalPages - 1));
//                     window.scrollTo({ top: 0, behavior: "instant" });
//                   }}
//                   disabled={page + 1 >= totalPages}
//                   class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
//                 >
//                   Siguiente
//                 </button>
//               </div>
//             </Box>
//           </TabPanel>
//           <TabPanel>
//             <TabUsuario />
//           </TabPanel>
//         </TabPanels>
//       </Tabs>
//     </div>
//   );
// };

// export default Crud;

import BtnAgregar from "../components/BtnAgregar";
import BtnActualizar from "../components/BtnActualizar";
import BtnSalir from "../components/BtnSalir";
import { eliminarPropiedad } from "../Services/ApiServices";
import usePropiedadesPage from "../hooks/usePropiedadesPage";
import { useState } from "react";
import { useToast, Button, Box, Flex, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import TabUsuario from "../components/TabUsuario";

const Crud = () => {
  const [mensaje, setMensaje] = useState("");
  console.log(mensaje)
  const toast = useToast()

  const { propiedades, totalPages, loading, page, setPage, cargarPropiedadesPage } = usePropiedadesPage({ size: 8, direction: "desc" });

  const handleDelete = async (id) => {
    localStorage.setItem("ID", id);
    toast({
      duration: null,
      position: "top",
      render: ({ onClose }) => (
        <Box position="fixed" bg="#FEF7F2" color="#8A3A13" p={5} borderRadius="md" textAlign="center" boxShadow="lg">
          <Text fontWeight="bold" mb={4}>
            ¿Eliminar esta propiedad?
          </Text>

          <Flex justify="center" gap={3}>
            <Button bg="#8A3A13" color="white" _hover={{ bg: "#6d2d0f" }} size="sm"
              onClick={async () => {
                onClose();
                const exito = await eliminarPropiedad(id);
                if (exito) {
                  toast({
                    title: "Exitoso",
                    description: `Propiedad ${id} eliminada correctamente`,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                  setMensaje("✅ Propiedad eliminada correctamente");
                  cargarPropiedadesPage();
                } else {
                  toast({
                    title: "Error",
                    description: `No se pudo eliminar la propiedad ${id}`,
                    status: "info",
                    duration: 2000,
                    isClosable: true,
                  });
                }
              }}
            >
              Sí
            </Button>

            <Button variant="outline" borderColor="#8A3A13" color="#8A3A13" size="sm"
              onClick={() => {
                onClose();
                toast({
                  title: "Cancelado",
                  description: `Propiedad ${id} no fue eliminada`,
                  status: "info",
                  duration: 2000,
                  isClosable: true,
                });
              }}
            >
              No
            </Button>
          </Flex>
        </Box>
      ),
    });
  };

  if (loading) return <p>Cargando propiedades...</p>;

  return (
    <div className="flex flex-col gap-6">
      <BtnSalir />

      <Tabs isManual variant="enclosed" align="center" className="flex justify-center flex-col items-center" >
        <TabList>
          <Tab color={"silver"} fontWeight={"400"} _selected={{ bg: "#FEF7F2", color: "#952C00", fontWeight: "600",
              boxShadow: "-1px 0px 5px 0px rgb(149,44,0,0.4)", }} >
            Administrar Terreno
          </Tab>
          <Tab color={"silver"} fontWeight={"400"} _selected={{ bg: "#FEF7F2", color: "#952C00", fontWeight: "600", boxShadow: "1px 0px 5px 0px rgb(149,44,0,0.4)", }} >
            Administrar Usuarios
          </Tab>
        </TabList>
        <TabPanels className="w-fit">
          <TabPanel>
            <Box as="main" className="mx-auto px-6 py-8 !bg-[#FEF7F2]">
              <div className="flex items-center justify-between mb-6 border-b border-red-200">
                <div className="text-[25px]">
                  <h1 className="text-[25px] font-bold text-black text-left">
                    Panel de Administración de Terrenos
                  </h1>
                  <p className="text-gray-400 text-[15px] text-left">
                    Gestiona todos los terrenos disponibles
                  </p>
                </div>

                <BtnAgregar
                  onPropiedadCreada={cargarPropiedadesPage}
                  className="inline-flex items-center w-[190px] px-4 py-2 justify-center bg-[#952C00] rounded-md text-white hover:bg-[#7a2200] transition-colors "
                />
              </div>

              {/* Tabla responsive */}
              <div className="w-full ">
                <table className="w-full caption-bottom text-sm border-collapse md:border-separate md:rounded-lg ">
                  {/* min-w-[900px] w-full overflow-x-auto overflow-hidden*/}
                  <thead className="!border-1 !border-black !rounded-lg h-[40px]">
                    <tr className="text-foreground text-center font-medium whitespace-nowrap bg-[#dac6be] h-[40px]">
                      <th className=" hidden 2xl:table-cell xl:table-cell lg:table-cell  md:table-cell sm:table-cell max-sm:table-cell text-left text-[14px] px-5 border border-gray-300 text-black w-[250px]">
                        Título
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell text-left text-[14px] px-5 border border-gray-300 text-black">
                        Ubicación
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell text-left text-[14px] px-5 border border-gray-300 text-black">
                        Tipo
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell text-left text-[14px] px-5 border border-gray-300 text-black w-[100px]">
                        Área
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell lg:table-cell text-left text-[14px] px-5 border border-gray-300 text-black">
                        Precio
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell max-sm:table-cell text-left text-[14px] px-5 border border-gray-300 text-black w-[100px]">
                        Estado
                      </th>
                      <th className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell max-sm:table-cell  text-right text-[14px] pr-[20px] border border-gray-300 text-black 
                      w-[90px]">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="!border-1 !border-black !rounded-lg">
                    {propiedades.length > 0 ? (
                      propiedades.map((prop) => (
                        <tr key={prop.id} className=" hover:bg-muted/50 border-b transition-colors !border-1 !border-black" >
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell max-sm:table-cell p-2 text-left items-center whitespace-nowrap h-[52px] max-w-[250px] truncate text-[14px] text-black">
                            {prop.titulo}
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell text-left p-2 h-[52px] text-[14px] text-black">
                            {prop.direccion}
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell  text-left p-2 h-[52px] text-[14px]">
                            <span
                              className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-xs text-black"
                              style={{ minWidth: "90px" }}
                            >
                              {prop.tipo}
                            </span>
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell text-left p-3 h-[52px] text-[14px] text-black">
                            {prop.metrosCuadrados} m²
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell text-left p-2 h-[52px] text-[14px] text-black">
                            S./ {prop.precio}
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell  md:table-cell sm:table-cell max-sm:table-cell text-left p-2 h-[52px] text-[14px] text-black">
                            <span
                              className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs"
                              style={{ minWidth: "90px" }}
                            >
                              {prop.estado === "DISPONIBLE" && (
                                <p className="text-[11px] text-white py-0.5 px-2 items-center w-fit bg-green-700 rounded-md border">
                                  DISPONIBLE
                                </p>
                              )}
                              {prop.estado === "RESERVADO" && (
                                <p className="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-yellow-600 rounded-md border">
                                  RESERVADO
                                </p>
                              )}
                              {prop.estado === "VENDIDO" && (
                                <p className="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-red-700 rounded-md border">
                                  VENDIDO
                                </p>
                              )}
                            </span>
                          </td>
                          <td className="hidden 2xl:table-cell xl:table-cell lg:table-cell md:table-cell sm:table-cell max-sm:table-cell p-0 text-center">
                            <div className="flex justify-center gap-4 items-center text-black">
                              <BtnActualizar
                                propiedad={prop}
                                onActualizado={cargarPropiedadesPage}
                              />
                              <button
                                onClick={() => handleDelete(prop.id)}
                                className="bg-red text-white p-2 rounded-sm hover:bg-red-600 transition-colors duration-200 bg-[#FEF7F2] cursor-pointer"
                                title="Eliminar propiedad"
                              >
                                <svg
                                  data-slot="icon"
                                  fill="none"
                                  strokeWidth="1.5"
                                  stroke="red"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-6 text-gray-500 italic"
                        >
                          No hay propiedades registradas.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="flex justify-center items-center gap-4 mt-6 text-black">
                <button
                  onClick={() => {
                    setPage((p) => Math.max(p - 1, 0));
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  disabled={page === 0}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Anterior
                </button>

                <span>
                  Página {page + 1} de {totalPages}
                </span>

                <button
                  onClick={() => {
                    setPage((p) => Math.min(p + 1, totalPages - 1));
                    window.scrollTo({ top: 0, behavior: "instant" });
                  }}
                  disabled={page + 1 >= totalPages}
                  className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
              
            </Box>
          </TabPanel>
          <TabPanel>
            <TabUsuario />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Crud;

