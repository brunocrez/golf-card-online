import { useState } from 'react'
import { io, Socket } from 'socket.io-client'

let socket: Socket

export function useSocketConnection() {
  const [socketInstance] = useState<Socket>(() => {
    if (!socket) {
      socket = io('http://localhost:8080', { reconnection: false })
    }

    return socket
  })

  return { socket: socketInstance }
}
