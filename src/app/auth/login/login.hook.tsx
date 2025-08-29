'use client'

import LoginUserDTO from "@/model/user/LoginUserDTO.dto";
import api from "@/services/axios/api";
import LocalStorageService from "@/services/storage";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";
import ResponseBody from "@/util/res/ResponseBody.res";
import Tokens from "@/util/res/Token.res";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UseLogin() {

    const timeMsg = 6000
    const router = useRouter()
    const localStorageService = new LocalStorageService()

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [bgColorAlert, setBgColorAlert] = useState<BgStyleType>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyleType>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyleType>("border-white");

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault
        setIsSubmitting(true)

        const dto = { email, password } as LoginUserDTO

        try {
            const response = await api.post("/v1/Auth/login", dto) 

            if (response.status === 200) {
                const data = response.data as ResponseBody<Tokens>

                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    data.message
                )

                localStorageService.setTokens(data.body)

                router.push("/tasks/")
                return
            }

        } catch(e: any) {

        } finally {
            clearInputs()
            setIsSubmitting(false)
        }

    }

    function clearInputs() {
        setEmail('')
        setPassword('')
    }

    function showErrorForm(
        bg: BgStyleType,
        text: TextStyleType,
        border: BorderStyleType, 
        msgs: string[]
    ) {
        setErrorForm(true)

        setBgColorAlert(bg)
        setColorTextAlert(text)
        setColorBorderAlert(border)

        setMsgErrorForm(msgs)

        setTimeout(() =>{
            setErrorForm(false)
        }, timeMsg)
    }

    function showAlert(
        bg: BgStyleType,
        text: TextStyleType,
        border: BorderStyleType,
        m: string
    ) {
        setAlert(true)

        setBgColorAlert(bg)
        setColorTextAlert(text)
        setColorBorderAlert(border)

        setMsg(m)

        setTimeout(() =>{
            setAlert(false)
        }, timeMsg)
    }

    return {

    }
}