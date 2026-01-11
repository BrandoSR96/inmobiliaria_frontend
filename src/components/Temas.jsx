import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  useColorMode,
} from "@chakra-ui/react";
// import { useState } from 'react';
const Temas = () => {
  const { colorMode, setColorMode } = useColorMode();
  const { colorLogo, setColorLogo } = useColorMode();
  console.log("colorMode", colorMode);
  console.log("color", colorLogo, setColorLogo);
  // const [tema, setTema] = useState("claro");
  // console.log("tema",tema);
  //'#FEF7F2'

  return (
    <>
      <Menu shadow={"20px"} shadowColor={"black"}>
        <MenuButton
          as={Button}
          h={"40px"}
          p={"5px"}
          className="!bg-[#FEF7F2] text-black rounded-sm cursor-pointer shadow-sm  shadow-black"
        >
          <img
            className="w-[25px] h-[25px]"
            src="/public/img/color.png"
            alt="Cambiar tema"
          />
        </MenuButton>
        <MenuList p={1} borderRadius="md" minWidth="100px">
          {/* <MenuItem onClick={() => setTema("claro")}>Claro</MenuItem>
            <MenuItem onClick={() => setTema("oscuro")}>Oscuro</MenuItem> */}

          <MenuItem
            borderRadius="md"
            backgroundColor={colorMode === "light" ? "bold" : "normal"}
            fontWeight={colorMode === "light" ? "bold" : "normal"}
            onClick={() => setColorMode("light")}
          >
            Claro
          </MenuItem>
          <MenuItem
            borderRadius="md"
            backgroundColor={colorMode === "dark" ? "bold" : "normal"}
            fontWeight={colorMode === "dark" ? "bold" : "normal"}
            onClick={() => setColorMode("dark")}
          >
            Oscuro
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Temas;
