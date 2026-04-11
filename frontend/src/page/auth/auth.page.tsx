import { z } from "zod";
import { memo } from "react";
import { motion } from "framer-motion";
import { Outlet } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues } from "react-hook-form";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthSignIn, type SignInParam } from "@/hook/auth/use-sign-in.auth.hook";

const authSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Email is required" }),
})

function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const authPath = { signin: "sign-in", signup: "sign-up" }
  const isSignIn = currentPath.includes(authPath.signin);

  const handleTabChange = (value: string) => {
    if (value === authPath.signin) {
      navigate({ to: "/auth/sign-in" });
    } else if (value === authPath.signup) {
      navigate({ to: "/auth/sign-up" });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md border rounded-2xl bg-muted! overflow-hidden">
        <Tabs
          value={isSignIn ? authPath.signin : authPath.signup}
          onValueChange={handleTabChange}
          className="w-full border-0"
        >
          <TabsList className="grid w-full grid-cols-2 border-0 p-0 ">
            <TabsTrigger value="sign-in" className={'rounded-none border-none'}>Sign In</TabsTrigger>
            <TabsTrigger value="sign-up" className={'rounded-none border-none'}>Sign Up</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative  bg-muted border-0">
          <motion.div
            key={currentPath}
            initial={{ x: isSignIn ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isSignIn ? 100 : -100, opacity: 0 }}
            transition={{ duration: 0.5, }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


export default memo(AuthLayout)