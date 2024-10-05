import { Button } from '@/components/ui/button'
import { Routes } from '@/routes'
import { useNavigate } from 'react-router-dom'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <p
        className="text-6xl md:text-9xl text-red-500"
        style={{ fontFamily: "'Press Start 2P'" }}
      >
        404
      </p>
      <p className="text-xl md:text-2xl text-center mt-6 text-gray-500">
        Parece que você encontrou uma página secreta, mas ela não existe!
      </p>
      <Button
        className="mt-8 bg-red-500 hover:bg-red-500 hover:scale-105 text-white font-bold"
        onClick={() => navigate(Routes.HOME)}
      >
        voltar para página inicial
      </Button>
    </div>
  )
}
