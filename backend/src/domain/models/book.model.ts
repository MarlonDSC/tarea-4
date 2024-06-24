export class Book {
  constructor(
    public id: number,
    public title: string,
    public authorId: string,
    public publishedDate?: Date,
  ) {}
}
