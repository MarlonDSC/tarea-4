import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookRepository } from '../../domain/repositories/book.repository.interface';
import { Book } from '../../domain/models/book.model';
import { Book as BookDocument } from '../../infrastructure/databases/schemas/book.schema';

@Injectable()
export class BookRepositoryImpl implements BookRepository {
  constructor(@InjectModel(BookDocument.name) private bookModel: Model<BookDocument>) {}

  private toDomain(bookDocument: BookDocument): Book {
    return new Book(
      bookDocument._id.toString(),
      bookDocument.title,
      bookDocument.authorId,
      bookDocument.publishedDate,
    );
  }

  async create(book: Book): Promise<Book> {
    const newBook = new this.bookModel({
      title: book.title,
      authorId: book.authorId,
      publishedDate: book.publishedDate,
    });
    const savedBook = await newBook.save();
    return this.toDomain(savedBook);
  }

  async findAll(): Promise<Book[]> {
    const bookDocuments = await this.bookModel.find().exec();
    return bookDocuments.map(this.toDomain);
  }

  async findOne(id: string): Promise<Book> {
    const bookDocument = await this.bookModel.findById(id).exec();
    return bookDocument ? this.toDomain(bookDocument) : null;
  }

  async update(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      {
        title: book.title,
        authorId: book.authorId,
        publishedDate: book.publishedDate,
      },
      { new: true }
    ).exec();
    return updatedBook ? this.toDomain(updatedBook) : null;
  }

  async delete(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    return deletedBook ? this.toDomain(deletedBook) : null;
  }
}
