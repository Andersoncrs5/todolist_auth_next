'use client'

import CreateTaskDTO from "@/model/task/CreateTaskDTO.dto";
import TaskModel from "@/model/task/task.model";
import api from "@/services/axios/api";
import LocalStorageService from "@/services/storage";
import { BgStyleType } from "@/types/bg.type";
import { BorderStyleType } from "@/types/border.types";
import { TextStyleType } from "@/types/text.type";
import ResponseBody from "@/util/res/ResponseBody.res";
import ValidationErrors from "@/util/res/ValidationErrors.res";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function UseCreateTask() {
    const timeMsg = 6000
    const router = useRouter()
    const localStorageService = new LocalStorageService()

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [done, setDone] = useState<boolean>(false)

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
        const dto = { title, description, done } as CreateTaskDTO
        
        const token = localStorageService.getToken()

        try {
            const response = await api.post("/v1/Task", dto, {
                headers: { Authorization: `Bearer ${token}` }
            })

            console.log(response)

            if (response.status === 201) {
                const data = response.data as ResponseBody<TaskModel>
                showAlert(
                    "bg-transparent",
                    "text-green-500",
                    "border-green-500",
                    data.message
                )

                router.replace('/tasks')
                return
            }

        } catch (e: any) {
            const err = e as AxiosError
            console.log(err)


            if (err.status && err.status === 400) {
                const data = err.response?.data as ResponseBody<ValidationErrors>
                const errs: string[] = []

                if (data.body.errors.Title) { errs.push(...data.body.errors.Title) }
                if (data.body.errors.Description) { errs.push(...data.body.errors.Description) }
                if (data.body.errors.Done) {errs.push(...data.body.errors.Done) }

                showErrorForm(
                    "bg-transparent",
                    "text-yellow-500",
                    "border-yellow-500",
                    errs
                )
            }

            if (err.response?.status === 401) {
                const data = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    data.message
                )

                router.replace("/")
            }

            if (err.response?.status === 404) {
                const data = err.response.data as ResponseBody<string>

                showAlert(
                    "bg-transparent", 
                    "text-red-500", 
                    "border-red-500",
                    data.message
                )
                
                router.replace("/")
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
            clearInputs()
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
        isSubmitting,
        alert,
        msg,
        bgColorAlert,
        colorTextAlert,
        colorBorderAlert,
        errorForm,
        msgErrorForm,
        HandleSubmit,
        setTitle,
        setDescription,
        setDone,
        title,
        description,
        done
    }
}