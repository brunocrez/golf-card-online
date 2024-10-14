interface Images {
  svg: string
  png: string
}

export interface Card {
  code: string
  images: Images
  value: string
  suit: string
  faceUp: boolean
}
