import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetStudentsKey, type Student } from "./use-get-students"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const updateStudent = (data: Student) =>
    apiClient<Student[]>("/api/students/" + data._id, {
        method: "PATCH",
        body:JSON.stringify(data)
    })

export const useUpdateStudents = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateStudent,
        onSuccess: (data) => {
            toast.success("Updated successful", {
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
        updateStudent: mutation.mutateAsync
    }
}