'use client'

import LoginUserDTO from "@/model/user/LoginUserDTO.dto";
import api from "@/services/axios/api";
import LocalStorageService from "@/services/storage";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";
import ResponseBody from "@/util/res/ResponseBody.res";
import Tokens from "@/util/res/Token.res";
import { AxiosError, AxiosResponse } from "axios";
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
        e.preventDefault()
        setIsSubmitting(true)

        const dto = { email, password } as LoginUserDTO

        try {
            const response: AxiosResponse<any, any> = await api.post("/v1/Auth/login", dto) 

            if (response.status === 200) {
                const data = response.data as ResponseBody<Tokens>

                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    data.message
                )

                clearInputs()
                localStorageService.setTokens(data.body)

                router.push("/tasks")
                return
            }

        } catch(e: any) {
            const err = e as AxiosError

            if (err.response?.status === 400) {
                const data = err.response.data as ResponseBody<string[]>
                showErrorForm(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.body
                )
            }

            if (err.response?.status === 401) {
                const data = err.response.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )
            }

            if (err.response?.status && err.response?.status >= 500 &&  err.response?.status <= 599) {
                
                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    "Error the server please try again later"
                )
            }

        } finally {
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
        isSubmitting,
        email,
        setEmail,
        password,
        setPassword,
        alert,
        msg,
        bgColorAlert,
        colorTextAlert,
        colorBorderAlert,
        errorForm,
        msgErrorForm,
        HandleSubmit
    }
}