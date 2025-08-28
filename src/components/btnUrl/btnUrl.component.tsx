import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { HoverBgStyleType } from "@/types/hoverBg.type"
import { HoverTextStyleType } from "@/types/hoverText.type"
import { TextStyleType } from "@/types/text.type"
import Link from "next/link"

interface Props {
    border: BorderStyleType
    margin?: string
    hoverBg: HoverBgStyleType
    text: TextStyleType
    bgColor: BgStyleType
    url: string
    name?: string
    pdd: PaddingStyleType
    hoverText: HoverTextStyleType
    
}

export default function BtnUrl({ 
    border, 
    text, 
    hoverBg,
    bgColor, 
    url, 
    name, 
    pdd, 
    margin, 
    hoverText 
}: Props) {
    return (
        <Link 
        href={url}
        className={`
            ${bgColor} border ${border}
            ${pdd} rounded ${text} ${hoverBg}
            ${hoverText} ${margin} 
        `}
        >
            {name}
        </Link>
    )
}