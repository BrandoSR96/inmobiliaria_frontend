import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { useToast } from '@chakra-ui/react'
import { useToast, Box, Flex, Text } from "@chakra-ui/react";
import Temas from "./Temas";
import { useColorMode } from "@chakra-ui/react";

const BtnSalir = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { colorMode } = useColorMode();

  const fondo =
    colorMode === "light" ? "bg-white text-black" : "bg-gray-900 text-white";

  const logo =
    colorMode === "light"
      ? "public/img/logo.png"
      : "/public/img/logo_fondo_blanco.png";

  const handleLogout = () => {
    // 🗑️ Eliminar token del localStorage

    // alert("Sesión cerrada correctamente");
    toast({
      position: "top",
      duration: null, // ❌ sin límite de tiempo (hasta que el usuario decida)
      isClosable: false,
      render: ({ onClose }) => (
        <Box
          color="white"
          p={6}
          bg="gray.800"
          borderRadius="md"
          boxShadow="lg"
          textAlign="center"
        >
          <Text fontSize="lg" mb={4}>
            ¿Seguro que quieres salir?
          </Text>
          <Flex justify="center" gap={4}>
            <Button
              colorScheme="red"
              onClick={() => {
                onClose();
                localStorage.removeItem("token");
                localStorage.removeItem("UsuarioID");
                localStorage.removeItem("ID");
                navigate("/");
                console.log("✅ Usuario confirmó salir");
                // aquí puedes poner navigate("/login") o tu lógica de logout
              }}
            >
              Sí, salir
            </Button>
            <Button colorScheme="green" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </Flex>
        </Box>
      ),
    });
    // 🔁 Redirigir al login
  };

  const handleInicio = () => {
    navigate("/");
  };

  return (
    <>
      <div
        class={`flex justify-center w-full h-[76px] px-[30px] rounded-md shadow-md 2xl:px-15 ${fondo}`}
      >
        <div
          class={`flex justify-between h-[76px] items-center w-[1468px] gap-10 p-[0px] ${fondo}`}
        >
          <div class="flex gap-2 h-15  text-left w-6x1 justify-between content-center items-center">
            <img class="w-15" src={`${logo}`} alt="logo" />
            {/* <div>
            <h1 class='text-[20px]'>Terrenos Cusco</h1>
            <p class='text-[12px]'>Terrenos en el Corazón de los Andes</p>
          </div> */}
          </div>
          <div class="flex gap-3 h-15 text-center mx-0 items-center">
            <button
              onClick={handleInicio}
              class="!bg-[#FEF7F2] !text-[#0e0d0d] !p-1 rounded-sm cursor-pointer shadow-sm shadow-black"
            >
              Inicio
            </button>
            <Temas />
            <button
              onClick={handleLogout}
              class="!bg-[#FEF7F2] w-[40px]  text-black p-2 py-1 rounded-sm cursor-pointer shadow-sm shadow-black "
            >
              <img
                class="w-full p-[5px] "
                src="/public/img/ArrowRightStartOnRectangle.svg"
                alt="salir"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BtnSalir;
