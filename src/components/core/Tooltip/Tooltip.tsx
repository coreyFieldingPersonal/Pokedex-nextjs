import {
  Tooltip as TooltipComponent,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip"
import "./styles.css"

interface ITooltipProps {
  open: boolean
  onOpenChange: any
  children: React.ReactNode[]
}
export default function Tooltip({
  open,
  onOpenChange,
  children,
}: ITooltipProps) {
  return (
    <TooltipComponent
      open={open}
      defaultOpen={true}
      onOpenChange={onOpenChange}
      delayDuration={100}
    >
      <TooltipTrigger asChild>
        <span>{children}</span>
      </TooltipTrigger>
      <TooltipContent className="TooltipContent bg-zinc-500 p-3 rounded-lg border border-gray-300">
        Add to library
      </TooltipContent>
    </TooltipComponent>
  )
}
