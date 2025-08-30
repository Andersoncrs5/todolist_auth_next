import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { HoverBgStyleType } from "@/types/hoverBg.type"
import { HoverTextStyleType } from "@/types/hoverText.type"
import { TextStyleType } from "@/types/text.type"
import { ReactNode } from "react"

interface Props {
    name?: string
    isSubmitting: boolean
    colorHover? : HoverTextStyleType
    padding?: PaddingStyleType
    children?: ReactNode
    bgColor?: BgStyleType
    hoverBgColor?: HoverBgStyleType
    icon?: ReactNode
    border: BorderStyleType
    text: TextStyleType
}

export default function BtnSubmit({
    icon, isSubmitting, bgColor, children,
    colorHover, name, padding, border, text, hoverBgColor = "hover:bg-green-500"
}: Props) {
    return (
        <div className={`flex justify-between ${colorHover} items-center ` + text} >
            <button 
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 ${bgColor} border ${border} ${hoverBgColor} ${text} px-2 py-1 rounded 
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ' hover:bg-green-500 hover:border'}`}
            >
                {isSubmitting ? (
                    <>
                        <svg 
                            className="animate-spin h-5 w-5 text-white" 
                            viewBox="0 0 24 24"
                        >
                            <circle 
                                className="opacity-25" 
                                cx="12" cy="12" r="10" 
                                stroke="currentColor" 
                                strokeWidth="4"
                            ></circle>
                            <path 
                                className="opacity-75" 
                                fill="currentColor" 
                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            ></path>
                        </svg>
                        Processing...
                    </>
                ) : (
                    name
                )}
            </button>
            {children}
        </div>
        
    );
}