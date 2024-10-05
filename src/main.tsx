import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { PreLobbyPage } from './pages/PreLobbyPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { LobbyPage } from './pages/LobbyPage.tsx'
import { PlayerContextProvider } from './contexts/PlayerContext.tsx'
import { MatchRoom } from './pages/MatchRoom.tsx'

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
    path: '/lobby/:lobbyId',
    element: <LobbyPage />,
  },
  {
    path: '/match-room/:lobbyId',
    element: <MatchRoom />,
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
