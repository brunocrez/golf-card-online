import { createAvatar } from '@dicebear/core'
import { adventurerNeutral } from '@dicebear/collection'

export function generateAvatars(variations = 10) {
  const seeds = ['Caleb', 'Jameson', 'Sophia', 'Jack', 'Jocelyn', 'Destiny']
  const avatars = []

  for (let i = 0; i < variations; i++) {
    const index = Math.floor(Math.random() * 6)
    const avatar = createAvatar(adventurerNeutral, {
      seed: `${seeds[index]}-${i}`,
      size: 250,
      radius: 50,
    })

    const avatarBase64 = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(avatar.toString())),
    )}`

    avatars.push(avatarBase64)
  }

  return avatars
}
