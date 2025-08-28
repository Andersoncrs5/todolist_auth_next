import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";

interface Props {
    msgs: string[];
    bgStyle: BgStyleType;    
    textStyle: TextStyleType;  
    border: BorderStyleType;
    padding: PaddingStyleType;
}

export default function ErrorForm({
        bgStyle,
        border,
        msgs,
        padding,
        textStyle
    }: Props) {
    return (
        <div 
            className={`
                absolute top-[2%] 
                left-1/2 -translate-x-1/2 
                z-50 w-[80%] 
                text-center
                ${padding}
                border ${border}
                mt-2 rounded
                ${bgStyle}
            `} 
        >
            {msgs.map((msg, index) => (
                <p 
                    key={index} 
                    style={{ display: 'block' }} 
                    className={`my-1 ${textStyle}`}
                >
                    {msg}
                </p>
            ))}
        </div>
    );
}
