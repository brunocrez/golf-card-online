import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { PreLobbyPage } from './pages/PreLobbyPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { CreateRoomPage } from './pages/CreateRoomPage.tsx'
import { PlayerContextProvider } from './contexts/PlayerContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/pre-lobby" replace />,
  },
  {
    path: '/pre-lobby',
    element: <PreLobbyPage />,
  },
  {
    path: '/create-room',
    element: <CreateRoomPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlayerContextProvider>
      <RouterProvider router={router} />
    </PlayerContextProvider>
  </StrictMode>,
)
