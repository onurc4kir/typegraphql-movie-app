import { Field, ObjectType } from 'type-graphql';
import { prop , getModelForClass, Ref, getName } from '@typegoose/typegoose';
import {ObjectId} from 'mongodb';
import { ObjectIdScalar } from '../scalars/objectId.scalar';
import {Director} from './director.model'
import { Category } from './category.model';
@ObjectType()
export class Movie {
 @prop({required:true})
 @Field(()=>ObjectIdScalar)
 readonly _id:ObjectId
  
  @prop({required:true})
  @Field()
  title:String
  
  @prop({required:false})
  @Field({nullable:true})
  desc?:String




  @Field(()=>Category,{nullable:true})
  @prop({type:()=>Category,required:false,ref:Category})
  categoryId:Ref<Category>;

  @Field(() => Director,{nullable:true})
  @prop({ type:()=>Director, required: false ,ref:'Director'})
  directorId: Ref<Director>;

}
export const MovieModel =  getModelForClass(Movie);