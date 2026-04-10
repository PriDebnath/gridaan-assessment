import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export type Param = {}

export type Task = {
    _id?: string;
    title: string;
    completed: string;
}

const getTasks = (data: Param) =>
    apiClient<Task[]>("/api/tasks/", {
        method: "GET",
    })

export const useGetTasksKey = "get-task"

export const useGetTasks = () => {
    const data = useQuery({
        queryFn: getTasks,
        queryKey: [useGetTasksKey]
    })
    return data 
}