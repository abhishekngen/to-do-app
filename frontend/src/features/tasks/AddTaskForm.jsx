import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {addTask} from "./tasksSlice.js";

export default function AddTaskForm() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [taskFormData, setTaskFormData] = useState({
        title: '',
        points: 0
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        setTaskFormData({
            ...taskFormData,
            [name]: value
        });
        console.log(taskFormData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(taskFormData.title !== "" && Number.isInteger(Number(taskFormData.points)) && Number(taskFormData.points) > 0) {
            dispatch(addTask({ // TODO use .wrap() and await for dispatching before navigating, prevent submissions whilst loading
                ...taskFormData,
            }));
            navigate('/');
        } else {
            // TODO Toast something
            console.log("Invalid input");
        }
    }

    return (
        <form className="flex flex-col my-4 mx-auto max-w-2xl" onSubmit={handleSubmit}>
            <div className='mb-5'>
                <label htmlFor='title' className='text-white block text-sm font-medium'>Task Title:</label>
                <input
                    type='text'
                    name='title'
                    value={taskFormData.title}
                    onChange={handleChange}
                    className='shadow-sm text-sm rounded-lg focus:ring-blue-500 p-2.5'
                />
            </div>
            <div className='mb-5'>
                <label htmlFor='points' className='text-white block text-sm font-medium'>Task Points:</label>
                <input
                    type='number'
                    name='points'
                    value={taskFormData.points}
                    onChange={handleChange}
                    className='shadow-sm text-sm rounded-lg focus:ring-blue-500 p-2.5'
                />
            </div>
            <input type='submit' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'/>
        </form>
    )
}