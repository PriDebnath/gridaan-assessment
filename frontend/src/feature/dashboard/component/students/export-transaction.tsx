// import {
//     FileBracesIcon,
//     FileCodeIcon,
// } from "lucide-react"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import React from "react"
// import { Button } from "@/components/ui/button"
// import { useTransactionStore, type Transaction } from "@/store/transaction.store"

// function downloadFile(content: string, fileName: string, type: string) {
//   const blob = new Blob([content], { type })
//   const url = URL.createObjectURL(blob)
//   const a = document.createElement("a")
//   a.href = url
//   a.download = fileName
//   a.click()
//   URL.revokeObjectURL(url)
// }

// function convertToCSV(data: Transaction[]) {
//     if (!data.length) return ""

//     const headers = Object.keys(data[0]).join(",")

//     const rows = data.map(obj =>
//         Object.values(obj)
//             .map(value => `"${String(value)}"`) // handles commas safely
//             .join(",")
//     )

//     return [headers, ...rows].join("\n")
// }

// function ExportTransactionDropdown() {
//   const { transactions } = useTransactionStore()

//     const handleExportCSV = () => {
//         const csv = convertToCSV(transactions)
//         downloadFile(csv, "transactions.csv", "text/csv")
//     }

//     const handleExportJSON = () => {
//         const json = JSON.stringify(transactions, null, 2)
//         downloadFile(json, "transactions.json", "application/json")
//     }

//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger render={ <Button variant="outline">Export</Button>}>
//             </DropdownMenuTrigger>

//             <DropdownMenuContent>
//                 <DropdownMenuItem onClick={handleExportCSV}>
//                     <FileCodeIcon className="mr-2 h-4 w-4" />
//                     CSV
//                 </DropdownMenuItem>

//                 <DropdownMenuItem onClick={handleExportJSON}>
//                     <FileBracesIcon className="mr-2 h-4 w-4" />
//                     JSON
//                 </DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }

// export default React.memo(ExportTransactionDropdown)