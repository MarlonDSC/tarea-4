import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorRepository } from '../../domain/repositories/author.repository.interface';
import { Author } from '../../domain/models/author.model';
import { Author as AuthorDocument } from '../../infrastructure/databases/schemas/author.schema';

@Injectable()
export class AuthorRepositoryImpl implements AuthorRepository {
  constructor(@InjectModel(AuthorDocument.name) private authorModel: Model<AuthorDocument>) {}

  private toDomain(authorDocument: AuthorDocument): Author {
    return new Author(
      authorDocument._id.toString(),
      authorDocument.name,
      authorDocument.bio,
    );
  }

  async create(author: Author): Promise<Author> {
    const newAuthor = new this.authorModel({
      name: author.name,
      bio: author.bio,
    });
    const savedAuthor = await newAuthor.save();
    return this.toDomain(savedAuthor);
  }

  async findAll(): Promise<Author[]> {
    const authorDocuments = await this.authorModel.find().exec();
    return authorDocuments.map(this.toDomain);
  }

  async findOne(id: string): Promise<Author> {
    const authorDocument = await this.authorModel.findById(id).exec();
    return authorDocument ? this.toDomain(authorDocument) : null;
  }

  async update(id: string, author: Author): Promise<Author> {
    const updatedAuthor = await this.authorModel.findByIdAndUpdate(
      id,
      {
        name: author.name,
        bio: author.bio,
      },
      { new: true }
    ).exec();
    return updatedAuthor ? this.toDomain(updatedAuthor) : null;
  }

  async delete(id: string): Promise<Author> {
    const deletedAuthor = await this.authorModel.findByIdAndDelete(id).exec();
    return deletedAuthor ? this.toDomain(deletedAuthor) : null;
  }
}
