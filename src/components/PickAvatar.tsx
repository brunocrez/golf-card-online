import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { usePlayerContext } from '@/hooks/usePlayerContext'

export function PickAvatar() {
  const { avatars, currIndex, setCurrIndex, nickname, setNickname, error } =
    usePlayerContext()

  const handleClickArrowLeft = () => {
    if (currIndex > 0) {
      setCurrIndex((prev) => prev - 1)
    }
  }

  const handleClickArrowRight = () => {
    if (currIndex < avatars.length - 1) {
      setCurrIndex((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h2
        className="text-center md:text-xl"
        style={{ fontFamily: "'Press Start 2P'" }}
      >
        escolha seu avatar
      </h2>
      <div className="flex gap-4 items-center justify-center">
        <Button
          onClick={handleClickArrowLeft}
          className="bg-transparent hover:bg-transparent p-0"
        >
          <CircleArrowLeft
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="var(--light-pink)"
          />
        </Button>

        <img
          src={avatars[currIndex]}
          alt="avatar"
          className="w-36 h-36 md:w-full md:h-full"
        />

        <Button
          onClick={handleClickArrowRight}
          className="bg-transparent hover:bg-transparent p-0"
        >
          <CircleArrowRight
            size={48}
            className="hover:cursor-pointer hover:scale-105"
            color="var(--light-pink)"
          />
        </Button>
      </div>

      <Input
        placeholder="digite o seu apelido"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        maxLength={12}
        className={`${error ? 'border border-red-500' : ''}`}
      />

      {error ? (
        <span className="text-red-500 text-sm mt-[-20px]">{error}</span>
      ) : null}
    </div>
  )
}
