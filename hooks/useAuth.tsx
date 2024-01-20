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
      if (!email) throw new Error("Enter the email");
      if (!password) throw new Error("Enter the password");

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.status !== 200) throw new Error(response?.error);

      router.push("/");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  }, [email, password, router]);

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
      setVariant("login");
    } catch (error: any) {
      toast.error(getErrorMessage(error));
    }
  }, [email, name, password]);

  const getErrorMessage = (error: any) =>
    error.response?.data?.message || error.message || "Something went wrong";

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
