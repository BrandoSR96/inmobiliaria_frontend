import React, { useState } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Select,
  useToast,
  Flex,
  Box,
} from "@chakra-ui/react";
import { actualizarPropiedad } from "../Services/ApiServices";
import { subirMultimedia } from "../hooks/useMultimedia";
import { AiOutlineClose } from "react-icons/ai";
import { useColorMode } from "@chakra-ui/react";
import Carousel from "../components/Carousel"; // ajusta la ruta
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const BtnActualizar = ({ propiedad, onActualizado }) => {
  // const images=<Carousel images={propiedad.multimedia}/>
  console.log(
    "PROPIEDAD EN BTN ACTUALIZAR Cantidad:",
    propiedad.multimedia.length
  );
  console.log("PROPIEDAD EN BTN ACTUALIZAR:", propiedad.multimedia);
  console.log("PROPIEDAD EN BTN ACTUALIZAR ID:", propiedad.multimedia[0]?.id);
  const { colorMode } = useColorMode();

  const fondo =
    colorMode === "light" ? "bg-[#FEF7F2] text-black" : "bg-white text-black";
  //Subir archivo
  const [archivo, setArchivo] = useState([]); //-file

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenImg,
    onOpen: onOpenImg,
    onClose: onCloseImg,
  } = useDisclosure();
  const [formData, setFormData] = useState({ ...propiedad });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [imagenes, setImagenes] = useState(propiedad.multimedia || []);

  // 🔄 Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // 👉 1️⃣ Actualizar la propiedad CON las imágenes actuales
      const dataActualizada = {
        ...formData,
        multimedia: imagenes, // 🔥 CLAVE: imágenes después de eliminar
      };

      const response = await actualizarPropiedad(formData.id, dataActualizada);

      if (!response) {
        toast({
          title: "Error",
          description: "No se pudo actualizar la propiedad",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      // 👉 2️⃣ Subir imágenes nuevas (archivo)
      if (archivo.length > 0) {
        try {
          for (const img of archivo) {
            await subirMultimedia(img, "imagen", formData.id);
          }

          toast({
            title: "Imágenes subidas",
            description: "Todas las imágenes fueron subidas correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error("Error subiendo multimedia:", error);
          toast({
            title: "Error al subir imágenes",
            description:
              "La propiedad se actualizó, pero algunas imágenes fallaron",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }

      toast({
        title: "Propiedad actualizada",
        description: "Los datos fueron guardados correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setArchivo([]); // limpiar archivos seleccionados
      onClose();
      if (onActualizado) onActualizado();
    } catch (error) {
      console.error("Error al actualizar:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar la propiedad",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Elimina imágenes nuevas (del estado archivo)
  const removeImagenNueva = (index) => {
    setArchivo((prev) => prev.filter((_, i) => i !== index));
  };

  const removeImagenExistente = async (id) => {
    try {
      const token = localStorage.getItem("token"); // JWT válido
      await axios.delete(`${API_URL}/api/multimedia/eliminar`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { multimediaIds: [id] }, // 👈 enviar como lista
      });
      setImagenes((prev) => prev.filter((img) => img.id !== id));
      console.log("URL.....", URL.createObjectURL());
    } catch (error) {
      console.error(
        "Error eliminando la imagen:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Box as="div" color={"black"} bgColor={"none"}>
      {/* Botón Editar */}
      <button
        bg={"#FEF7F2"}
        p-5
        color={"black"}
        cursor={"pointer"}
        onClick={onOpen}
        // class="bg-[#FEF7F2] cursor-pointer shadow-sm shadow-black"
        // class="bg-[#952C00] w-[20px] text-2xl flex justify-center flex-row gap-5 items-center"
      >
        <svg
          data-slot="icon"
          fill="none"
          stroke-width="1.8"
          stroke="green"
          viewBox="0 0 25 25"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="w-5 h-5 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          ></path>
        </svg>
      </button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent m={"auto"} w={"448px"}>
          <ModalHeader py={"5px"}>Editar Propiedad</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb={1}>
              <FormLabel>Título</FormLabel>
              <Input
                name="titulo"
                value={formData.titulo || ""}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleChange}
              />
            </FormControl>

            <div class="flex flex-row gap-4">
              <FormControl mb={2}>
                <FormLabel>Precio (USD)</FormLabel>
                <NumberInput
                  value={formData.precio || 0}
                  onChange={(value) => handleNumberChange("precio", value)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl mb={2}>
                <FormLabel>Área (m²)</FormLabel>
                <NumberInput
                  value={formData.metrosCuadrados || 0}
                  onChange={(value) =>
                    handleNumberChange("metrosCuadrados", value)
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </div>

            <div class="flex flex-row gap-4">
              <FormControl mb={3}>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direccion"
                  value={formData.direccion || ""}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Distrito</FormLabel>
                <Input
                  name="distrito"
                  value={formData.distrito || ""}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div class="flex flex-row gap-4">
              <FormControl mb={3}>
                <FormLabel>Tipo</FormLabel>
                <Select
                  name="tipo"
                  value={formData.tipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="TERRENO_AGRICOLA">Agrícola</option>
                  <option value="TERRENO_URBANO">Urbano</option>
                  <option value="LOTIZACIÓN">Lotización</option>
                </Select>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Estado</FormLabel>
                <Select
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="DISPONIBLE">Disponible</option>
                  <option value="RESERVADO">Reservado</option>
                  <option value="VENDIDO">Vendido</option>
                </Select>
              </FormControl>
            </div>

            <div class="mb-3">
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
                      ? `${propiedad.multimedia.length} Imágenes subidas`
                      : `${archivo.length} archivo(s) seleccionados`}
                  </span>
                </Flex>
              </label>
              <Modal isOpen={isOpenImg} onClose={onCloseImg} size="lg">
                <ModalOverlay />
                <ModalContent m={"auto"}>
                  <ModalHeader>Subir imágenes</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <label htmlFor="fileInput">
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
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* Elegir archivos  */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            class="icon icon-tabler icons-tabler-filled icon-tabler-circle-arrow-up"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-4.98 3.66l-.163 .01l-.086 .016l-.142 .045l-.113 .054l-.07 .043l-.095 .071l-.058 .054l-4 4l-.083 .094a1 1 0 0 0 1.497 1.32l2.293 -2.293v5.586l.007 .117a1 1 0 0 0 1.993 -.117v-5.585l2.293 2.292l.094 .083a1 1 0 0 0 1.32 -1.497l-4 -4l-.082 -.073l-.089 -.064l-.113 -.062l-.081 -.034l-.113 -.034l-.112 -.02l-.098 -.006z" />
                          </svg>
                          <span className="text-white mt-2">
                            {archivo.length === 0
                              ? `hay ${propiedad.multimedia.length}  imágenes`
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
                            <img
                              //src={URL.createObjectURL(img)}
                              //src="https://res.cloudinary.com/dk8mvsb8f/image/upload/v1768166295/qc5gjwcis3xosqcsrbys.jpg"

                              src={
                                img instanceof File
                                  ? URL.createObjectURL(img)
                                  : img.startsWith(
                                      "https://res.cloudinary.com/dk8mvsb8f/image/upload/v1768166295/qc5gjwcis3xosqcsrbys.jpg"
                                    )
                                  ? img
                                  : ""
                              }
                              alt="preview"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "6px",
                              }}
                            />
                            <Box
                              className={`${fondo}`}
                              position="absolute"
                              top="2px"
                              right="2px"
                              cursor="pointer"
                              bg="white"
                              borderRadius="full"
                              p="2px"
                              onClick={() => removeImagenNueva(index)}
                            >
                              <AiOutlineClose />
                            </Box>
                          </Box>
                        ))}
                      </Flex>
                    )}
                    {imagenes.length > 0 && (
                      <Box mt={4}>
                        <Flex wrap="wrap" gap={3}>
                          {imagenes.map((img) => (
                            <Box position="relative" key={img.id}>
                              <img
                                alt="preview"
                                src={`${API_URL}${img.url}`}
                                className="w-[85px]"
                              />
                              <Box
                                position="absolute"
                                top="0px"
                                right="2px"
                                cursor="pointer"
                                bg="white"
                                borderRadius="full"
                                p="2px"
                                onClick={() => removeImagenExistente(img.id)}
                              >
                                {" "}
                                <AiOutlineClose className={fondo} />{" "}
                              </Box>{" "}
                            </Box>
                          ))}{" "}
                        </Flex>{" "}
                      </Box>
                    )}
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="green"
                      onClick={onCloseImg}
                      isLoading={loading}
                    >
                      {" "}
                      Listo{" "}
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
            <FormControl mb={3}>
              <FormLabel>Características</FormLabel>
              <Input
                name="servicios"
                value={formData.servicios || ""}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter pt={"0px"} pb={"10px"}>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="orange"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default BtnActualizar;

{
  /* <img src={propiedad.multimedia[0].url} /> */
}
