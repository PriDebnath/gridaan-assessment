import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetStudentsKey, type Student } from "./use-get-students"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const createStudent = (data: Student) =>
    apiClient<Student[]>("/api/students/"  , {
        method: "POST",
        body: JSON.stringify(data)
    })


export const useCreateStudents = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createStudent,
        onSuccess: (data) => {
            toast.success("Added successful", {
                position: "top-center"
            })
            queryClient.invalidateQueries({
                queryKey: [useGetStudentsKey]
            });
        },
        onError: (error) => {
            toast.error(error?.message ? error?.message : error?.stack, {
                position: "top-center"
            })
        }
    })
    return {
        ...mutation,
        createStudent: mutation.mutateAsync
    }
}