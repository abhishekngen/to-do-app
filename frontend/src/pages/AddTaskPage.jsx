import AddTaskForm from "../features/tasks/AddTaskForm.jsx";
import {NavLink} from "react-router-dom";

export default function AddTaskPage() {
    return (
        <>
            <div className="fixed top-4 left-4">
                <NavLink to='/' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Back</NavLink>
            </div>
            <div className="text-center relative bottom-40 bg-gray-800 border border-gray-700 rounded-xl p-11 min-w-1/3">
                <h1>Add Task</h1>
                <AddTaskForm/>
            </div>
        </>
    );
}