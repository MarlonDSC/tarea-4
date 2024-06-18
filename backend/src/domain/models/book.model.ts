export class Book {
    constructor(
      public readonly id: string,
      public readonly title: string,
      public readonly authorId: string,
      public readonly publishedDate?: Date,
    ) {}
  }
  