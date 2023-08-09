import { BeatsClass, ReviewsClass } from "@/types";

type UserProps = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  backImage: string;
  image: string;
  softDelete: boolean;
  isSeller: boolean;
  superAdmin: boolean;
};

export class UserClass {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  bio: string;
  backImage: string;
  image: string;
  softDelete: boolean;
  isSeller: boolean;
  superAdmin: boolean;

  constructor({
    _id,
    firstName,
    lastName,
    email,
    username,
    bio,
    backImage,
    image,
    softDelete,
    isSeller,
    superAdmin,
  }: UserProps) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.username = username;
    this.bio = bio;
    this.backImage = backImage;
    this.image = image;
    this.softDelete = softDelete;
    this.isSeller = isSeller;
    this.superAdmin = superAdmin;
  }

  getId(): string {
    return this._id;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getEmail(): string {
    return this.email;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  static deserializeList(input: any[]): UserClass[] {
    let list: UserClass[] = [];
    for (let i = 0; i < input.length; i++) {
      list.push(this.deserialize(input[i]));
    }
    return list;
  }

  static deserialize(input: any): UserClass {
    return new UserClass({
      _id: input.id,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      username: input.username,
      bio: input.bio,
      backImage: input.backImage,
      image: input.image,
      softDelete: input.softDelete,
      isSeller: input.isSeller,
      superAdmin: input.superAdmin,
    });
  }
}
