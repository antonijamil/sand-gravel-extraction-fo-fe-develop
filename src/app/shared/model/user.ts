export class User {
  public id: number;
  public name: string;
  public role: Role;

  constructor(id: number, name: string, role: Role) {
    this.id = id;
    this.name = name;
    this.role = role;
  }
}

export enum Role {
  Captain = 0,
  ConcessionHolder = 1
}
