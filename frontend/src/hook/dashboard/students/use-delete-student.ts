import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetStudentsKey, type Student } from "./use-get-students"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toastConfig } from "@/components/ui/sonner"

const deleteStudent = (data: Student) =>
    apiClient<Student[]>("/api/students/" + data._id, {
        method: "DELETE",
    })

export const useDeleteStudents = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (data: Student) => {
            const promise = deleteStudent(data);
            toast.promise(promise, {
                ...toastConfig,
                loading: "Deleting...",
                success: "Deleted",
                error: (err: any) => err?.message || "Something went wrong",
            });
            const res = await promise;
            return res
        },
        onSuccess: (data) => {
            // toast.success("Deleted successful", {
            // position: toastConfig.position
            // })
            queryClient.invalidateQueries({
                queryKey: [useGetStudentsKey]
            });
        },
        onError: (error) => {
            // toast.error(error?.message ? error?.message : error?.stack, {
            // position: toastConfig.position
            // })
        }
    })
    return {
        ...mutation,
        deleteStudent: mutation.mutateAsync
    }
}