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
import type { Student } from "@/hook/dashboard/students/use-get-students";
import { useDeleteStudents } from "@/hook/dashboard/students/use-delete-student";

interface Props {
    list: Student[];
}

function Component(props: Props) {
    const { list } = props
    const [search, setSearch] = useState("");
    const [openForm, setOpenForm] = useState(false)
    const { deleteStudent, isPending } = useDeleteStudents()
    const [editData, setEditData] = useState<Student | undefined>(undefined);

    const filteredList = useMemo(() => {
        return list
            .filter((tx) => tx.name.toLowerCase().includes(search.toLowerCase()));
    }, [search, list])

    const handleAdd = () => {
        setEditData(undefined)
        setOpenForm(true)
    }

    const handleEdit = (data: Student) => {
        setEditData(data)
        setOpenForm(true)
    }

    const handleDelete = async (data: Student) => {
        await deleteStudent(data)
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
                        Add {"Student"}
                    </Button>
                </div>

            </div>

            <div className="border rounded overflow-hidden">
                {filteredList.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No data found.
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto whitespace-nowrap">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Class</th>
                                    <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredList.map((pri) => {
                                    return (
                                        <tr key={"tx" + pri._id} className="text-center border-t">
                                            <td className="p-2">{pri.name}</td>
                                            <td className="p-2">{pri.student_class}</td>
                                            <td className="p-2 flex justify-center items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleEdit(pri)}
                                                >
                                                    <PenIcon />
                                                </Button>
                                                <Button
                                                    variant={'outline'}
                                                    className="text-red-500"
                                                    onClick={() => handleDelete(pri)}
                                                ><Trash2Icon />
                                                </Button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            <AddEdit
                key={editData?._id ?? "new"} //
                data={editData}
                open={openForm}
                setOpen={setOpenForm}
            />
        </>
    )
}

export default React.memo(Component)