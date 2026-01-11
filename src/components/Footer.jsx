import { FiFacebook } from "react-icons/fi";
import { FaSquareFacebook } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { SiTiktok } from "react-icons/si";
import { RiYoutubeLine } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { PiTiktokLogo } from "react-icons/pi";
import { Box } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";
import { useIdioma } from "../components/IdiomaContext";
import { textos } from "../components/traductor/textos";

const Footer = () => {
  const { idioma } = useIdioma();

  const { colorMode } = useColorMode();

  const fondoFooter = colorMode === "light" ? "bg-orange-300" : "bg-gray-800";

  return (
    <footer class="w-full">
      <div
        class={`mt-10 flex flex-col pl-10 justify-between py-6  gap-5 2xl:flex 2xl:flex-row xl:flex-row lg:flex-row md:flex-row md:p-5 sm:flex-col sm:px-[16px] sm:py-[48px] text-[14px] ${fondoFooter}`}
      >
        {/* bg-orange-300 */}
        <div>
          <h3 class={`!text-[16px] !font-[650] pb-[10px] ${fondoFooter}`}>
            {textos[idioma].footer.inmobiliario}
          </h3>
          <p>{textos[idioma].footer.cusco}</p>
          {/* Botón de agendar reunión */}
          <div class="mt-3">
            <a
              href="https://calendly.com/cusicunasandra/30min"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-2 !text-white !bg-black rounded-md shadow-md hover:bg-gray-800 transition duration-300 ease-in-out text-center font-semibold"
            >
              Agendar Reunión
            </a>
          </div>
        </div>
        <div>
          <h3 class={`!text-[16px] !font-[650] pb-[10px] ${fondoFooter}`}>
            {textos[idioma].footer.formulario}
          </h3>
          <p>
            {textos[idioma].footer.telefono}: <p>+51 919 527 727</p>{" "}
            <p>+51 984 010 709</p>
          </p>
          <p>
            {textos[idioma].footer.ubicacion}:{" "}
            <p>{textos[idioma].footer.ciudad}</p>
          </p>
        </div>
        <div class="flex flex-col gap-3">
          <h3 class={`!text-[16px] !font-[650] pb-[10px] ${fondoFooter}`}>
            {textos[idioma].footer.redes}
          </h3>
          <div class="flex  gap-2  justify-start">
            <a
              class="p-2 cursor-pointer"
              href="https://www.instagram.com/sandra_quintanilla.1?igsh=YjZoZWg1dHhlNDZq"
              target="_blank"
            >
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram hover:stroke-blue-900"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M16.5 7.5v.01" />
              </svg>
            </a>
            {/* <a class='p-2 cursor-pointer' href="" target="_blank"><BsTwitterX/></a> */}
            <a
              class="p-2 cursor-pointer"
              href="https://www.tiktok.com/@sandraquintanilla.1?is_from_webapp=1&sender_device=pc"
              target="_blank"
            >
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok hover:stroke-blue-900"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
              </svg>
            </a>
            <a
              class="p-2 cursor-pointer"
              href="https://youtube.com/@sandritaquintanilla?si=atLhriYbr8Mjuzk-"
              target="_blank"
            >
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
                class="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube hover:stroke-blue-900"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                <path d="M10 9l5 3l-5 3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div class="h-[2px] w-full">
        {/* bg-black bg-orange-300 */}
        <p
          class={`text-center py-1.0 text-black font-mono text-[12px] ${fondoFooter}`}
        >
          &copy; 2025 {textos[idioma].footer.derechos}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
