// import React from "react"
// import { format } from "date-fns"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Field, FieldLabel } from "@/components/ui/field"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"


// interface Props {
//     id: string;
//     date: Date;
//     onDateChange: (date: Date) => void
// }

//  function DatePicker(props:Props) {
//     const {date, onDateChange} = props

//     return (
//         <Field className="">
//             <Popover>
//                 <PopoverTrigger render={<Button
//                     variant="outline"
//                     id="date-picker-simple"
//                     className="justify-start font-normal"
//                 >
//                     {date ? format(date, "PPP") : <span>Pick a date</span>}
//                 </Button>}>

//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0" align="start">
//                     <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={(date)=>{
//                             onDateChange(date!)
//                         }}
//                         defaultMonth={date}
//                     />
//                 </PopoverContent>
//             </Popover>
//         </Field>
//     )
// }

// export default React.memo(DatePicker)