import { Field, ObjectType,ID } from 'type-graphql';
import { ObjectId } from "mongodb";
import { prop , getModelForClass } from '@typegoose/typegoose';
import { ObjectIdScalar } from '../scalars/objectId.scalar';
import { Movie } from './movie.model';
@ObjectType()
export class Director {
@prop({required:true})
@Field(()=>ObjectIdScalar)
readonly _id:ObjectId

 @prop({required:false})
 @Field({nullable:true})
 name:String
 
 @prop({required:false})
 @Field({nullable:true})
 birthday?:String
 
 @prop({type:()=>Movie,required:false,ref:Movie})
 @Field(()=>[Movie] ,{nullable:true})
 movies?: Movie[]

}
export const DirectorModel =  getModelForClass(Director);