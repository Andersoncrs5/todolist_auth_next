"use client"

import { useRouter } from "next/navigation"
import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { HoverBgStyleType } from "@/types/hoverBg.type"
import { HoverTextStyleType } from "@/types/hoverText.type"
import { TextStyleType } from "@/types/text.type"
import { ReactNode } from "react"

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
  icon?: ReactNode
  w?: string
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
  hoverText,
  icon,
  w,
}: Props) {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.push(url)}
      className={`
        flex items-center gap-2
        ${bgColor} ${border ? `border ${border}` : ""}
        ${pdd} rounded ${text} ${hoverBg}
        ${hoverText} ${margin || ""}
      `}
    >
      {icon && <span>{icon}</span>}
      {name}
    </button>
  )
}
