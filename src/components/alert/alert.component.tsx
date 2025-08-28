import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { TextStyleType } from "@/types/text.type"

interface Props {
    msg: string
    bgStyle: BgStyleType
    textStyle: TextStyleType
    borderStyle: BorderStyleType
}

export default function Alert({ bgStyle, borderStyle, msg, textStyle }: Props) {
    return (
        <div 
            className={`
                absolute top-[2%]         
                left-1/2 -translate-x-1/2 
                z-50 w-[80%] 
                text-center
                border ${borderStyle}
                mt-2 rounded p-2
                ${bgStyle}
            `} 
        >
            <p className={`${textStyle}`} >{msg}</p>
        </div>
    )
}