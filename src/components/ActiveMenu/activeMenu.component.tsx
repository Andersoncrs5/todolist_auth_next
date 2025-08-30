import { ReactNode } from "react";
import { FaEllipsisV } from 'react-icons/fa'; 
import { useActionMenu } from "./useActionMenu.component";
import { TextStyleType } from "@/types/text.type";
import { HoverTextStyleType } from "@/types/hoverText.type";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";

interface ActionMenuProps {
  children: ReactNode;
  textColor: TextStyleType
  hoverTextColor: HoverTextStyleType
  bgSyle: BgStyleType
  borderStyle: BorderStyleType
}

export default function ActionMenu({ children, textColor, hoverTextColor, borderStyle }: ActionMenuProps) {
    const {
        menuRef,
        setIsOpen,
        isOpen
    } = useActionMenu();

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${textColor} ${hoverTextColor} transition-colors duration-200`}
            >
                <FaEllipsisV />
            </button>

            {isOpen && (
                <div className={`${hoverTextColor} absolute right-0 m-2 w-38 border ${borderStyle} rounded-md shadow-lg p-2 z-10`}>
                    {children}
                </div>
            )}
        </div>
    );
}