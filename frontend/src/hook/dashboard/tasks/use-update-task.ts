import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetTasksKey, type TaskCreate } from "./use-get-tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toastConfig } from "@/components/ui/sonner"

const updateTask = (data: TaskCreate) =>
    apiClient<TaskCreate[]>("/api/tasks/" + data._id, {
        method: "PATCH",
        body:JSON.stringify(data)
    })

export const useUpdateTasks = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            toast.success("Updated successful", toastConfig)
            queryClient.invalidateQueries({
                queryKey: [useGetTasksKey]
            });
        },
        onError: (error) => {
            toast.error(error?.message ? error?.message : error?.stack,toastConfig)
        }
    })
    return {
        ...mutation,
        updateTask: mutation.mutateAsync
    }
}