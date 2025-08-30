'use client'

import Alert from "@/components/alert/alert.component"
import { UseProfile } from "./profile.hook"
import Btn from "@/components/btn/btn.component"
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import BtnUrl from "@/components/btnUrl/btnUrl.component";

export default function Profile() {
    const {
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        load,
        msg,
        user,
        deleteUser
    } = UseProfile();

    return (
        <>
            {alert && <Alert msg={msg} bgStyle={bgColorAlert} textStyle={colorTextAlert} borderStyle={colorBorderAlert} /> }

            {load ? (
                <div className="flex justify-center items-center min-h-screen">
                    <div className="loader"></div>
                </div>
            ) : (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="border border-white p-6 rounded shadow">
                        <div>
                            <h1 className="text-white" >Name: {user.name}</h1>
                            <h4 className="text-white" >Email: {user.email}</h4>
                        </div>
                        <div className={"flex flex-row mt-2 space-x-1"} >
                            <Btn
                                padding={"p-2"}
                                icon={<MdDelete />}
                                fn={() => deleteUser()} 
                                border={"border-red-500"} 
                                hover={"hover:bg-red-500"} 
                                text={"text-red-500"}                            
                            />
                            <BtnUrl
                                bgColor="bg-transparent"
                                border="border-yellow-500"
                                hoverBg="hover:bg-yellow-500"
                                hoverText="hover:text-black"
                                url="/user/update"
                                icon={<GrUpdate />} 
                                text={"text-yellow-500"} 
                                pdd={"p-2"}                            
                            />
                            <BtnUrl
                                bgColor="bg-transparent"
                                border="border-white"
                                hoverBg="hover:bg-blue-500"
                                hoverText="hover:text-black"
                                url="/tasks"
                                name="BACK"
                                text={"text-white"} 
                                pdd={"p-1"}                            
                            />
                        </div>
                        
                    </div>
                </div>
            )}
        </>
    )
}