import { FormControl,Textarea, FormErrorMessage, FormHelperText, FormLabel, Input, useToast, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import { crearContacto, listarContactos } from "../Services/ApiContacto";
import { useIdioma } from "../components/IdiomaContext";
import { textos } from "../components/traductor/textos";

const Formulario = () => {

  const { idioma } = useIdioma();

  const { colorMode } = useColorMode();

  // const fondo = colorMode === "light"
  //   ? "bg-[#FEF7F2] text-black"
  //   : "bg-gray-900 text-white";

  const fondoSeccion = colorMode === "light"
    ? "bg-white"
    : "bg-gray-800";
 
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [comentario, setComentario] = useState("");
  const toast = useToast();

  const handleSendEmail = () => {
    const data = {
      nombre,
      apellidos,
      email,
      celular,
      comentario,
    };

    if (!nombre || !apellidos || !email || !celular || !comentario) {
      console.log("Completa el formulario");
      toast({
        title: "Error",
        description: "Completa el formulario",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return; // detenemos el envío
    } else {
      toast({
        title: "Enviado",
        description: "Formulario enviado",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      // Limpiar el formulario
      setNombre("");
      setApellidos("");
      setEmail("");
      setCelular("");
      setComentario("");
    }

    console.log("tipo", typeof data);
    console.log("ENVIANDO DATA:", data);
    crearContacto(data);
  };
  useEffect(() => {
    listarContactos();
  }, []);

  return (
    <div className={`w-full p-[25px] ${fondoSeccion}`} >
      <p class={`text-center pb-[25px] text-[25px] ${fondoSeccion}`}>
        {textos[idioma].formulario.formulario}
      </p>
      {/* text-black font-extrabold font-mono  */}
      <FormControl isRequired>
        <div className="flex flex-col gap-6 2xl:flex-row 2xl:gap-10 2xl:justify-center 2xl:items-start xl:flex-row xl:gap-10 xl:justify-center xl:items-start">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full ">
                {/* text-black */}
                <FormLabel className={`${fondoSeccion}`}>{textos[idioma].formulario.nombre}</FormLabel>
                <Input 
                  type=""
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder={textos[idioma].formulario.nombre}
                />
              </div>
              <div className="w-full ">
                <FormLabel htmlFor="apellido" className={`${fondoSeccion}`}>{textos[idioma].formulario.apellido}</FormLabel>
                <Input
                  value={apellidos}
                  onChange={(e) => setApellidos(e.target.value)}
                  id="apellido"
                  placeholder={textos[idioma].formulario.apellido}
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full">
                <FormLabel htmlFor="email" className={`${fondoSeccion}`}>{textos[idioma].formulario.Email}</FormLabel>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder={textos[idioma].formulario.Email}
                />
              </div>
              <div className="w-full ">
                <FormLabel htmlFor="celular" className={`${fondoSeccion}`}>{textos[idioma].formulario.celular}</FormLabel>
                <Input
                  value={celular}
                  type="number"
                  onChange={(e) => setCelular(e.target.value)}
                  id="celular"
                  placeholder="+51 - "
                />
              </div>
            </div>
          </div>
          <div className={` w-full flex flex-col gap-3 ${fondoSeccion}`}>
            <Textarea 
              value={comentario}
              h={'140px'}
              onChange={(e) => setComentario(e.target.value)}
              class="p-2 w-full outline-2 outline-black outline-offset-2 rounded-sm text-black"
              placeholder={textos[idioma].formulario.comentario}
            />
            <button
              onClick={handleSendEmail}
              class="w-full h-10 !text-white !bg-black rounded-sm "
            >
              {textos[idioma].formulario.enviar}
            </button>
          </div>
        </div>
      </FormControl>
    </div>
  );
};
export default Formulario;
