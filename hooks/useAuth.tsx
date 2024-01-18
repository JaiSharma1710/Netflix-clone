import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

function useAuth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((pre) => (pre === "login" ? "register" : "login"));
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return {
    login,
    register,
    toggleVariant,
    setEmail,
    setName,
    setPassword,
    variant,
    email,name,password
  };
}

export default useAuth;
