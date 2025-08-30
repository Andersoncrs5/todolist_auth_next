'use client'

import BtnUrl from "@/components/btnUrl/btnUrl.component"
import { IoIosLogOut, IoMdCreate } from "react-icons/io"
import { UseTasks } from "./tasks.hook"
import TaskModel from "@/model/task/task.model"
import ShowTask from "@/components/showTask/showTask.component"
import ActionMenu from "@/components/ActiveMenu/activeMenu.component"
import Btn from "@/components/btn/btn.component"
import { MdDelete, MdSystemUpdateAlt } from "react-icons/md"
import { TfiReload } from "react-icons/tfi"
import ShowAlert from "@/components/showAlert/showAlert.component"
import CustomInput from "@/components/customInput/customInput.component"

export default function Tasks() {

    const {
        alert,
        bgColorAlert,
        colorBorderAlert,
        colorTextAlert,
        isSearch,
        msg,
        tasks,
        deleteTask,
        changeStatus,
        query,
        setQuery,
        logout,
        updateTask
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
                        <div className={"basis-2/10 text-center flex flex-row justify-center  space-x-1"} >
                            <div>
                                <BtnUrl 
                                    border={"border-white"} 
                                    hoverBg={"hover:bg-white"} 
                                    text={"text-white"} 
                                    bgColor={"bg-transparent"} 
                                    url={"/tasks/create"} 
                                    pdd={"p-3"} 
                                    hoverText={"hover:text-black"}      
                                    icon={ <IoMdCreate /> }
                                    margin="mt-1"
                                />
                            </div>
                            <div>
                                <Btn 
                                    padding={"p-3"} 
                                    border={"border-white"} 
                                    fn={() => logout()} 
                                    hover={"hover:bg-white"} 
                                    text={"text-white"}  
                                    icon={ <IoIosLogOut /> } 
                                    margin="mt-1"                
                                />
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
                <div className="flex flex-row w-screen h-screen">
                    <div className="border border-white basis-2/10 flex flex-col">
                        <form className="m-4 flex flex-col space-y-2" >
                            <div>
                                <CustomInput 
                                    value={query.Title || ''} 
                                    onChange={(e) => setQuery(prevQuery => ({ ...prevQuery, Title: e.target.value })) } 
                                    type={"text"} 
                                    padding={"p-1.5"}    
                                    border={"border-white"}
                                    nameLabel={"Title"}
                                    textColor={"text-white"}
                                />
                            </div>
                            <div >
                                <label className="text-white">Status DOne</label>
                                <select
                                    className="border text-white rounded p-2 border border-white w-[100%]"
                                    value={
                                    query.Done === undefined ? "none" : query.Done ? "true" : "false"
                                    }
                                    onChange={(e) => {
                                    const value = e.target.value;
                                    setQuery((prev) => ({
                                        ...prev,
                                        Done: value === "none" ? undefined : value === "true",
                                    }));
                                    }}
                                >
                                    <option className="text-black bg-blue-500 " value="none">NONE</option>
                                    <option className="text-black bg-blue-500 " value="true">TRUE</option>
                                    <option className="text-black bg-blue-500 " value="false">FALSE</option>
                                </select>
                            </div>

                        </form>
                    </div>
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
                                                                fn={() => changeStatus(e.id)} 
                                                                hover={"hover:bg-white"} 
                                                                text={"text-white"}   
                                                                icon={ <TfiReload /> } 
                                                                disabled={false}                                               
                                                            />
                                                            <Btn 
                                                                padding={"p-3"} 
                                                                border={"border-white"} 
                                                                fn={() => updateTask(e.id)} 
                                                                hover={"hover:bg-white"} 
                                                                text={"text-white"}   
                                                                icon={ <MdSystemUpdateAlt /> } 
                                                                disabled={false}                                               
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
