export class GenreClass {
  _id: string
  name: string

  constructor(id: string, name: string) {
    this._id = id
    this.name = name
  }

  static deserialize(input: any): GenreClass {
    return new GenreClass(input._id, input.name)
  }
}
