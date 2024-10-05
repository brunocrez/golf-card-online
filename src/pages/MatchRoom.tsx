import { PickAvatar } from '@/components/PickAvatar'
import { Button } from '@/components/ui/button'
import { usePickAvatar } from '@/hooks/usePickAvatar'
import { Trophy, User } from 'lucide-react'

export function MatchRoom() {
  const props = usePickAvatar()

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-12">
          <section>
            <PickAvatar {...props} />
          </section>
          <section className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <Trophy size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Pontos</p>
                <p className="text-slate-600">0/50</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-32 h-32 rounded-full p-2 border-2 border-slate-300 flex justify-center items-center">
                <User size={64} color="#64748b" />
              </div>
              <div>
                <p className="text-slate-500 font-bold">Jogadores</p>
                <p className="text-slate-600">2/6</p>
              </div>
            </div>
          </section>
        </div>
        <Button className="py-6 bg-indigo-500 text-white font-bold hover:bg-indigo-400">
          entrar na sala
        </Button>
      </div>
    </div>
  )
}
