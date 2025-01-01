import {useDispatch, useSelector} from "react-redux";
import {fetchTasks} from "./tasksSlice.js";
import {useEffect} from "react";
import TasksList from "./TaskList.jsx";
import {taskStatus} from "./taskStatus.js";

export default function TaskPanelController() {

    const dispatch = useDispatch();

    const tasks = useSelector(state => state.tasks.tasks); // TODO FIGURE OUT MEMOIZING - ONE WAY IS TO USE DIFFERENT ARRAYS FOR EACH TASK TYPE

    useEffect(() => {
        console.log('yes');
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <div className="flex justify-evenly gap-x-6">
            <TasksList tasks={tasks.filter(task => task.status === taskStatus.ToDo)} type={taskStatus.ToDo}/>
            <TasksList tasks={tasks.filter(task => task.status === taskStatus.Doing)} type={taskStatus.Doing}/>
            <TasksList tasks={tasks.filter(task => task.status === taskStatus.Done)} type={taskStatus.Done}/>
            {/*REMEMBER these auto stretch!*/}
        </div>
    );
}