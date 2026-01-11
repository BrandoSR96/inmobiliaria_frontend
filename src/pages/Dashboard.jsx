import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Dashboard = () => {
  const toast = useToast();
  const API_URL = import.meta.env.VITE_API_URL;
  const API_Login = `${API_URL}/auth/login`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function Login(e) {
    e.preventDefault(); // Evita que la página se recargue
    try {
      const respuesta = await fetch(API_Login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!respuesta.ok) {
        throw new Error("Error en Login:" + respuesta.status);
      }
      // alert("error en la contraña o usuario")

      const datos = await respuesta.json();
      console.log("Token o respuesta del login:", datos);

      if (datos.token) {
        localStorage.setItem("token", datos.token);
        localStorage.setItem("UsuarioID", datos.usuario.id);
        console.log(datos.token);
      }

      // Puedes redirigir al usuario a otra página o cambiar el estado de sesión
      // alert("Login exitoso");
      toast({
        title: "Exitoso.",
        description: " Login exitoso",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/crud");
    } catch (error) {
      console.error("❌ Error al iniciar sesión:", error);
      // alert("Login fallido");
      toast({
        title: "Aviso",
        description: "varificar e-mail o password",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  return (
    <div class="flex justify-center items-center h-screen bg-gradient-to-r from-amber-700 via-amber-600  to-amber-800 ">
      <div class="flex justify-center items-center">
        <div class="w-100 h-[100%] flex gap-5 flex-col py-15 px-5 justify-center bg-neutral-50 shadow-md rounded-md">
          <img src="img/logo.jpg" alt="Logo" class="w-30 self-center" />
          <form
            onSubmit={Login}
            class="flex flex-col text-left px-10 py-4 gap-5 h-fit justify-between"
          >
            <div class="flex flex-col gap-3">
              <label class="text-[15px] font-semibold" htmlFor="email">
                Correo:
              </label>
              <input
                id="email"
                class="bg-white rounded-lg !border-3 !border-amber-800 h-8 !px-2 "
                placeholder="Ejemplo@gmail.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-[15px] font-semibold" htmlFor="password">
                Password:
              </label>
              <input
                id="password"
                class="!bg-white rounded-md !border-3 !border-amber-800 h-8 !px-2 "
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              class="shadow-md rounded-md h-9 !bg-red-800 !text-white font-semibold hover:!bg-red-700 transition-colors"
              type="submit"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
