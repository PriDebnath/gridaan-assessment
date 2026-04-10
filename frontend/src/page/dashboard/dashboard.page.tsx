import { memo } from "react";
import { useGetStudents } from "@/hook/dashboard/use-get-students";
import StudentsComponent from "@/feature/dashboard/component/students/students";

function Dashboard() {
  const {isPending,data: students}  = useGetStudents()
    return (
        <main>
            <StudentsComponent students={students? students: []}/>
        </main>
    )
}
export default memo(Dashboard)