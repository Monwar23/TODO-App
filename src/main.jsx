import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home';
import Root from './Root/Root';
import AddEmployee from './pages/AddEmployee';
import ErrorPage from './pages/ErrorPage';
import Tasks from './pages/Tasks';
import AssignTasks from './pages/AssignTasks';
import LeaveList from './pages/LeaveList';
import AddLeave from './pages/AddLeave';
import { LeaveProvider } from './context/LeaveContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/addEmployee',
        element: <AddEmployee></AddEmployee>
      },
      {
        path: '/addEmployee/:id',
        element: <AddEmployee></AddEmployee>
      },
      {
        path: '/tasks',
        element: <Tasks></Tasks>
      },
      {
        path: '/assignTasks',
        element: <AssignTasks></AssignTasks>
      },
      {
        path: '/assignTasks/:id',
        element: <AssignTasks></AssignTasks>
      },
      {
        path: '/leaves',
        element: <LeaveList></LeaveList>
      },
      {
        path: '/addLeaves',
        element: <AddLeave></AddLeave>
      },
      {
        path: '/addLeaves/:id',
        element: <AddLeave></AddLeave>
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeaveProvider>
      <RouterProvider router={router} />
    </LeaveProvider>
  </StrictMode>,
)
