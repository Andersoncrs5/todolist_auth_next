'use client'
import CustomInput from "@/components/customInput/customInput.component"
import UseRegister from "./register.hook"
import BtnSubmit from "@/components/btnSubmit/btnSubmit.component"
import BtnUrl from "@/components/btnUrl/btnUrl.component"
import Alert from "@/components/alert/alert.component"
import ErrorForm from "@/components/errorForm/errorForm.component"

export default function Register() {
    const {
        HandleSubmit,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        errorForm,
        isSubmitting,
        msg,
        msgErrorForm
    } = UseRegister()

    return (
        <>
            {alert && <Alert msg={msg} bgStyle={bgColorAlert} textStyle={colorTextAlert} borderStyle={colorBorderAlert}  />}
            {errorForm && <ErrorForm msgs={msgErrorForm} bgStyle={bgColorAlert} textStyle={colorTextAlert} border={colorBorderAlert} padding={"p-1"} /> }

            <div className="flex items-center justify-center min-h-screen">
                <div className="border border-white p-6 rounded shadow w-[30%]">
                    <form className={"flex flex-col"} onSubmit={HandleSubmit} >
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
                                placeholder={"pochita"}
                            />
                        </div>
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