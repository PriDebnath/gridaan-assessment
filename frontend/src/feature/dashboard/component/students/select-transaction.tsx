// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import React from "react"

// interface Props {
//     id: string;
//     typeList: string[];
//     filter: string;
//     onFilterChange: (filter: string) => void
// }

// function SelectTransaction(props: Props) {
//     const { id, filter, onFilterChange, typeList } = props
//     return (
//         <Select
//             id={id}
//             value={filter}
//             onValueChange={(value) => {
//                 onFilterChange(value!)
//             }}
//         >
//             <SelectTrigger className="w-full ">
//                 <SelectValue placeholder="Choose a role" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup >
//                     {/* <SelectLabel>Role</SelectLabel> */}
//                     {
//                         typeList?.map((type) => {
//                             return (
//                                 <SelectItem
//                                     key={type}
//                                     value={type}
//                                     className={'capitalize'}
//                                 >
//                                     {type}
//                                 </SelectItem>
//                             )
//                         })
//                     }
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     )
// }

// export default React.memo(SelectTransaction)