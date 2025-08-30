
import TaskModel from '@/model/task/task.model';
import { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid'

interface Props {
    task: TaskModel
    children?: ReactNode
}

export default function ShowTask({ task, children }: Props ) {
    return (
        <div key={task.id} className="flex flex-row items-center p-3 my-1 rounded border border-white text-white w-[100%] ">
            <div className="basis-1/4 text-center">
                <p>{task.title}</p>
            </div>
            <div className="basis-1/2 text-center">
                <p>{task.description}</p>
            </div>
            <div className="basis-[12.5%] text-center">
                <p>{task.done ? 'completed' : 'not completed'}</p>
            </div>
            <div className="basis-[12.5%] text-center">
                {children}
            </div>
        </div>

    );
}