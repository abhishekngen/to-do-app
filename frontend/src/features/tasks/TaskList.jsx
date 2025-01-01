import PropTypes from "prop-types";
import {taskStatus} from "./taskStatus.js";
import Task from "./Task.jsx";
import {memo} from "react";

function TasksList({tasks, type}) {

    let taskListTitle;
    switch (type) {
        case taskStatus.ToDo:
            taskListTitle = 'To Do';
            break;
        case taskStatus.Doing:
            taskListTitle = 'Doing';
            break;
        case taskStatus.Done:
            taskListTitle = 'Done';
            break;
        default:
            throw new Error('Incorrect Task List Status');
    }

    return (
        <div className="inline-flex flex-col bg-purple-700 px-5 pb-3 pt-1 min-w-80 rounded-xl text-center">
            <h1>{taskListTitle}</h1>
            <ul>
                {
                    tasks.map((task) => {
                        return <Task key={task.id} id={task.id} title={task.title} points={task.points} status={type} />
                    })
                }
            </ul>
        </div>
    );
}

TasksList.propTypes = {
    tasks: PropTypes.array.isRequired,
    type: PropTypes.oneOf(Object.values(taskStatus)),
}

export default memo(TasksList);