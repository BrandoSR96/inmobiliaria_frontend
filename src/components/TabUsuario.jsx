import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { listarContactos } from "../Services/ApiContacto";

const TabUsuario = () => {
  const [contacto, setContacto] = useState([]);
  const [showMoreIndex, setShowMoreIndex] = useState(null);


  useEffect(() => {
    listarContactos()
      .then((res) => setContacto(res.data)) // guarda los contactos en el estado
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="mx-auto px-6 py-8 bg-[#FEF7F2]">
      <div className="flex items-center justify-between mb-6 border-b border-red-200">

        <div className="text-[25px]">
          <h1 className="text-[25px] font-bold text-black text-left">
            Panel de Administración de Usuarios
          </h1>
          <p className="text-gray-400 text-[15px] text-left">
            Gestiona todos los usuarios
          </p>
        </div>
        <span className="text-gray-900 text-[14px] self-end">
          {contacto.length} Contactos
        </span>
      </div>

      <section>
        <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(250px, 1fr))" >
          {contacto.map((contac, index) => (
            <Card key={index} boxShadow="2px 2px 2px 2px rgba(0,0,0,0.5)" py="10px" px="15px" 
            className="max-sm:mx-[10px] ">
              <p class='flex justify-between'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="silver" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <path d="M18 6l-12 12" /><path d="M6 6l12 12" />
              </svg>
              <input type="radio" class='w-4'/>
              </p>
              <CardHeader p="5px" textAlign="center">
                <Heading as="h2" size="md" fontSize="18px" pb="5px">
                  {contac.nombre} {contac.apellidos}
                </Heading>
                <Text fontSize="10px" fontWeight="600" color="gray.400">
                  {contac.email}
                </Text>
              </CardHeader>
              <CardBody px="15px" textAlign="center">
                {contac.comentario.length > 100 ? (
                  <>
                    <Text fontSize="14px" px="10px" py="2">
                      {showMoreIndex === index
                        ? contac.comentario
                        : contac.comentario.slice(0, 100) + "..."}
                    </Text>
                    <Button size="sm" variant="link" colorScheme="blue" 
                    onClick={() =>
                        setShowMoreIndex(showMoreIndex === index ? null : index) } >
                      {showMoreIndex === index ? "Ver menos" : "Ver más"}
                    </Button>
                  </>
                ) : (
                  <Text fontSize="14px" px="10px" py="2">
                    {contac.comentario}
                  </Text>
                )}
              </CardBody>

              <CardFooter pt="2px" pb="2px" justifyContent="center">
                <div className="w-[100%]">
                  <a href={`https://wa.me/+51${contac.celular}? text=Hola%20quiero%20contactarme%20contigo`}
                    target="_blank" rel="noopener noreferrer" className="w-full" >
                    <Button w="fit" display="flex" justifyContent="center" px={"10px"} gap="2" bg="#EDF2F7" py="1" borderRadius="sm" >
                      <img className="w-5 m-1 transition-all duration-200" src="/img/whatsapp.png" alt="WhatsApp" />
                      <span className="font-semibold text-black w-fit ">
                        +51 {contac.celular}
                      </span>
                    </Button>
                    <span className="flex justify-center py-2 text-sm text-gray-500">
                      {new Date(contac.fechaRegistro).toLocaleString()}
                    </span>
                  </a>
                </div>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </section>
    </main>
  );
};

export default TabUsuario;


{/* <CardBody px="15px" textAlign="center">
  <Text fontSize="14px" px="10px" py="2">
    {contac.comentario}
  </Text>
</CardBody> */}

{/* <table class="w-full caption-bottom text-sm border-collapse md:border-separate md:rounded-lg overflow-hidden !border-1 !border-black">
          <thead>
            <tr class="text-foreground text-center font-medium whitespace-nowrap h-[40px] bg-[#dac6be] ">
              <th class="w-[30%] text-left text-[14px] px-5 border border-gray-300 ">
                Nombre
              </th>
              <th class="w-[13%] text-left text-[14px] px-5 border border-gray-300  ">
                Correo
              </th>
              <th class="w-[12%] text-left text-[14px] px-5 border border-gray-300  ">
                Numero
              </th>
              <th class="w-[50%] text-left text-[14px] px-5 border border-gray-300  ">
                Mensaje
              </th>
            </tr>
          </thead>

          <tbody class='!border-1 !border-black bg-white'>
            <td class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5" >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">+51 990495535</td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur.
            </td>
          </tbody>
          <tbody class='!border-1 !border-black bg-white'>
            <td
              class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5"
            >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">+51 990495535</td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur. 
            </td>
          </tbody>
          <tbody class='!border-1 !border-black bg-white'>
            <td
              class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5"
            >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              +51 990495535
            </td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur. 
            </td>
          </tbody>
        </table> */}