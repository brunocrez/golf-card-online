import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { PreLobbyPage } from './pages/PreLobbyPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { LobbyPage } from './pages/LobbyPage.tsx'
import { PlayerContextProvider } from './contexts/PlayerContext.tsx'
import { MatchRoom } from './pages/MatchRoom.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GameContextProvider } from './contexts/GameContext.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { Game } from './pages/Game.tsx'
import { AwardPage } from './pages/AwardPage.tsx'

const client = new QueryClient()

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
    path: '/game/:lobbyId',
    element: <Game />,
  },
  {
    path: '/award',
    element: <AwardPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    <QueryClientProvider client={client}>
      <GameContextProvider>
        <PlayerContextProvider>
          <RouterProvider router={router} />
        </PlayerContextProvider>
      </GameContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
