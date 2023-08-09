export class GenreClass {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  static deserialize(input: any): GenreClass {
    return new GenreClass(input.id, input.name);
  }
}
