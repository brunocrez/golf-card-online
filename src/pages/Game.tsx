import { useEffect, useState } from 'react'
import { LobbyPlayer } from '@/components/LobbyPlayer'
import { PlayerBoard } from '@/components/PlayerBoard'
import { useGameContext } from '@/hooks/useGameContext'
import { useSocketConnection } from '@/hooks/useSocketConnection'
import { getCurrentPlayer } from '@/utils/getCurrentPlayer'
import { Card, DrawCardResponse } from '@/models/Card'
import { DrawDiscardPile } from '@/components/DrawDiscardPile'
import { DrawDeck } from '@/components/DrawDeck'
import { ScoreBoard } from '@/components/ScoreBoard'
import { ColumnScore } from '@/components/ColumnScore'
import { useBlockLeaving } from '@/hooks/useBlockLeaving'
import { LeavingDialog } from '@/components/LeavingDialog'

export function Game() {
  const { socket } = useSocketConnection()
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
  const { currPlayer, enemy } = getCurrentPlayer(socket, lobby?.players ?? [])

  const [drewFromDeck, setDrewFromDeck] = useState(false)
  const [, setOpen] = useState(false)

  useEffect(() => {
    socket.on('updated-game', (data) => {
      setLobby(data)
      setIsReplaceMode(false)
      setSuspendedCard(undefined)
      setDrewFromDeck(false)
    })

    return () => {
      socket.off('updated-game')
    }
  }, [socket, setLobby, setIsReplaceMode, setSuspendedCard])

  function handleClickPile(card: Card | undefined) {
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
    <>
      <LeavingDialog
        open={state === 'blocked'}
        proceed={proceed}
        setOpen={setOpen}
        reset={reset}
      />

      <ScoreBoard lobby={lobby} />
      <div
        className="w-full h-full py-4 flex justify-center items-center px-2"
        onClick={exitReplaceMode}
      >
        {isReplaceMode && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 z-10" />
        )}

        <div
          className="flex flex-col gap-4 relative z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <LobbyPlayer
            nickname={enemy.nickname}
            image={enemy.image}
            width={10}
            height={10}
          />
          <ColumnScore scoreArray={enemy.score} />
          <PlayerBoard cards={enemy.cards ?? []} isCurrentPlayer={false} />

          <div className="flex justify-center gap-4">
            {/* Pilha de descarte */}
            <DrawDiscardPile
              lobby={lobby}
              drewFromDeck={drewFromDeck}
              isReplaceMode={isReplaceMode}
              onClick={handleClickPile}
            />

            {/* Deck */}
            <DrawDeck
              drewFromDeck={drewFromDeck}
              isLoading={isLoading}
              onClick={handleClickDeck}
              suspendedCard={suspendedCard}
            />
          </div>

          <PlayerBoard cards={currPlayer.cards ?? []} isCurrentPlayer={true} />
          <ColumnScore scoreArray={currPlayer.score} />
          <LobbyPlayer
            nickname={currPlayer.nickname}
            image={currPlayer.image}
            width={10}
            height={10}
          />
        </div>
      </div>
    </>
  )
}
