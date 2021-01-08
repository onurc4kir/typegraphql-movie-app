import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { Director,DirectorModel } from "../entities/director.model";
import {Movie, MovieModel} from '../entities/movie.model'
import {ObjectId} from 'mongodb'
import { ObjectIdScalar } from "../scalars/objectId.scalar";

@Resolver(of => Movie)
export class MovieResolver {

  @Query(() => [Movie])
  async movies(): Promise<Movie[]> {
    return await MovieModel.find({});
  }
  
  @Query(() => Movie, { nullable: true })
  async movie(@Arg("movieId", () => ObjectIdScalar) movieId: ObjectId) {
    return MovieModel.findById(movieId);
  }

  @FieldResolver()
  async directorId(@Root() movie: Movie): Promise<Director> {
    return (await DirectorModel.findById(movie.directorId));
  }

}