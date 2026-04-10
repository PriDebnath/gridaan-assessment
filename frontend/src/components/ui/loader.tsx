
import { Loader2 } from "lucide-react"

function Loader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div className="flex items-center justify-center ">
            <div className="flex items-center justify-center h-9 w-9">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
        </div>
    )
}

export { Loader }