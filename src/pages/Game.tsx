import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { PlayerBoard } from '@/components/PlayerBoard'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getCurrentPlayer } from '@/utils/getCurrentPlayer'
import { Card, DrawCardResponse } from '@/models/Card'
import { DrawDiscardPile } from '@/components/DrawDiscardPile'
import { DrawDeck } from '@/components/DrawDeck'
import { useBlockLeaving } from '@/hooks/useBlockLeaving'
import { LeavingDialog } from '@/components/LeavingDialog'
import { CalculateScore } from '@/components/CalculateScore'
import { Routes } from '@/routes'
import { Sheet } from '@/components/Sheet'
import { TagRules } from '@/components/TagRules'
import { TagScore } from '@/components/TagScore'
import { useSheetContext } from '@/hooks/useSheetContext'
import { Button } from '@/components/ui/button'

export function Game() {
  const navigate = useNavigate()
  const { socket } = useSocketConnection()
  const { openSheet, setOpenSheet } = useSheetContext()
  const {
    lobby,
    setLobby,
    isReplaceMode,
    setIsReplaceMode,
    setSuspendedCard,
    suspendedCard,
    setIsLoading,
    isLoading,
  } = useGameContext()
  const { proceed, reset, state } = useBlockLeaving(lobby?.id ?? '')
  const { currPlayer, enemies } = useMemo(() => {
    const { currPlayer, enemies } = getCurrentPlayer(
      socket,
      lobby?.players ?? [],
    )

    return { currPlayer, enemies }
  }, [socket, lobby?.players])

  const [drewFromDeck, setDrewFromDeck] = useState(false)
  const [showCalculateScore, setShowCalculateScore] = useState(false)
  const [currEnemyIndex, setCurrEnemyIndex] = useState(0)
  const [, setOpen] = useState(false)

  const isMyTurn = lobby?.currentTurn === socket.id
  const currTurn = lobby?.currentTurn === enemies[currEnemyIndex]?.playerId

  useEffect(() => {
    socket.on('updated-game', (data) => {
      setLobby(data)
      setIsReplaceMode(false)
      setSuspendedCard(undefined)
      setDrewFromDeck(false)
    })

    socket.on('finish-round', () => {
      setShowCalculateScore(true)
    })

    socket.on('proceed-to-next-round', (data) => {
      setShowCalculateScore(false)
      setLobby(data)
    })

    socket.on('end-game', (data) => {
      setShowCalculateScore(false)
      setLobby(data)
      navigate(Routes.AWARD)
    })

    socket.on('drawn-card', (data) => {
      setLobby(data)
    })

    return () => {
      socket.off('updated-game')
      socket.off('proceed-to-next-round')
      socket.off('finish-round')
      socket.off('end-game')
      socket.off('drawn-card')
    }
  }, [socket, setLobby, setIsReplaceMode, setSuspendedCard, navigate])

  // find index of current player
  useEffect(() => {
    if (!lobby || !enemies.length) {
      return
    }

    const activeIndex = enemies.findIndex(
      (enemy) => enemy.playerId === lobby.currentTurn,
    )

    if (activeIndex !== -1) {
      setCurrEnemyIndex(activeIndex)
    }
  }, [lobby, lobby?.currentTurn, enemies])

  function handleClickPile(card: Card | undefined) {
    // prevent player to enter in replace mode if it's not his turn
    if (lobby?.currentTurn !== socket.id) {
      return
    }

    // player drew a card and will discard it
    if (drewFromDeck) {
      const payload = {
        card: suspendedCard,
        playerId: socket.id,
        lobbyId: lobby?.id ?? '',
      }

      socket.emit('discard-card', payload)
      return
    }

    setIsReplaceMode(true)
    setSuspendedCard(card)
  }

  function exitReplaceMode() {
    // block player to leave replace mode if he's drawing a card from deck
    if (suspendedCard && drewFromDeck) {
      return
    }

    setIsReplaceMode(false)
    setSuspendedCard(undefined)
  }

  function handleClickDeck() {
    // prevent player to draw a card if it's not his turn OR if he already drew one
    if (lobby?.currentTurn !== socket.id || isReplaceMode) {
      return
    }

    setIsLoading(true)
    socket.emit(
      'draw-card-from-deck',
      lobby?.id,
      (response: DrawCardResponse) => {
        setIsLoading(false)

        if (response.success) {
          setIsReplaceMode(true)
          setSuspendedCard(response.card)
          setDrewFromDeck(true)
        } else {
          console.error('falha ao comprar a carta:', response.message)
        }
      },
    )
  }

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <LeavingDialog
        open={state === 'blocked'}
        proceed={proceed}
        setOpen={setOpen}
        reset={reset}
      />

      <Sheet open={openSheet} setOpen={setOpenSheet} />

      {showCalculateScore && <CalculateScore />}

      {enemies.length > 1 && (
        <>
          <Button
            onClick={() =>
              setCurrEnemyIndex(
                (prevState) =>
                  (prevState - 1 + enemies.length) % enemies.length,
              )
            }
            className="bg-transparent hover:bg-transparent p-0 absolute top-2 left-2 z-10"
          >
            <CircleArrowLeft size={24} className="text-white" />
          </Button>
          <Button
            onClick={() =>
              setCurrEnemyIndex((prevState) => (prevState + 1) % enemies.length)
            }
            className="bg-transparent hover:bg-transparent p-0 absolute top-2 right-2 z-10"
          >
            <CircleArrowRight size={24} className="text-white" />
          </Button>
        </>
      )}

      {/* Cabeçalho fixo do jogador inimigo */}
      <div
        className={`fixed top-0 left-0 w-full flex justify-center items-center gap-4 p-3 ${
          currTurn ? 'animate-pulse-green' : 'bg-slate-500'
        }`}
      >
        <img
          src={enemies[currEnemyIndex]?.image}
          className="w-8 h-8"
          alt="avatar"
        />
        <p className="text-white font-bold text-sm">
          {enemies[currEnemyIndex]?.nickname}
        </p>
      </div>

      {/* Container principal */}
      <div className="flex-grow flex items-center justify-center w-full max-w-md">
        <div
          className="w-full h-full py-4 flex flex-col justify-center items-center px-2 relative"
          onClick={exitReplaceMode}
        >
          {isReplaceMode && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-10" />
          )}

          <div
            className="flex flex-col gap-4 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <PlayerBoard
              cards={enemies[currEnemyIndex]?.cards ?? []}
              isCurrentPlayer={false}
              scoreArray={enemies[currEnemyIndex]?.score}
              scorePosition="top"
            />

            <div className="flex justify-center gap-4">
              {/* Pilha de descarte */}
              <DrawDiscardPile
                lobby={lobby}
                drewFromDeck={drewFromDeck}
                isReplaceMode={isReplaceMode}
                onClick={handleClickPile}
              />

              {/* Deck */}
              <DrawDeck isLoading={isLoading} onClick={handleClickDeck} />
            </div>

            <PlayerBoard
              cards={currPlayer.cards ?? []}
              isCurrentPlayer={true}
              scoreArray={currPlayer.score}
              scorePosition="bottom"
            />
          </div>
        </div>
      </div>

      <TagRules />
      <TagScore />

      {/* Rodapé fixo do jogador atual */}
      <div
        className={`fixed bottom-0 left-0 w-full flex justify-center items-center gap-4 p-3 ${
          isMyTurn ? 'animate-pulse-green' : 'bg-slate-500'
        }`}
      >
        <img src={currPlayer.image} className="w-8 h-8" alt="avatar" />
        <p className="text-white font-bold text-sm">{currPlayer.nickname}</p>
      </div>
    </div>
  )
}
