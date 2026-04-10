import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { z } from "zod"
import { Loader2, PenIcon } from "lucide-react"
import React, { useEffect, } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Student } from "@/hook/dashboard/students/use-get-students"
import { useUpdateStudents } from "@/hook/dashboard/students/use-update-student"
import { useCreateStudents } from "@/hook/dashboard/students/use-create-student"

const formSchema = z.object({
    _id: z.string().optional(),
    name: z.string().min(2, { message: "Minimum 2 characters" }),
    student_class: z.string().min(1, { message: "Minimum 1 characters" }),
})

interface Props {
    data?: Student;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddEdit(props: Props) {
    const { data, open, setOpen } = props
    const { createStudent, isPending: isCreating } = useCreateStudents()
    const { updateStudent, isPending: isUpdating } = useUpdateStudents()

    const defaultValues: Student = {
        name: "",
        student_class: '10',
    }
    const reactHookForm = useForm({
        defaultValues: data ? data : defaultValues,
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (data?._id) {
            await updateStudent(values)
        } else {
            await createStudent(values)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle> {data ? "Update" : "Add"} Student Data</DialogTitle>
                    <DialogDescription>
                        Enter student details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={reactHookForm.handleSubmit(onSubmit)} className="space-y-4">

                    <Controller
                        name="name"
                        control={reactHookForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="capitalize">
                                    {field.name}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Pritam Debnath"
                                    autoComplete="on"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="student_class"
                        control={reactHookForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="capitalize">
                                    {/* {field.name} */}
                                    class
                                </FieldLabel>
                                <div className="relative">
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="password"
                                        autoComplete="on"
                                        className="pr-10"
                                    />
                                </div>
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="submit"
                            disabled={isCreating || isUpdating}>
                            {(isCreating || isUpdating) && (<Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />)}
                            Save changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default React.memo(AddEdit)