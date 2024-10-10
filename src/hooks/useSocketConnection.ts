import { io } from 'socket.io-client'

const baseURL = import.meta.env.VITE_BASE_URL

export function useSocketConnection() {
  const socket = io(baseURL, { reconnection: false })

  return { socket }
}
