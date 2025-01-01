import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import TasksPage from "./pages/TasksPage.jsx";
import AddTaskPage from "./pages/AddTaskPage.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<TasksPage />}></Route>
        <Route path='/add-task' element={<AddTaskPage />}></Route>
    </>
))

function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App;
