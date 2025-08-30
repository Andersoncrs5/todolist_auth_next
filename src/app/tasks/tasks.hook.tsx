'use client'

import TaskModel from "@/model/task/task.model"
import api from "@/services/axios/api"
import LocalStorageService from "@/services/storage"
import { BgStyleType } from "@/types/bg.type"
import { BorderStyleType } from "@/types/border.types"
import { TextStyleType } from "@/types/text.type"
import Page from "@/util/res/page.res"
import ResponseBody from "@/util/res/ResponseBody.res"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function UseTasks() {
    const timeMsg = 5000
    const router = useRouter()
    const localStorageService = new LocalStorageService()
    
    const [isSearch, setIsSearch] = useState<boolean>(false)
    const [tasks, setTasks] = useState<Page<TaskModel[]>>()

    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [bgColorAlert, setBgColorAlert] = useState<BgStyleType>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyleType>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyleType>("border-white");

    useEffect(() => {
        getTasks()
    }, [])


    async function getTasks() {
        setIsSearch(true)

        const token: string | null = localStorageService.getToken()

        if (!token) {
            router.replace('/')
            return
        }

        try {
            const response = await api.get('/v1/Task', {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                const data = response.data as ResponseBody<Page<TaskModel[]>>
                setTasks(data.body)
            }

        } catch(e: any) {
            const err = e as AxiosError

            if (err.response?.status === 401) {
                const data = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-yellow-500",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )

                router.push("/")
            }

            if (err.response?.status === 404) {
                const data = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-yellow-500",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )

                router.push("/")
            }

        } finally {
            setIsSearch(false)
        }
    }

    async function deleteTask(id: string) {
        const token: string | null = localStorageService.getToken()

        try {
            const response = await api.delete("/v1/Task/"+id, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                const data = response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    data.message
                )

                getTasks()
            }

        } catch(e: any) {

            const response = e as AxiosError

            if (response.status === 400) {
                const data = response.response?.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )
            }

            if (response.status === 404) {
                const data = response.response?.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )
            }

            if (response.response?.status && response.response.status >= 500 &&  response.response.status <= 599) {
                
                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    "Error the server please try again later"
                )
            }
        }
    }

    async function changeStatus(id: string) {
        const token: string | null = localStorageService.getToken()

        try {
            const response = await api.delete("/v1/Task/"+id+"/status/done", {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                const data = response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    data.message
                )

                getTasks()
            }

        } catch(e: any) {

            const response = e as AxiosError

            if (response.status === 400) {
                const data = response.response?.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )
            }

            if (response.status === 404) {
                const data = response.response?.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.message
                )
            }

            if (response.response?.status && response.response.status >= 500 &&  response.response.status <= 599) {
                
                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    "Error the server please try again later"
                )
            }
        }
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
        isSearch,
        tasks,
        alert,
        msg,
        bgColorAlert,
        colorTextAlert,
        colorBorderAlert,
        deleteTask,
        getTasks,
        changeStatus
    }
}