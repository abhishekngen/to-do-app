import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (args, {rejectWithValue}) =>
{
    try {
        const response = await fetch(backend_url + '/tasks');
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const tasks = await response.json();

        if (!tasks) {
            throw new Error("Undefined tasks");
        }
        return tasks;
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const addTask = createAsyncThunk('tasks/addTask', async (args, {rejectWithValue}) =>
{
    try {
        const response = await fetch(backend_url + '/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: args.title,
                points: args.points,
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (args, {rejectWithValue}) =>
{
    try {
        console.log(JSON.stringify({
            id: args.id,
            currentStatus: args.currentStatus,
            newStatus: args.newStatus,
        }));
        const response = await fetch(backend_url + '/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: args.id,
                currentStatus: args.currentStatus,
                newStatus: args.newStatus,
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (args, {rejectWithValue}) =>
{
    try {
        const response = await fetch(backend_url + '/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: args.id,
            })
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
});

const initialState = {
    tasks: [],
    isLoading: false,
    error: false,
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTaskOptimistic: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTaskOptimistic: (state, action) => {
            state.tasks.splice(state.tasks.findIndex(task => task.id === action.payload), 1);
        },
        updateTaskOptimistic: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            task !== undefined ? task.status = action.payload.newStatus : null;
        }
    },
    extraReducers: (builder) => { //Have to go back to builders TODO
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload;
                state.isLoading = false;
                state.error = false;
            })
            .addCase(fetchTasks.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(addTask.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
                state.isLoading = false;
                state.error = false;
            })
            .addCase(addTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(updateTask.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                const task = state.tasks.find(task => task.id === action.payload.id);
                if (task) {
                    task.status = action.payload.status;
                }
            })
            .addCase(updateTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
            .addCase(deleteTask.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                const index = state.tasks.findIndex(task => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks.splice(index, 1);
                }
            })
            .addCase(deleteTask.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            });
    }
})

export const { addTaskOptimistic, updateTaskOptimistic, deleteTaskOptimistic } = tasksSlice.actions;
export default tasksSlice.reducer;