import { Resolver,Query, Arg, FieldResolver, Root } from "type-graphql";
import { Category ,CategoryModel} from "../entities/category.model";
import {ObjectId} from 'mongodb';
import { ObjectIdScalar } from "../scalars/objectId.scalar";
import { Movie, MovieModel } from "../entities/movie.model";
@Resolver(()=>Category)
export class CategoryResolver {

 @Query(()=>[Category])
 async categories(@Arg("filter",{nullable:true}) filter: string ):Promise<Category[]>{
  const query = JSON.parse(filter)
  console.log(query)
  return await CategoryModel.find(query);
 }
 
 @Query(()=>Category)
 async category(@Arg("categoryId",()=>ObjectIdScalar) categoryId : ObjectId ){
  return await CategoryModel.findById(categoryId)
 }


 @FieldResolver()
 async movies (@Root() category:Category):Promise<Movie[]>{
  return await MovieModel.find({categoryId:category._id})
 }

}
