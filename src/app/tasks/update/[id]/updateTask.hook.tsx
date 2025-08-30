'use client'

import TaskModel from "@/model/task/task.model";
import UpdateTaskDTO from "@/model/task/UpdateTaskDTO.dto";
import api from "@/services/axios/api";
import LocalStorageService from "@/services/storage";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";
import ResponseBody from "@/util/res/ResponseBody.res";
import { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function UseUpdateTask() {
    const timeMsg = 6000
    const { id } = useParams<{ id: string }>();
    const route = useRouter()
    const storageService = new LocalStorageService()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [done, setDone] = useState<boolean>(false)

    const [task, setTask] = useState<TaskModel>({
        id: "",
        title: "",
        description: "",
        done: false,
        userId: "",
        createdAt: new Date(),
        updatedAt: new Date()
    })

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    
    const [alert, setAlert] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');

    const [bgColorAlert, setBgColorAlert] = useState<BgStyleType>("bg-transparent");
    const [colorTextAlert, setColorTextAlert] = useState<TextStyleType>("text-white");
    const [colorBorderAlert, setColorBorderAlert] = useState<BorderStyleType>("border-white");

    const [errorForm, setErrorForm] = useState<boolean>(false);
    const [msgErrorForm, setMsgErrorForm] = useState<string[]>([]);

    useEffect(() => {
        getTask()
    }, [id])

    async function HandleSubmit(e: React.FormEvent) {
        setIsSubmitting(true)

        e.preventDefault()
        const token = storageService.getToken()

        const dto = { title, description, done: task.done  } as UpdateTaskDTO

        try  {
            const response = await api.put<ResponseBody<TaskModel>>('/v1/Task/'+id, dto,{
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    response.data.message
                )

                route.push("/tasks")
                clearInputs()
                return
            }

        } catch (e) {
            const err = e as AxiosError

            if (err.response?.status && err.response?.status === 400) {
                const data = err.response.data as ResponseBody<string[]>
                showErrorForm(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.body
                )
                return
            }

            if (err.response?.status && err.response?.status === 404) {
                const data = err.response.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.body
                )

                route.replace('/tasks')
                return
            }

            if (
                err.response && 
                err.response.status && 
                err.response.status >= 500 &&  
                err.response.status <= 599
            ) {
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

    async function getTask() {
        const token = storageService.getToken()

        if (token == null) {
            route.replace('/')
            return
        }

        try {
            const response = await api.get('/v1/Task/' +id , {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.status === 200) {
                const data = response.data as ResponseBody<TaskModel>

                setTitle(data.body.title)
                setDescription(data.body.description)
                setDone(data.body.done)
                setTask(data.body)
                return
            }

        } catch (e) {
            const err = e as AxiosError

            if (err.response?.status && err.response?.status === 400) {
                const data = err.response.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.body
                )
                return
            }

            if (err.response?.status && err.response?.status === 404) {
                const data = err.response.data as ResponseBody<string>
                showAlert(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    data.body
                )

                route.replace('/tasks')
                return
            }

            if (
                err.response && 
                err.response.status && 
                err.response.status >= 500 &&  
                err.response.status <= 599
            ) {
                
                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    "Error the server please try again later"
                )
            } 
        }
    }

    function clearInputs() {
        setTitle('')
        setDescription('')
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
        title,
        setTitle,
        description,
        setDescription,
        isSubmitting,
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