import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetTasksKey, type Task } from "./use-get-tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
                loading: "Deleting...",
                success: "Deleted",
                error: (err: any) => err?.message || "Something went wrong",
                position: "top-center"
            });
            const res = await promise;
            return res
        },
        onSuccess: (data) => {
            // toast.success("Deleted successful", {
            //     position: "top-center"
            // })
            queryClient.invalidateQueries({
                queryKey: [useGetTasksKey]
            });
        },
        onError: (error) => {
            // toast.error(error?.message ? error?.message : error?.stack, {
            //     position: "top-center"
            // })
        }
    })
    return {
        ...mutation,
        deleteTask: mutation.mutateAsync
    }
}