import { BorderStyleType } from "@/types/border.types"
import { HoverBgStyleType } from "@/types/hoverBg.type"
import { TextStyleType } from "@/types/text.type"
import { ReactNode } from "react"

interface Props {
    title?: string
    icon?: ReactNode
    padding: PaddingStyleType
    border: BorderStyleType
    margin?: string
    fn: () => any
    disabled?: boolean
    hover: HoverBgStyleType
    text: TextStyleType
}

export default function Btn({ 
    title, 
    icon, 
    padding, 
    margin, 
    fn, 
    disabled, 
    hover,
    border,
    text
}: Props) {
    return (
        <button
            className={`
                bg-transparent border ${border}
                ${padding} rounded ${text} ${hover}
                hover:text-black ${margin}
            `}
            onClick={fn}
            disabled={disabled}
        >
            {icon} {title}
        </button>
    )
}