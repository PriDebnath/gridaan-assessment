import { toast } from "sonner"
import { apiClient } from "@/lib/apiClient"
import { useGetTasksKey, type TaskCreate } from "./use-get-tasks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

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
            toast.success("Updated successful", {
                position: "top-center"
            })
            queryClient.invalidateQueries({
                queryKey: [useGetTasksKey]
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
        updateTask: mutation.mutateAsync
    }
}