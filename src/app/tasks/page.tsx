'use client'

import BtnUrl from "@/components/btnUrl/btnUrl.component"
import { IoMdCreate } from "react-icons/io"
import { UseTasks } from "./tasks.hook"
import TaskModel from "@/model/task/task.model"
import ShowTask from "@/components/showTask/showTask.component"
import ActionMenu from "@/components/ActiveMenu/activeMenu.component"
import Btn from "@/components/btn/btn.component"
import { MdDelete } from "react-icons/md"
import { TfiReload } from "react-icons/tfi"
import ShowAlert from "@/components/showAlert/showAlert.component"

export default function Tasks() {

    const {
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        isSearch,
        msg,
        tasks,
        deleteTask
    } = UseTasks()

    return (
        <>
            {alert && <ShowAlert msg={msg} bgStyle={bgColorAlert} textStyle={colorTextAlert} border={colorBorderAlert} /> }

            <div className={"flex flex-col w-screen h-screen"} >
                <div className="border border-white h-15 ">
                    <div className="flex flex-row">
                        <div className={"basis-2/10"} >
                            <h1 className={"text-white text-center mt-3.5"} >ALL TASKS</h1>
                        </div>
                        <div className={"basis-6/10"} >

                        </div>
                        <div className={"basis-2/10 text-center"} >
                            <BtnUrl 
                                border={"border-white"} 
                                hoverBg={"hover:bg-white"} 
                                text={"text-white"} 
                                bgColor={"bg-transparent"} 
                                url={"/tasks/create"} 
                                pdd={"p-3"} 
                                hoverText={"hover:text-black"}      
                                icon={ <IoMdCreate /> }
                                w={"w-10"}
                                margin="mt-1"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-screen h-screen">
                    <div className="border border-white basis-2/10 ">01</div>
                    <div className="border border-white basis-8/10 ">
                        <div className="flex items-center justify-center mt-3">

                            {isSearch? 
                                (
                                    
                                    <div className="flex justify-center items-center min-h-screen">
                                        <div className="loader"></div>
                                    </div>
                                )
                                :
                                (
                                    <div className="flex flex-col w-[95%]">
                                        {tasks?.items.map((e: TaskModel) => {
                                            return (
                                                <ShowTask task={e} key={e.id}>
                                                    <ActionMenu 
                                                        textColor={"text-white"} 
                                                        hoverTextColor={"hover:text-green-500"} 
                                                        bgSyle={"bg-transparent"} 
                                                        borderStyle={"border-purple-500"}>

                                                        <div className={"flex flex-col space-y-3"} >
                                                            <Btn 
                                                                padding={"p-3"} 
                                                                border={"border-white"} 
                                                                fn={() => deleteTask(e.id)} 
                                                                hover={"hover:bg-red-500"} 
                                                                text={"text-white"}   
                                                                icon={ <MdDelete /> }                      
                                                            />
                                                            <Btn 
                                                                padding={"p-3"} 
                                                                border={"border-white"} 
                                                                fn={() => {}} 
                                                                hover={"hover:bg-white"} 
                                                                text={"text-white"}   
                                                                icon={ <TfiReload /> }                                                
                                                            />
                                                        </div>   
                                                    </ActionMenu>
                                                </ShowTask>
                                            )
                                        })}
                                    </div>
                                )
                            }

                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
