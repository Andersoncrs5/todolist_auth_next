'use client'

import Alert from "@/components/alert/alert.component";
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component";
import BtnUrl from "@/components/btnUrl/btnUrl.component";
import CustomInput from "@/components/customInput/customInput.component";
import ErrorForm from "@/components/errorForm/errorForm.component";
import UseLogin from "./login.hook";

export default function Login() {

    const {
        HandleSubmit,
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        email,
        errorForm,
        isSubmitting,
        msg,
        msgErrorForm,
        password,
        setEmail,
        setPassword
    } = UseLogin()

    return (
        <>
            {alert && <Alert msg={msg} bgStyle={bgColorAlert} textStyle={colorTextAlert} borderStyle={colorBorderAlert}  />}
            {errorForm && <ErrorForm msgs={msgErrorForm} bgStyle={bgColorAlert} textStyle={colorTextAlert} border={colorBorderAlert} padding={"p-1"} /> }

            <div className="flex items-center justify-center min-h-screen">
                <div className="border border-white p-6 rounded shadow w-[30%]">
                    <form className={"flex flex-col"} onSubmit={HandleSubmit} >
                        <div className="mt-1">
                            <CustomInput 
                                nameLabel={"Email"}
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                type={"email"} 
                                padding={"p-1"}   
                                border={"border-white"}
                                required={true}
                                textColor={"text-white"}
                                placeholder={"pochita@gmail.com"}
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
                                        name="SUBMIT" 
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
                                        w={""}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}