// import {
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Button,
// } from "@chakra-ui/react";

// const Idioma = ({ idioma, setIdioma }) => {
//   return (
//     <Menu shadow="20px" shadowColor="black">
//       <MenuButton
//         as={Button}
//         h="30px"
//         p="5px"
//         className="!bg-[#FEF7F2] h-[32px] text-black rounded-sm cursor-pointer shadow-sm shadow-black"
//       >
//         <img
//           className="w-[32px] p-[2px]"
//           src="/public/img/global.png"
//           alt="Cambiar Idioma"
//         />
//       </MenuButton>

//       <MenuList p={1} borderRadius="md" minWidth="100px">
//         <MenuItem onClick={() => setIdioma("en")}>Inglés</MenuItem>
//         <MenuItem onClick={() => setIdioma("qu")}>Quechua</MenuItem>
//         <MenuItem onClick={() => setIdioma("es")}>Español</MenuItem>
//       </MenuList>
//     </Menu>
//   );
// };

// export default Idioma;

import React from "react";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
// import { useState} from "react";
import { useIdioma } from "./IdiomaContext";

const Idioma = () => {
  const { setIdioma } = useIdioma();

  return (
    <div>
      <Menu shadow={"20px"} shadowColor={"black"} className="w-[10px] p-[10px]">
        <MenuButton
          as={Button}
          h={"40px"}
          p={"5px"}
          className="!bg-[#FEF7F2] h-[32px] text-black rounded-sm cursor-pointer shadow-sm shadow-black"
        >
          <img
            className="w-[32px]  p-[2px]"
            src="/public/img/global.png"
            alt="Cambiar Idioma"
          />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setIdioma("en")}>Inglés</MenuItem>
          <MenuItem onClick={() => setIdioma("qu")}>Quechua</MenuItem>
          <MenuItem onClick={() => setIdioma("es")}>Español</MenuItem>
        </MenuList>
        {/* <MenuList p={1} borderRadius="md" minWidth="100px">
          <MenuItem borderRadius="md" onClick={() => setIdioma("en")}>
            Ingles
          </MenuItem>
          <MenuItem borderRadius="md" onClick={() => setIdioma("qu")}>
            Quechua
          </MenuItem>
          <MenuItem borderRadius="md" onClick={() => setIdioma("es")}>
            Español
          </MenuItem>
        </MenuList> */}
      </Menu>
    </div>
  );
};

export default Idioma;
