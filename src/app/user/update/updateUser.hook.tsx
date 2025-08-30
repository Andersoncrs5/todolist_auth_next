'use client'

import UpdateUserDTO from "@/model/user/UpdateUserDTO.dto";
import UserModel from "@/model/user/UserModel.model";
import api from "@/services/axios/api";
import LocalStorageService from "@/services/storage";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";
import ResponseBody from "@/util/res/ResponseBody.res";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


export function UseUpdate() {
    const localStorageService = new LocalStorageService()
    const router = useRouter()
    const timeMsg = 6000;
    const urlUser = '/v1/User'
    
    const [user, setUser] = useState<UserModel>();

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [bgColorAlert, setBgColorAlert] = useState<BgStyleType>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyleType>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyleType>("border-white");

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    useEffect(() => {
        getUser()
    }, [])

    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setIsSubmitting(true)

        const token = localStorageService.getToken()

        const nameTrim = name.trim()
        const dto = { password, name: nameTrim } as UpdateUserDTO
        
        try {   
            const response = await api.put(urlUser, dto, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    response.data.message
                )

                clearInputs()
                router.push("/user/profile")
                return
            }

        } catch(e:any) {
            const err = e as AxiosError<ResponseBody<string[]>>

            if (err.response?.status === 400) {
                showErrorForm(
                    "bg-transparent", 
                    "text-yellow-500", 
                    "border-yellow-500",
                    err.response.data.body as string[]
                )
            }

            if (err.response?.status === 401) {
                showAlert(
                    "bg-transparent",
                    "text-white",
                    "border-yellow-500",
                    "You are not logged!"
                )
                router.push("/")
                return
            }

            if (err.response?.status === 404) {

                showAlert(
                    "bg-transparent",
                    "text-white",
                    "border-yellow-500",
                    err.response.data.message
                )

                return
            }

            if (err.response?.status === 409) {

                showAlert(
                    "bg-transparent",
                    "text-white",
                    "border-yellow-500",
                    err.response.data.message
                )

                return
            }

            if (err.response?.status && err.response?.status >= 500 &&  err.response?.status <= 599) {
                console.log(err)
                showAlert(
                    "bg-transparent", "text-red-500", 
                    "border-red-500","Error the server please try again later"
                )
            }

        } finally {
            setIsSubmitting(false)
        }
    }

    async function getUser() {
        try {
            const token = localStorageService.getToken()

            if (token == null) { router.push('/'); return }

            const response: AxiosResponse<ResponseBody<UserModel>, any> = await api.get(urlUser+'/me', {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(response)

            if (response.status == 200) {
                setUser(response.data.body as UserModel)

            }

        } catch(e: any) {
            const err = e as AxiosError
            
            console.error(err)

            if (err.response?.status === 401) {
                showAlert(
                    "bg-transparent",
                    "text-white",
                    "border-yellow-500",
                    "You are not logged!"
                )
                router.push("/")
                return
            }

            if (err.response?.status === 404) {
                const body = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent",
                    "text-white",
                    "border-yellow-500",
                    body.message
                )

                router.push("/")
                return
            }

            if (err.response?.status && err.response?.status >= 500 &&  err.response?.status <= 599) {
                console.log(err)
                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    "Error the server please try again later"
                )

                router.push("/")
                return
            }

        } 
    }

    function clearInputs() {
        setPassword('')
        setName('')
    }

    function showErrorForm(
        bg: BgStyleType,text: TextStyleType,border: BorderStyleType, msgs: string[]
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
        bg: BgStyleType,text: TextStyleType,border: BorderStyleType,m: string
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
        user,
        password,
        setPassword,
        isSubmitting,
        alert,
        bgColorAlert,
        colorTextAlert,
        colorBorderAlert,
        errorForm,
        msgErrorForm,
        msg,
        HandleSubmit,
        name,
        setName
    }
}