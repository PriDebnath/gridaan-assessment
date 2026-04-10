// import {
//     Dialog,
//     DialogClose,
//     DialogContent,
//     DialogDescription,
//     DialogFooter,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import DatePicker from "./date-picker"
// import { PenIcon } from "lucide-react"
// import React, { useEffect,  } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useForm } from "@tanstack/react-form"
// import { Button } from "@/components/ui/button"
// import { mockTransactions } from "../../mock-data"
// import SelectTransaction from "./select-transaction"
// import { useTransactionStore, type Transaction } from "@/store/transaction.store"

// const typeAllList = mockTransactions?.map((t) => t.type)
// const typeList = [...new Set(typeAllList),]

// interface Props {
//     transaction?: Transaction;
//     open: boolean;
//     setOpen: React.Dispatch<React.SetStateAction<boolean>>
// }

// function AddEditTransaction(props: Props) {
//     const { transaction, open, setOpen } = props
//     const { createTransaction, updateTransaction } = useTransactionStore()
//     console.log({transaction});
    
//     const defaultValues: Transaction = {
//         category: "",
//         amount: 100,
//         date: new Date(),
//         id: new Date().getTime(),
//         type: "income"
//     }
//     const tanstackForm = useForm({
//         defaultValues: transaction ? transaction : defaultValues,
//         validators: {
//             onChange: ({ value }) => {
//                 return {
//                     fields: {
//                         type: (value.type != 'expense') && (value.type != 'income')
//                             ? 'Type should be expense or expense' : undefined,
//                         category:
//                             !value.category ? "Category is required" : undefined,
//                     },

//                 }
//             },

//         },
//         onSubmit: async (submitData) => {
//             const { value } = submitData
//             console.log(value)
//             if (transaction) {
//                 updateTransaction(value)
//             } else {
//                 createTransaction(value)
//             }
//             setOpen(false)
//             tanstackForm.reset({
//                 ...defaultValues,
//                 id: new Date().getTime(),
//             })
//         },
//     })

//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//             <DialogContent className="">
//                 <DialogHeader>
//                     <DialogTitle> {transaction ? "Update" : "Add"} Transaction</DialogTitle>
//                     <DialogDescription>
//                         Enter transaction details below.
//                     </DialogDescription>
//                 </DialogHeader>
//                 <form
//                     className="grid gap-4"
//                     onSubmit={(e) => {
//                         e.preventDefault()
//                         e.stopPropagation()
//                         tanstackForm.handleSubmit()
//                     }} >

//                     <tanstackForm.Field
//                         name="type"
//                         children={(field) => {
//                             return (
//                                 <div className="flex  flex-col  gap-2">
//                                     <Label htmlFor={field.name} className="capitalize">
//                                         {field.name}
//                                     </Label>
//                                     <SelectTransaction
//                                         typeList={typeList}
//                                         id={field.name}
//                                         filter={field.state.value}
//                                         onFilterChange={(value) => {
//                                             field.handleChange(value as Transaction['type'])
//                                         }}
//                                     />

//                                     {field.state.meta.errors.length > 0 && (
//                                         <div className="text-red-500 text-sm">
//                                             {field.state.meta.errors[0]}
//                                         </div>
//                                     )}
//                                 </div>
//                             )
//                         }}
//                     />
//                     <tanstackForm.Field
//                         name="category"
//                         children={(field) => {
//                             return (
//                                 <div className="flex flex-col gap-2">
//                                     <Label htmlFor={field.name} className="capitalize">
//                                         {field.name}
//                                     </Label>
//                                     <Input
//                                         id={field.name}
//                                         name={field.name}
//                                         value={field.state.value}
//                                         onBlur={field.handleBlur}
//                                         onChange={(e) => field.handleChange(e.target.value)}
//                                     />
//                                     {field.state.meta.errors.length > 0 && (
//                                         <div className="text-red-500 text-sm">
//                                             {field.state.meta.errors[0]}
//                                         </div>
//                                     )}                                </div>
//                             )
//                         }}
//                     />

//                     <tanstackForm.Field
//                         name="date"
//                         children={(field) => {
//                             return (
//                                 <div className="flex flex-col gap-2">
//                                     <Label htmlFor={field.name} className="capitalize">
//                                         {field.name}
//                                     </Label>
//                                     <DatePicker
//                                         id={field.name}
//                                         date={field.state.value}
//                                         onDateChange={(value) => {
//                                             field.handleChange(value as Transaction['date'])
//                                         }}
//                                     />
//                                     {field.state.meta.errors.length > 0 && (
//                                         <div className="text-red-500 text-sm">
//                                             {field.state.meta.errors[0]}
//                                         </div>
//                                     )}                                </div>
//                             )
//                         }}
//                     />

//                     <tanstackForm.Field
//                         name="amount"
//                         children={(field) => {
//                             return (
//                                 <div className="flex flex-col gap-2">
//                                     <Label htmlFor={field.name} className="capitalize">
//                                         {field.name}
//                                     </Label>
//                                     <Input
//                                         id={field.name}
//                                         type="number"
//                                         name={field.name}
//                                         value={field.state.value}
//                                         onBlur={field.handleBlur}
//                                         onChange={(e) => field.handleChange(Number(e.target.value))}
//                                     />
//                                     {field.state.meta.errors.length > 0 && (
//                                         <div className="text-red-500 text-sm">
//                                             {field.state.meta.errors[0]}
//                                         </div>
//                                     )}
//                                 </div>
//                             )
//                         }}
//                     />
//                     <DialogFooter>
//                         <DialogClose render={<Button variant="outline">Cancel</Button>} />
//                         <Button type="submit">Save changes</Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     )
// }

// export default React.memo(AddEditTransaction)