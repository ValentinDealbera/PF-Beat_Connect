import { type GenreClass, type UserClass, type ReviewsClass } from '@/interfaces'

interface BeatsProps {
  _id: string
  audioMP3: string
  audioWAV: string
  relevance: number
  BPM: number
  name: string
  image: string
  priceAmount: number
  genre: GenreClass
  review: ReviewsClass[]
  softDelete: boolean
  userCreator: UserClass
}

export class BeatsClass {
  _id: string
  audioMP3: string
  audioWAV: string
  relevance: number
  BPM: number
  name: string
  image: string
  priceAmount: number
  genre: GenreClass
  review: ReviewsClass[]
  softDelete: boolean
  userCreator: UserClass

  constructor({
    _id,
    audioMP3,
    audioWAV,
    relevance,
    BPM,
    name,
    image,
    priceAmount,
    genre,
    review,
    softDelete,
    userCreator
  }: BeatsProps) {
    this._id = _id
    this.audioMP3 = audioMP3
    this.audioWAV = audioWAV
    this.relevance = relevance
    this.BPM = BPM
    this.name = name
    this.image = image
    this.priceAmount = priceAmount
    this.genre = genre
    this.review = review
    this.softDelete = softDelete
    this.userCreator = userCreator
  }

  static deserialize(input: any): BeatsClass {
    return new BeatsClass({
      _id: input.id,
      audioMP3: input.audioMP3,
      audioWAV: input.audioWAV,
      relevance: input.relevance,
      BPM: input.BPM,
      name: input.name,
      image: input.image,
      priceAmount: input.priceAmount,
      genre: input.genre,
      review: input.review,
      softDelete: input.softDelete,
      userCreator: input.userCreator
    })
  }

  static deserializeList(input: any[]): BeatsClass[] {
    const list: BeatsClass[] = []
    for (let i = 0; i < input.length; i++) {
      list.push(this.deserialize(input[i]))
    }
    return list
  }

  getName(): string {
    return this.name
  }

  getAudioMP3(): string {
    return this.audioMP3
  }

  getAudioWAV(): string {
    return this.audioWAV
  }

  getRelevance(): number {
    return this.relevance
  }

  getBPM(): number {
    return this.BPM
  }

  getImage(): string {
    return this.image
  }

  getPriceAmount(): number {
    return this.priceAmount
  }

  getGenre(): GenreClass {
    return this.genre
  }

  getReviews(): ReviewsClass[] {
    return this.review
  }

  getSoftDelete(): boolean {
    return this.softDelete
  }

  getUserCreator(): UserClass {
    return this.userCreator
  }
}
