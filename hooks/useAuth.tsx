import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function useAuth() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((pre) => (pre === "login" ? "register" : "login"));
  }, []);

  //login new user on the platform
  const login = useCallback(async () => {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
    } catch (error: any) {
      toast.error(error.message || "something went wrong");
    }
  }, [email, password]);

  //regester new user on the platform
  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        email,
        name,
        password,
      });

      if (response.status !== 201) throw new Error("Error while creating user");

      toast.success("User created, Please login to continue");
      setEmail("");
      setName("");
      setPassword("");
      setVariant("login");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  }, [email, name, password]);

  return {
    login,
    register,
    toggleVariant,
    setEmail,
    setName,
    setPassword,
    variant,
    email,
    name,
    password,
  };
}

export default useAuth;
