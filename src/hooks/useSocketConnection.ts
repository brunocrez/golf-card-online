import { useState } from 'react'
import { io, Socket } from 'socket.io-client'

const baseURL = import.meta.env.VITE_BASE_URL
let socket: Socket

export function useSocketConnection() {
  const [socketInstance] = useState<Socket>(() => {
    if (!socket) {
      socket = io(baseURL, { reconnection: false })
    }

    return socket
  })

  return { socket: socketInstance }
}
