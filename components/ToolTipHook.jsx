import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"

const ToolTipHook = ({content}) => {
  return (
        <TooltipProvider className="m-0 p-0">
            <Tooltip className="m-0 p-0">
                <TooltipTrigger className="p-0">
                    <HelpCircle className="hidden xl:inline h-4 w-4 text-gray-400 cursor-pointer"/>
                </TooltipTrigger >
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
  )
}

export default ToolTipHook
