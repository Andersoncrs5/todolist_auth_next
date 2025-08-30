'use client'

import UserModel from "@/model/user/UserModel.model"
import api from "@/services/axios/api"
import LocalStorageService from "@/services/storage"
import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { TextStyleType } from "@/types/text.type"
import ResponseBody from "@/util/res/ResponseBody.res"
import { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function UseProfile() {
    const localStorageService = new LocalStorageService()
    const timeMsg = 6000
    const urlUser = '/v1/User'

    const router = useRouter()
    const [load, setLoad] = useState<boolean>(true)
    
    const [user, setUser] = useState<UserModel>({
        id: '', email: '', name: ''
    })

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [bgColorAlert, setBgColorAlert] = useState<BgStyleType>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyleType>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyleType>("border-white");
    
    useEffect(() => {
        getUser()
    }, [])

    async function deleteUser() {
        try {
            const token = localStorageService.getToken()

            const response: AxiosResponse<ResponseBody<string>> = await api.delete(urlUser, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {

                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    "Bye Bye"
                )

                localStorageService.clearAll()
                router.push("/")
                return
            }

        } catch(e: any) {
            const err = e as AxiosError
            console.error(err)

            if (err.response?.status === 401) {
                const body = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    "Error the to delete user"
                )
            }

            if (err.response?.status === 404) {
                const body = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    "Error the to delete user"
                )
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
            }
        }
    }

    async function getUser() {
        const token = localStorageService.getToken()

        try {
            const response: AxiosResponse<ResponseBody<UserModel>, any> = await api.get(urlUser+'/me', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status == 200) {
                setUser(response.data.body as UserModel)
                setLoad(false)
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
        load,
        user,
        alert,
        msg,
        bgColorAlert,
        colorTextAlert,
        colorBorderAlert,
        deleteUser
    }
}