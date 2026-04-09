import { z } from "zod";
import { memo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
 import { useForm, type FieldValues } from "react-hook-form";
import { useAuthSignIn, type SignInParam } from "@/hook/auth/use-sign-in.auth.hook";

const authSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}),
    password: z.string().min(1, {message: "Email is required"}),
})

function SignIn() {
  const { signIn, isPending} = useAuthSignIn();
  const form = useForm({resolver: zodResolver(authSchema)});

  const onSubmit = (data: FieldValues) => {
     signIn(data as SignInParam);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto mt-20"
    >
      <h2 className="text-xl font-bold">SignIn</h2>

      <input {...form.register("email")} placeholder="Email" />
      <input
        type="password"
        {...form.register("password")}
        placeholder="Password"
      />

      <button disabled={isPending}>
        {isPending ? "Loading..." : "SignIn"}
      </button>
    </form>
  );
}

export default memo(SignIn)