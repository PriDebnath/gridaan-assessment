import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetStudentsKey, type Student } from "./use-get-students"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toastConfig } from "@/components/ui/sonner"

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
            toast.success("Updated successful",toastConfig)
            queryClient.invalidateQueries({
                queryKey: [useGetStudentsKey]
            });
        },
        onError: (error) => {
            toast.error(error?.message ? error?.message : error?.stack,toastConfig)
        }
    })
    return {
        ...mutation,
        updateStudent: mutation.mutateAsync
    }
}