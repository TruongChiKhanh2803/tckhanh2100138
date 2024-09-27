
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Login from '../demo/Login'; 
import Car from '../demo/Car'; 
import Hello from '../demo/Hello'; 

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/car",
        element: <Car />
    },
    {
        path: "/hello",
        element: <Hello />
    },
    {
        path: "*",
        element: (
            <div>
                <img src="/img/404.jpg" alt="Không tìm thấy trang" style={{ maxWidth: '65%', height: 'auto' }} />
            </div>
        )
    }
]);
