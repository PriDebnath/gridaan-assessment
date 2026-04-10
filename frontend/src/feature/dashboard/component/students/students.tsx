import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import React, { useMemo, useState } from "react"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { useRoleStore } from "@/store/role.store"
// import { mockTransactions } from "../../mock-data";
import { PenIcon, Trash2Icon } from "lucide-react";
// import SelectTransaction from "./select-transaction";
// import ExportTransaction from "./export-transaction";
// import AddEditTransaction from "./add-edit-transaction";
import type { Student } from "@/hook/dashboard/use-get-students";

interface Props {
    students: Student[];
}

function StudentsComponent(props: Props) {
    const { students:filteredTx } = props
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [openForm, setOpenForm] = useState(false)

    // const filteredTx = useMemo(() => {
    //     return transactions
    //         .filter((tx) => filter === "all" || tx.type === filter)
    //         .filter((tx) => tx.category.toLowerCase().includes(search.toLowerCase()));
    // }, [search, filter, transactions])

    // const handleAdd = () => {
    //     setEditTransaction(undefined)
    //     setOpenForm(true)
    // }

    // const handleEdit = (transaction: Transaction) => {
    //     setEditTransaction(transaction!)
    //     setOpenForm(true)
    // }

    // const handleDelete = (transaction: Transaction) => {
    //     deleteTransaction(transaction)
    // }

    return (
        <>
            <div className="flex  flex-wrap gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    {/* <SelectTransaction
                        id="select-filter"
                        typeList={typeList}
                        filter={filter}
                        onFilterChange={(value) => {
                            setFilter(value)
                        }}
                    /> */}

                    <Input
                        placeholder="Search category..."
                        className="border p-2 min-w-40"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 flex-wrap" >
                    {/* <ExportTransaction /> */}
                  
                        {/* <Button
                            onClick={() => handleAdd()}
                        >
                            Add Transaction
                        </Button> */}
                </div>

            </div>

            <div className="border rounded overflow-hidden">
                {filteredTx.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No transactions found.
                    </div>
                ) : (
                    <div className="w-full overflow-x-auto whitespace-nowrap">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Category</th>
                                    <th className="p-2">Type</th>
                                    <th className="p-2">Amount</th>
                                 <th className="p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTx.map((tx) => {
                                    console.log(tx);
                                    return (
                                        <tr key={"tx" + tx._id} className="text-center border-t">
                                            <td className="p-2">{tx.name}</td>
                                            <td className="p-2">{tx.student_class}</td>
                                                <td className="p-2 flex justify-center items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            // setEditTransaction(tx)
                                                            // setOpenForm(true)
                                                        }}
                                                    >
                                                        <PenIcon />
                                                    </Button>
                                                    {/* <Button
                                                        variant={'outline'}
                                                        className="text-red-500"
                                                        onClick={() => handleDelete(tx)}
                                                    ><Trash2Icon />
                                                    </Button> */}
                                                </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>


            {/* <AddEditTransaction
                key={editTransaction?.id ?? "new-tx"} //
                transaction={editTransaction}
                open={openForm}
                setOpen={setOpenForm}
            /> */}
        </>
    )
}

export default React.memo(StudentsComponent)