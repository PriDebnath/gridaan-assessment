import React, { lazy, Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { useGetTasks } from "@/hook/dashboard/tasks/use-get-tasks";
import { useGetStudents } from "@/hook/dashboard/students/use-get-students";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";

const StudentComponent = lazy(() => import('@/feature/dashboard/component/students').then(mod => ({ default: mod.default })))
const TaskComponent = lazy(() => import('@/feature/dashboard/component/tasks').then(mod => ({ default: mod.default })))

export default function Dashboard() {
    const { setToken } = useAuthStore()
    const { isPending: loadingTask, data: tasks } = useGetTasks()
    const { isPending: loadingStudent, data: students } = useGetStudents()

    // Shared section styling with dark mode support
    const sectionClass = `
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    p-4 rounded-2xl flex flex-col gap-4
    shadow-sm dark:shadow-none
    border border-transparent dark:border-gray-800
  `;

    const sections = [
        {
            title: "Student",
            content: (
                <>
                    <StudentComponent loading={loadingStudent} list={students ? students : []} />
                </>
            ),
        },
        {
            title: "Task",
            content: (
                <>
                    <TaskComponent loading={loadingTask} list={tasks ? tasks : []} student={students ? students : []} />
                </>
            ),
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors">
            {/* Header */}
            <header className="flex justify-between items-center bg-gray-200 dark:bg-gray-900 p-3 sticky z-50 top-0 shadow-md dark:shadow-none border-b border-gray-300 dark:border-gray-800">
                <h1 className="text-lg font-semibold">
                    School Management Mini System
                </h1>
                <DropdownMenu>
                    <DropdownMenuTrigger render={<Button variant="outline"><Settings /></Button>}>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setToken('')}>Logout</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Content */}
            <main className="p-4 flex flex-col gap-8">
                {sections.map((section) => (
                    <section key={section.title} className={sectionClass}>
                        <h2 className="text-xl font-semibold tracking-tight">
                            {section.title}
                        </h2>
                        <Suspense fallback={<Loader />}>
                            {section.content}
                        </Suspense>
                    </section>
                ))}
            </main>
        </div>
    );
}
