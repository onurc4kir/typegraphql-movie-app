import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { Director,DirectorModel } from "../entities/director.model";
import {Movie, MovieModel} from '../entities/movie.model'
import {ObjectId} from 'mongodb'
import { ObjectIdScalar } from "../scalars/objectId.scalar";


@Resolver(() => Director)
export class DirectorResolver {

  @Query(() => [Director])
  async directors(): Promise<Director[]> {
    return await DirectorModel.find({});
  }
  
  @Query(() => Director, { nullable: true })
  async director(@Arg("directorId", () => ObjectIdScalar) directorId: ObjectId) {
    return DirectorModel.findById(directorId);
  }

  @FieldResolver()
  async movies(@Root() director: Director): Promise<Movie[]> {
    
    return (await MovieModel.find({directorId :director._id}));
  }
}