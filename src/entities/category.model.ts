import { Field, ObjectType } from 'type-graphql';

import { prop , getModelForClass } from '@typegoose/typegoose';
import {ObjectId} from 'mongodb'
import { Movie } from './movie.model';
@ObjectType()
export class Category {
 
 @prop({required:true})
 @Field()
 readonly _id:ObjectId


 @prop({required:true})
 @Field({nullable:true})
 name:String

 @prop({type:()=>Movie,required:false,ref:"Movie"})
 @Field(()=>[Movie],{nullable:true})
 movies?:Movie[]
}
export const CategoryModel =  getModelForClass(Category);