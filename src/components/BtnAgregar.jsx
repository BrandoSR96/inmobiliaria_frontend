import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, NumberInput, NumberInputField,  NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, Box, Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { crearPropiedad } from "../Services/ApiServices";
// import { jwtDecode } from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { subirMultimedia } from "../hooks/useMultimedia";
import { AiOutlineClose } from "react-icons/ai";
import { useColorMode } from "@chakra-ui/react";

const BtnAgregar = ({ onPropiedadCreada, className }) => {
  const toast = useToast();

  const { colorMode } = useColorMode();
    
  const fondo = colorMode === "light"
    ? "bg-[#FEF7F2] text-black"
    : "bg-white text-black";

  //multimedia
  const [archivo, setArchivo] = useState([]); //-file
  console.log("file:", archivo);

  // --- States para inputs ---
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [servicios, setServicios] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenImg, onOpen: onOpenImg, onClose: onCloseImg,} = useDisclosure();



  // --- Validación de campos ---
  const validarCampos = () => {
    if (
      !titulo ||
      !descripcion ||
      !precio ||
      !metrosCuadrados ||
      !direccion ||
      !distrito ||
      !tipo ||
      !estado
    ) {
      alert("Todos los campos son obligatorios");
      return false;
    }
    if (isNaN(precio) || isNaN(metrosCuadrados)) {
      alert("Precio y metros cuadrados deben ser números válidos");
      return false;
    }
    return true;
  };

  // --- Manejar creación ---
  const handleGuardar = async () => {
    if (!validarCampos()) return;

    const token = localStorage.getItem("token");
    const usuarioID = localStorage.getItem("UsuarioID");

    if (!token) {
      alert("No hay token disponible. Por favor, inicia sesión nuevamente.");
      return;
    }

    const data = {
      titulo,
      descripcion,
      precio: Number(precio),
      metrosCuadrados: Number(metrosCuadrados),
      direccion,
      distrito,
      tipo,
      estado,
      servicios,
      usuario: { id: Number(usuarioID) },
    };

    let propiedadCreada = null;

    try {
      // ✅ Crear propiedad correctamente
      propiedadCreada = await crearPropiedad(data, token);

      toast({
        title: "Propiedad creada",
        description: "Se creó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // MULTIMEDIA
      // SUBIR MÚLTIPLES IMÁGENES
    if (archivo.length > 0) {
      try {
        const imagenesSubidas = [];
      
        for (const img of archivo) {
          const nuevaImagen = await subirMultimedia(
            img,
            "imagen",
            propiedadCreada.id
          );
        
          imagenesSubidas.push({ url: nuevaImagen.archivo.url });
        }
      
        propiedadCreada.multimedia = imagenesSubidas;
      
        toast({
          title: "Imágenes subidas",
          description: "Todas las imágenes se subieron correctamente",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Error subiendo multimedia:", error);
        toast({
          title: "Error al subir imágenes",
          description: "La propiedad se creó, pero algunas imágenes fallaron",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }


      // Limpiar campos
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setMetrosCuadrados("");
      setDireccion("");
      setDistrito("");
      setTipo("");
      setEstado("");
      setServicios("");
      setArchivo([]);

      onClose();

      if (onPropiedadCreada) onPropiedadCreada(propiedadCreada);
    } catch (error) {
      console.error("Error al crear propiedad:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la propiedad",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  //  useEffect((handleGuardar) => {
  //   listarPropiedades();
  // }, []);
  const removeImage = (indexToRemove) => {
  setArchivo((prev) => prev.filter((_, index) => index !== indexToRemove));
};


  return (
    <>
      <Button
        onClick={onOpen}
        className={className}
        bgColor={"#952C00"}
        colorScheme="#952C00"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 28 24"
          fill="none"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-plus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        <span className="text-[16px] text-white"> Agregar terreno </span>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={'auto'}>
          <ModalHeader>Crear Nuevo Terreno</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl class="flex flex-col gap-1">
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <FormLabel htmlFor="Descripcion">Descripción</FormLabel>
              <Textarea
                id="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción..."
              />

              <div className="flex flex-row gap-4">
                <div>
                  <FormLabel htmlFor="Precio">Precio</FormLabel>
                  <NumberInput
                    id="Precio"
                    value={precio}
                    onChange={(value) => setPrecio(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <FormLabel htmlFor="Area">Área (m²)</FormLabel>
                  <NumberInput
                    id="Area"
                    value={metrosCuadrados}
                    onChange={(value) => setMetrosCuadrados(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              </div>
              <div class="flex flex-row gap-4">
                <div>
                  <FormLabel htmlFor="Direccion">Dirección</FormLabel>
                  <Input
                    id="Direccion"
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="Distrito">Distrito</FormLabel>
                  <Input
                    id="Distrito"
                    type="text"
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                  />
                </div>
              </div>

              <div class="flex flex-row gap-20">
                <div>
                  <FormLabel htmlFor="Tipo">Tipo</FormLabel>
                  <Select
                    id="Tipo"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="TERRENO_AGRICOLA">Agrícola</option>
                    <option value="TERRENO_URBANO">Urbano</option>
                    <option value="LOTIZACIÓN">Lotización</option>
                  </Select>
                </div>
                <div>
                  <FormLabel htmlFor="Estado">Estado</FormLabel>
                  <Select
                    id="Estado"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="VENDIDO">Vendido</option>
                  </Select>
                </div>
              </div>
              <FormLabel className="flex flex-col gap-1" htmlFor="fileInput">
                File Imagen
              </FormLabel>

              <Input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                display="none"
                onChange={(e) => setArchivo(Array.from(e.target.files))}
              />
              {/* htmlFor="fileInput"  */}
              <label onClick={onOpenImg}>
                <Flex
                  align="center"
                  border="1px solid #ccc"
                  borderRadius="md"
                  p="6px 12px"
                  cursor="pointer"
                  bg="gray.100"
                  _hover={{ bg: "gray.200" }}
                  gap="8px"
                >
                  <span
                    style={{
                      background: "#952C00",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    Elegir archivos
                  </span>
                  <span className="text-gray-700">
                    {archivo.length === 0
                      ? "Haz clic para seleccionar imágenes"
                      : `${archivo.length} archivo(s) seleccionados`}
                  </span>
                </Flex>
              </label>
              <Modal isOpen={isOpenImg} onClose={onCloseImg}  size="lg">
                <ModalOverlay />
                <ModalContent m={'auto'}>
                  <ModalHeader>Subir imágenes</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody >
                  
                    <label htmlFor="fileInput">
                      <Flex
                        align="center"
                        border="1px solid #ccc"
                        borderRadius="md"
                        p="6px 12px"
                        cursor="pointer"
                        bg="gray.100"
                        _hover={{ bg: "gray.200" }}
                        gap="8px">
                        <span
                          style={{ background: "#952C00", color: "white", padding: "4px 8px",
                          borderRadius: "6px",width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}} >
                          {/* Elegir archivos  */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor" class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" /></svg>
                          <span className="text-white mt-2">
                          {archivo.length === 0
                            ? "Haz clic para seleccionar imágenes"
                            : `${archivo.length} archivo(s) seleccionados`}
                        </span>
                        </span>
                        
                      </Flex>
                    </label>

                    {archivo.length > 0 && (
                      <Flex wrap="wrap" gap={3} mt={4}>
                        {archivo.map((img, index) => (
                          <Box
                            key={index}
                            position="relative"
                            w="80px"
                            h="80px"
                          >
                            <img src={URL.createObjectURL(img)} alt="preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                            <Box
                              position="absolute"
                              top="2px"
                              right="2px"
                              cursor="pointer"
                              bg="white"
                              borderRadius="full"
                              p="2px"
                              onClick={() => removeImage(index)}
                            >
                              <AiOutlineClose className={`${fondo}`}/>
                            </Box>
                          </Box>
                        ))}
                      </Flex>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button onClick={onCloseImg}>Listo</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              <FormLabel htmlFor="Caracteristicas">Características</FormLabel>
              <Input
                id="Caracteristicas"
                type="text"
                value={servicios}
                onChange={(e) => setServicios(e.target.value)}
                placeholder="Ej: Agua, luz, vistas panorámicas"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bgColor={"cial"} color={"black"} mr={2} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              bgColor={"#952C00"}
              colorScheme="#952C00"
              color={"white"}
              onClick={handleGuardar}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnAgregar;

 
   /* <Box
  border="2px dashed #952C00"
  borderRadius="md"
  p={4}
  textAlign="center"
  cursor="pointer"
  onClick={() => document.getElementById("fileInput").click()}
  _hover={{ bg: "#FFF5F0" }}
>
  <Input
  type="file"
  id="fileInput"
  multiple
  display="none"
  onChange={(e) => setArchivo(Array.from(e.target.files))}
/>
  Arrastra imágenes aquí o haz clic para seleccionar
</Box> */
 

// const handleGuardar = async () => {
//   if (!validarCampos()) return;

//   const token = localStorage.getItem("token");
//   const usuarioID = localStorage.getItem("UsuarioID");
//   console.log("ID:", usuarioID);

//   if (!token) {
//     alert("No hay token disponible. Por favor, inicia sesión nuevamente.");
//     return;
//   }

//   // Intentar obtener ID de usuario desde localStorage o token
//   let usuarioId = localStorage.getItem("usuario");
//   // console.log("usuario ID:",usuarioId)

//   try {
//     const decoded = jwtDecode(token);
//     console.log("Token decodificado:", decoded);

//     // Si el backend guarda el id como "sub" o "id" en el token
//     if (!usuarioId) {
//       usuarioId = decoded.sub || decoded.id || decoded.userId;
//     }
//   } catch (err) {
//     console.warn("No se pudo decodificar el token:", err);
//   }

//   if (!usuarioId) {
//     alert("No se encontró el ID del usuario. Inicia sesión nuevamente.");
//     return;
//   }

//   const data = {
//     titulo,
//     descripcion,
//     precio: Number(precio),
//     metrosCuadrados: Number(metrosCuadrados),
//     direccion,
//     distrito,
//     tipo,
//     estado,
//     servicios,
//     usuario: { id: Number(usuarioID) }, // ✅ ahora siempre tendrás un id válido
//   };

//   try {
//     const nuevaPropiedad = await crearPropiedad(token);
//     // alert("Propiedad creada correctamente");
//     toast({
//       title: "Exitoso.",
//       description: "Propiedad creada correctamente",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });

//     // Limpiar campos
//     setTitulo("");
//     setDescripcion("");
//     setPrecio("");
//     setMetrosCuadrados("");
//     setDireccion("");
//     setDistrito("");
//     setTipo("");
//     setEstado("");
//     setServicios("");

//     onClose(); // Cerrar modal

//     if (onPropiedadCreada) onPropiedadCreada(nuevaPropiedad);
//   } catch (error) {
//     console.error("Error al crear propiedad:", error);
//     alert("No se pudo crear la propiedad: " + (error.message || error));
//   }
//   //multimedia
//   const propiedadId = nuevaPropiedad.id;
//   const nuevaPropiedad = await subirMultimedia(archivo, "imagen", propiedadId);

//   console.log(nuevaPropiedad.id);

// //Si hay archivo seleccionado, subirlo
// if (archivo) {
//   try {
//     await subirMultimedia(archivo, "Imagen principal", nuevaPropiedad.id);

//     toast({
//       title: "Imagen subida",
//       description: "La imagen se subió correctamente",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   } catch (error) {
//     console.error("Error subiendo multimedia:", error);
//     toast({
//       title: "Error subiendo imagen",
//       description: "La propiedad se creó, pero la imagen falló",
//       status: "error",
//       duration: 3000,
//       isClosable: true,
//     });
//   }
// }

// };
