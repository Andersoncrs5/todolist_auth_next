'use client'

import Alert from "@/components/alert/alert.component"
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component"
import BtnUrl from "@/components/btnUrl/btnUrl.component"
import CustomInput from "@/components/customInput/customInput.component"
import CustomTextarea from "@/components/customTextarea/customTextarea.component"
import ErrorForm from "@/components/errorForm/errorForm.component"
import { UseUpdateTask } from "./updateTask.hook"

export default function UpdateTask() {
    const { 
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        description,
        errorForm,
        isSubmitting,
        msg,
        msgErrorForm,
        setDescription,
        setTitle,
        title,
        HandleSubmit
    } = UseUpdateTask()
    return (
        <>
            {alert && <Alert msg={msg} bgStyle={bgColorAlert} textStyle={colorTextAlert} borderStyle={colorBorderAlert}  />}
            {errorForm && <ErrorForm msgs={msgErrorForm} bgStyle={bgColorAlert} textStyle={colorTextAlert} border={colorBorderAlert} padding={"p-1"} /> }

            <div className="flex items-center justify-center min-h-screen">
                <div className="border border-white p-6 rounded shadow w-[30%]">
                    <form className={"flex flex-col space-y-1"} onSubmit={HandleSubmit} >
                        <div>
                            <CustomInput 
                                value={title} 
                                onChange={(e) => setTitle(e.target.value) } 
                                type={"text"} 
                                padding={"p-1"}  
                                border="border-white"
                                nameLabel="Title"    
                                textColor={"text-white"}                        
                            />
                        </div>
                        <div>
                            <CustomTextarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                border={"border-white"}
                                nameLabel="Description" 
                                textColor={"text-white"}                                

                            />
                        </div>
                        <div className="flex justify-between ">
                            <div>
                                <BtnSubmit 
                                    isSubmitting={isSubmitting}
                                    border={"border-white"}
                                    text={"text-white"}
                                    name="SUBMIT" 
                                    bgColor="bg-blue-500"
                                />
                            </div>
                            <div className="" >
                                <BtnUrl 
                                    border={"border-white"}
                                    hoverBg={"hover:bg-transparent"}
                                    text={"text-white"}
                                    name={"BACK"}
                                    bgColor={"bg-blue-500"}
                                    url={"/tasks"}
                                    pdd={"p-1"}
                                    hoverText={"hover:text-white"}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}