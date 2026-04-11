import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"
import type { Student } from "../students/use-get-students";

export type Param = {}

export type Task = {
    _id?: string;
    title: string;
    completed: boolean;
    student?: Student ;
}

export interface TaskCreate extends Omit<Task, 'student'>{
    student?: string ;
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