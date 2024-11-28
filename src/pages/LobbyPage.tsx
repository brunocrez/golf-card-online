import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LobbyPlayer } from '@/components/LobbyPlayer'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useGameContext } from '@/hooks/useGameContext'
import { filterPlayer } from '@/utils/filterPlayer'
import { Routes } from '@/routes'
import { useBlockLeaving } from '@/hooks/useBlockLeaving'
import { LeavingDialog } from '@/components/LeavingDialog'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { CreateLobbyResponse, GetLobbyResponse } from '@/models/Lobby'
import { Sheet } from '@/components/Sheet'
import { useSheetContext } from '@/hooks/useSheetContext'
import { TagRules } from '@/components/TagRules'

export function LobbyPage() {
  const navigate = useNavigate()
  const { lobbyId } = useParams<{ lobbyId: string }>()
  const { lobby, setLobby } = useGameContext()
  const { openSheet, setOpenSheet } = useSheetContext()
  const { socket } = useSocketConnection()
  const { state, proceed, reset } = useBlockLeaving(lobbyId ?? '')
  const res = filterPlayer(lobby)

  const [, setOpen] = useState(false)

  const canStartGame = (lobby?.players && lobby.players.length > 1) || 0

  useEffect(() => {
    if (!lobby || !lobbyId) {
      return navigate(Routes.PRE_LOBBY)
    }

    const handleUpdatedLobby = (data: GetLobbyResponse) => {
      setLobby(data)
    }

    socket.on('updated-lobby', handleUpdatedLobby)

    socket.on('game-started', (data: CreateLobbyResponse) => {
      setLobby(data)
      navigate(`${Routes.GAME}/${data.id}`)
    })

    return () => {
      socket.off('updated-lobby', handleUpdatedLobby)
      socket.off('game-started')
    }
  }, [lobbyId, navigate, socket, lobby, setLobby])

  function handleClickStartGame() {
    socket.emit('start-game', lobby?.id)
  }

  return (
    <>
      <LeavingDialog
        open={state === 'blocked'}
        proceed={proceed}
        setOpen={setOpen}
        reset={reset}
      />

      <Sheet open={openSheet} setOpen={setOpenSheet} />

      <div className="h-screen w-full flex flex-col justify-center items-center px-5 relative">
        <TagRules />

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <h2
              className="text-sm sm:text-xl"
              style={{ fontFamily: "'Press Start 2P'" }}
            >
              sala: {lobbyId}
            </h2>
            <Button className="flex gap-2 w-fit bg-indigo-500 hover:bg-indigo-400">
              copiar código <Copy aria-hidden={true} />
            </Button>
          </div>
          <div className="flex items-center gap-4 border-b-2 border-slate-400 pb-6">
            <img
              src={res?.hostPlayer?.image}
              alt="avatar"
              className="w-24 h-24"
            />
            <div className="flex flex-col gap-2">
              <p>{res?.hostPlayer?.nickname}</p>
              <div className="bg-indigo-500 text-white p-1 text-center rounded-md w-full max-w-28">
                host
              </div>
            </div>
          </div>

          {canStartGame ? (
            <div className="flex flex-wrap gap-5">
              {res?.regularPlayers?.map((player) => (
                <LobbyPlayer
                  key={player.playerId}
                  image={player.image}
                  nickname={player.nickname}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-lg text-gray-600">
              <span>aguardando jogadores </span>
              <span className="dot ml-1"></span>
            </div>
          )}

          <div className="flex flex-col gap-3">
            <Button
              onClick={() => setOpenSheet(true)}
              className="bg-purple-600 hover:bg-purple-400 text-white font-bold text-lg p-2 md:p-6 md:text-xl"
            >
              regras básicas
            </Button>
            {socket.id === lobby?.host && (
              <Button
                className="bg-green-500 hover:bg-green-400 text-white font-bold text-lg p-2 md:p-6 md:text-xl"
                onClick={handleClickStartGame}
                disabled={!canStartGame}
              >
                iniciar jogo
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
