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
import { Loader2, } from "lucide-react"
import React, { useEffect, } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Task, TaskCreate } from "@/hook/dashboard/tasks/use-get-tasks"
import { useUpdateTasks } from "@/hook/dashboard/tasks/use-update-task"
import { useCreateTasks } from "@/hook/dashboard/tasks/use-create-task"
import type { Student } from "@/hook/dashboard/students/use-get-students"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
    _id: z.string().optional(),
    title: z.string().min(2, { message: "Minimum 2 characters" }),
    student: z.string().min(2, { message: "Minimum 2 characters" }),
    completed: z.boolean(),
})

interface Props {
    data?: TaskCreate;
    student: Student[];
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function AddEdit(props: Props) {
    const { data, open, setOpen, student } = props
    const { createTask, isPending: isCreating } = useCreateTasks()
    const { updateTask, isPending: isUpdating } = useUpdateTasks()

    const defaultValues: TaskCreate = {
        title: "",
        completed: false,
    }
    const reactHookForm = useForm({
        defaultValues: data ? data : defaultValues,
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: TaskCreate) {
        if (data?._id) {
            await updateTask(values)
        } else {
            await createTask(values)
        }
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle> {data ? "Update" : "Add"} Task Data</DialogTitle>
                    <DialogDescription>
                        Enter task details below.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={reactHookForm.handleSubmit(onSubmit)} className="space-y-4">

                    <Controller
                        name="title"
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
                        name="student"
                        control={reactHookForm.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name} className="capitalize">
                                    {field.name}
                                </FieldLabel>

                                <div className="relative">
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full ">
                                            <SelectValue placeholder={"Choose a " + field.name}>
                                                { student?.find((stu) => stu._id === field.value)?.name  }
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup >
                                                <SelectLabel>{field.name}</SelectLabel>
                                                {student?.map((stu) => (
                                                    <SelectItem key={stu._id} value={stu._id}>
                                                        {stu.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
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