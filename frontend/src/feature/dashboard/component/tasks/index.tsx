import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import AddEdit from "./add-edit";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react"
import { Button } from "@/components/ui/button";
import { PenIcon, Trash2Icon } from "lucide-react";
import type { Task, TaskCreate } from "@/hook/dashboard/tasks/use-get-tasks";
import { useDeleteTasks } from "@/hook/dashboard/tasks/use-delete-task";
import type { Student } from "@/hook/dashboard/students/use-get-students";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdateTasks } from "@/hook/dashboard/tasks/use-update-task";

interface Props {
    loading: boolean;
    list: Task[];
    student: Student[];
}

function Component(props: Props) {
    const { list, loading, student } = props
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false)
    const { updateTask, isPending: isUpdaing } = useUpdateTasks()
    const { deleteTask, isPending } = useDeleteTasks()
    const [editData, setEditData] = useState<TaskCreate | undefined>(undefined);

    const filteredList = useMemo(() => {
        return list
            .filter((tx) => tx.title?.toLowerCase().includes(search.toLowerCase()));
    }, [search, list])

    const handleAdd = () => {
        setEditData(undefined)
        setOpenForm(true)
    }

    const handleEdit = (data: TaskCreate) => {
        setEditData(data)
        setOpenForm(true)
    }

    const handleUpdate = (data: Task) => {
        updateTask({
            _id: data._id,
            completed: data.completed
        })

    }

    const handleDelete = async (data: Task) => {
        await deleteTask(data)
    }

    return (
        <>
            <div className="flex  flex-wrap gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <Input
                        placeholder="Search..."
                        className="border p-2 min-w-40"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap" >

                    <Button
                        onClick={() => handleAdd()}
                    >
                        Add {"Task"}
                    </Button>
                </div>

            </div>

            <div className="border rounded overflow-hidden">

                <div className="w-full overflow-x-auto whitespace-nowrap">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="p-2">Title</th>
                                <th className="p-2">Student Name</th>
                                <th className="p-2">Task Status</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(loading) && (
                                <tr key={"tx"} className="text-center border-t">
                                    <td className="p-2 ">
                                        <div className="mx-4 bg-muted-foreground h-2 rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-2  ">
                                        <div className="mx-4 bg-muted-foreground h-2 rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-2  ">
                                        <div className="mx-4 bg-muted-foreground h-2 rounded animate-pulse"></div>
                                    </td>
                                    <td className="p-2">
                                        <div className="mx-4 bg-muted-foreground h-2 rounded animate-pulse"></div>
                                    </td>
                                </tr>
                            )}
                            {(!loading && filteredList.length === 0) ? (
                                <tr key={"tx"} className=" border-t">
                                    <td className="p-4 text-center align-middle" colSpan={4}>
                                        No data found.
                                    </td>
                                </tr>
                            ) : (
                                filteredList.map((pri) => {
                                    return (
                                        <tr key={"tx" + pri._id} className="text-center border-t">
                                            <td className="p-2">{pri.title}</td>
                                            <td className="p-2">{pri.student?.name}</td>
                                            <td className="p-2">
                                                <div className="flex justify-center items-center">
                                                    <Checkbox checked={pri.completed}
                                                        onCheckedChange={() => {
                                                            handleUpdate(
                                                                {
                                                                    ...pri,
                                                                    completed: !pri.completed
                                                                },
                                                            )
                                                        }} />
                                                </div>
                                            </td>
                                            <td className="p-2">
                                                <div className="flex justify-center items-center gap-2">

                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleEdit(
                                                            {
                                                                ...pri,
                                                                student: pri.student?._id
                                                            })}
                                                    >
                                                        <PenIcon />
                                                    </Button>
                                                    <Button
                                                        variant={'outline'}
                                                        className="text-red-500"
                                                        onClick={() => handleDelete(pri)}
                                                    ><Trash2Icon />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            )}

                        </tbody>
                    </table>
                </div>


            </div>


            <AddEdit
                key={editData?._id ?? "new"} //
                data={editData}
                student={student}
                open={openForm}
                setOpen={setOpenForm}
            />
        </>
    )
}

export default React.memo(Component)