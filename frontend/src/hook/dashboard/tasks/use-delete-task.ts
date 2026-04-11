import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetTasksKey, type Task } from "./use-get-tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toastConfig } from "@/components/ui/sonner"

const deleteTask = (data: Task) =>
    apiClient<Task[]>("/api/tasks/" + data._id, {
        method: "DELETE",
    })

export const useDeleteTasks = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (data: Task) => {
            const promise = deleteTask(data);
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
            // toast.success("Deleted successful", toastConfig)
            queryClient.invalidateQueries({
                queryKey: [useGetTasksKey]
            });
        },
        onError: (error) => {
            // toast.error(error?.message ? error?.message : error?.stack, toastConfig)
        }
    })
    return {
        ...mutation,
        deleteTask: mutation.mutateAsync
    }
}