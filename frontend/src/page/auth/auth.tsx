import { z } from "zod";
import { memo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm, type FieldValues } from "react-hook-form";
import { useAuthSignIn, type SignInParam } from "@/hook/auth/use-sign-in.auth.hook";


import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
 

const authSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}),
    password: z.string().min(1, {message: "Email is required"}),
})


function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const isSignIn = currentPath.includes("sign-in");
console.log({currentPath});

  const handleTabChange = (value: string) => {
    if (value === "sign-in") {
       navigate({ to: "/auth/sign-in" });
    } else {
       navigate({ to: "/auth/sign-up" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <Tabs
          value={isSignIn ? "sign-in" : "sign-up"}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign In</TabsTrigger>
            <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative overflow-hidden mt-6">
          <motion.div
            key={currentPath}
            initial={{ x: isSignIn ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isSignIn ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
} 


export default memo(AuthLayout)