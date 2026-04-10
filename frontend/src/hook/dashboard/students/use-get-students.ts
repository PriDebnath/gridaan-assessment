import { apiClient } from "@/lib/apiClient"
import { useQuery } from "@tanstack/react-query"

export type Param = {}

export type Student = {
    _id?: string;
    name: string;
    student_class: string;
}

const getStudents = (data: Param) =>
    apiClient<Student[]>("/api/students/", {
        method: "GET",
    })

export const useGetStudentsKey = "get-student"

export const useGetStudents = () => {
    const data = useQuery({
        queryFn: getStudents,
        queryKey: [useGetStudentsKey]
    })
    return data 
}