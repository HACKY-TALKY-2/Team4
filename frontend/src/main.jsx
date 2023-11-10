import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Game from './page/game.jsx';
import Leaderboard from './page/leaderboard.jsx';
import Main from './page/home.jsx';
import Help from './page/help.jsx'; 

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
        path: "/game",
        element: <Game />,
    },
    {
        path: "/leaderboard",
        element: <Leaderboard />,
    }
    ,
    {
      path:"/help",
      element:<Help/>,
    }
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
