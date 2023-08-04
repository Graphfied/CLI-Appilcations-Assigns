/* A class named Human with a constructor that takes 5 parameters, all of which are private and required
properties of the class. */
export class Human {
  constructor(
    protected name: string,
    protected age: number,
    protected userName: string,
    protected password: string,
    protected role: string
  ) {}
}
