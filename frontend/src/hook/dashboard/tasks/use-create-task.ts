import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetTasksKey, type TaskCreate } from "./use-get-tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toastConfig } from "@/components/ui/sonner"

const createTask = (data: TaskCreate) =>
    apiClient<TaskCreate[]>("/api/tasks/", {
        method: "POST",
        body: JSON.stringify(data)
    })


export const useCreateTasks = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: async (data: TaskCreate) => {
            const promise = createTask(data);
            toast.promise(promise, {
                ...toastConfig,
                loading: "Creating...",
                success: "Created",
                error: (err: any) => err?.message || "Something went wrong",
            });
            const res = await promise;
            return res
        },
        onSuccess: (data) => {
            // toast.success("Added successful",toastConfig)
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
        createTask: mutation.mutateAsync
    }
}