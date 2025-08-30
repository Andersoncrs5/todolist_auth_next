
import { IoIosArrowBack } from "react-icons/io";
import { GrFormNext } from "react-icons/gr";
import Btn from "../btn/btn.component";
import TaskModel from "@/model/task/task.model";
import Page from "@/util/res/page.res";

interface Props {
    tasks: Page<any> | undefined
    backPage: any
    nextPage: any
}

export default function Pagination({ tasks, backPage, nextPage }: Props) {
    if (tasks == undefined) {
        return null
    }

    if (tasks.totalPages <= 1) {
        return null;
    }

    const isFirstPage = tasks.pageIndex === 1;
    const isLastPage = tasks.pageIndex === tasks.totalPages;
    
    return (
        <div className="flex justify-center items-center gap-4 mt-6 text-white">
            
            <Btn 
                fn={backPage}
                icon={<IoIosArrowBack size={20} />}
                disabled={isFirstPage}
                more={isFirstPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}
                border="border-white"
                hover="hover:bg-white"
                padding="p-2" 
                text={"text-white"}
            />

            <span className="text-sm">
                Página {tasks.pageIndex} de {tasks.totalPages}
            </span>

            <Btn 
                fn={nextPage} 
                icon={<GrFormNext size={20} />} 
                disabled={isLastPage}
                more={isLastPage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}
                border="border-white"
                hover="hover:bg-white"
                padding="p-2"
                text={"text-white"}
            />
        </div>
    );
}