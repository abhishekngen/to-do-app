import PropTypes from "prop-types";
import {taskStatus} from "./taskStatus.js";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "./tasksSlice.js";

export default function Task(props) {
    const {id, title, points, status} = props;
    const dispatch = useDispatch();

    const clickHandler = (e) => {
        if (e.target.name === 'move-right') {
            if (status === taskStatus.ToDo) {
                dispatch(updateTask({id: id, currentStatus: status, newStatus: taskStatus.Doing}));
            } else if (status === taskStatus.Doing) {
                dispatch(updateTask({id: id, currentStatus: status, newStatus: taskStatus.Done}));
            }
        } else if (e.target.name === 'move-left') {
            if (status === taskStatus.Doing) {
                dispatch(updateTask({id: id, currentStatus: status, newStatus: taskStatus.ToDo}));
            } else if (status === taskStatus.Done) {
                dispatch(updateTask({id: id, currentStatus: status, newStatus: taskStatus.Doing}));
            }
        } else if (e.target.name === 'delete') {
            dispatch(deleteTask({id}));
        }
    }

    return (
        <div className='text-center bg-gray-800 border border-gray-700 rounded-xl my-4 p-4 max-w-80 overflow-auto'>
            <h2 className='text-white block text-xl font-medium'>{title}</h2>
            <p className='text-blue-400 block text-lg font-medium'>{points}</p>
            <div className='flex items-center justify-between'>
                <button className='text-white bg-red-600 font-bold rounded-full w-8 h-8' name='delete' onClick={clickHandler}>x</button>
                <div className='flex gap-x-3'>
                    <button className='text-white font-bold bg-blue-700 rounded-full w-8 h-8' name='move-left' onClick={clickHandler}>-</button>
                    <button className='text-white font-bold bg-blue-700 rounded-full w-8 h-8' name='move-right' onClick={clickHandler}>+</button>
                </div>
            </div>
        </div>
    )
}

Task.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    points: PropTypes.number,
    status: PropTypes.oneOf(Object.values(taskStatus)).isRequired,
}