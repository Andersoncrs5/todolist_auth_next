'use client'

import CustomInput from "@/components/customInput/customInput.component"
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component"
import BtnUrl from "@/components/btnUrl/btnUrl.component"
import Alert from "@/components/alert/alert.component"
import ErrorForm from "@/components/errorForm/errorForm.component"
import { UseUpdate } from "./updateUser.hook"

export default function UpdateUser() {
    const {
        HandleSubmit,
        name,
        setName,
        password,
        setPassword,
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        errorForm,
        isSubmitting,
        msg,
        msgErrorForm,
        user
    } = UseUpdate()

    return (
        <>
            {alert && (
                <Alert 
                    msg={msg} 
                    bgStyle={bgColorAlert} 
                    textStyle={colorTextAlert} 
                    borderStyle={colorBorderAlert}  
                />
            )}

            {errorForm && (
                <ErrorForm 
                    msgs={msgErrorForm} 
                    bgStyle={bgColorAlert} 
                    textStyle={colorTextAlert} 
                    border={colorBorderAlert} 
                    padding={"p-1"} 
                /> 
            )}

            <div className="flex items-center justify-center min-h-screen">
                <div className="border border-white p-6 rounded shadow w-[30%]">
                    <form className="flex flex-col" onSubmit={HandleSubmit} >
                        <div className="mt-1">
                            <CustomInput 
                                nameLabel={"Name"}
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                type={"text"} 
                                padding={"p-1"}   
                                border={"border-white"}
                                required={true}
                                textColor={"text-white"}
                                placeholder={user?.name ?? "pochita"}
                            />
                        </div>
                        <div className="mt-1">
                            <CustomInput 
                                nameLabel={"Password"}
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                type={"password"} 
                                padding={"p-1"}   
                                border={"border-white"}
                                required={true}
                                textColor={"text-white"}
                                placeholder={"XXXXXXXX"}
                            />
                        </div>
                        <div className="mt-1">
                            <div className="flex justify-between ">
                                <div>
                                    <BtnSubmit 
                                        isSubmitting={isSubmitting}
                                        border={"border-white"}
                                        text={"text-white"}
                                        name="UPDATE" 
                                        bgColor="bg-blue-500"
                                    />
                                </div>
                                <div className="mt-2" >
                                    <BtnUrl 
                                        border={"border-white"}
                                        hoverBg={"hover:bg-transparent"}
                                        text={"text-white"}
                                        name={"BACK"}
                                        bgColor={"bg-blue-500"}
                                        url={"/"}
                                        pdd={"p-1"}
                                        hoverText={"hover:text-white"}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
