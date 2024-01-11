import Input from "@/components/input";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover bg-fixed">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Sign in</h2>
            <div className="flex flex-col gap-4">
              <Input
                label="UserName"
                onChange={(e: any) => {
                  setUsername(e.targe.value);
                }}
                id="username"
                value={username}
              />
              <Input
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.targe.value);
                }}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.targe.value);
                }}
                id="password"
                type="password"
                value={password}
              />
            </div>
            <button className="bg-red-600 py-3 text-white w-full rounded-md mt-10 hover:bg-red-700 transition">
              Login
            </button>
            <p className="text-neutral-500 mt-12">First time using Netfilx? <span className="text-white ml-1 hover:underline cursor-pointer">Create an account</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
