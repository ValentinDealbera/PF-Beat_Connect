export class UserClass {
  id: string;
  firstName: string;
  lastName: string;
  email: string;

  constructor(id: string, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }

  getId(): string {
    return this.id;
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

  static deserialize(input: any): UserClass {
    return new UserClass(
      input.id,
      input.firstName,
      input.lastName,
      input.email,
    );
  }
}
