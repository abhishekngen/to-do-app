import TaskPanelController from "../features/tasks/TaskPanelController.jsx";
import {NavLink} from "react-router-dom";

export default function TasksPage() {
    return (
        <div className="text-center bg-gray-800 border border-gray-700 rounded-xl p-11 flex flex-col items-center justify-center gap-y-8">
            <h1 className=''>To Do List</h1>
            <NavLink to='/add-task' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Add Task</NavLink>
            <TaskPanelController />
        </div>
    );
}