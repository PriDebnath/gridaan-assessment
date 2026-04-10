
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { memo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader, Loader2 } from "lucide-react"
import { useAuthSignIn } from "@/hook/auth/use-sign-in.auth.hook"

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Minimum 4 characters"),
})

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const { signIn, isPending } = useAuthSignIn()
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values, form })
    signIn(values)
  }

  return (
    <div
      className={
        cn(
          "p-6 shadow-sm bg-background overflow-hidden rounded-b-2xl border",
          (
            (form?.formState?.isDirty || form?.formState?.isSubmitted)
            && !form.formState.isValid
          ) ? "border-red-500  " : "border-gray-200"
        )}>
      <h2 className="text-xl font-semibold mb-4">Sign In</h2>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="capitalize">
                {field.name}
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="debnathpritam0802@gmail.com"
                autoComplete="on"
              />
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />


        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name} className="capitalize">
                {field.name}
              </FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="password"
                  autoComplete="on"
                  type={showPassword ? "text" : "password"}
                  className="pr-10"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />


        <Button className="w-full" type="submit"
          disabled={isPending}
        >
          {isPending && (<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />)}
          Sign In
        </Button>

      </form>
    </div>
  )
}

export default memo(SignIn)