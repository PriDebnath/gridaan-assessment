import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetStudentsKey, type Student } from "./use-get-students"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const deleteStudent = (data: Student) =>
    apiClient<Student[]>("/api/students/" + data._id, {
        method: "DELETE",
    })

export const useDeleteStudents = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: deleteStudent,
        onSuccess: (data) => {
            toast.success("Deleted successful", {
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
        deleteStudent: mutation.mutateAsync
    }
}