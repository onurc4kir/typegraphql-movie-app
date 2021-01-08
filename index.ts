import 'reflect-metadata'
import * as dotenv from 'dotenv';
dotenv.config()


import * as express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from 'type-graphql';


import {ObjectIdScalar} from './src/scalars/objectId.scalar'
import {ObjectId} from 'mongodb'
import * as mongoose from 'mongoose';


//Resolvers
import {DirectorResolver} from './src/resolvers/director.resolver'
import {MovieResolver} from './src/resolvers/movie.resolver'
import {CategoryResolver} from './src/resolvers/category.resolver'


import { TypegooseMiddleware } from './src/typegoose-midlleware';

(async ()=>{

    const PORT = process.env.PORT || 3000

    await mongoose.connect(process.env.DB_URI).then(()=>{
    console.log('DB IS CONNECTED')
    });

    const schema = await buildSchema({
    resolvers:[DirectorResolver,MovieResolver,CategoryResolver,],
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
        validate: false,
    })

    const apolloServer = new ApolloServer({
    schema:schema,
    }) 

    const app = express()
    
    apolloServer.applyMiddleware({
    app
    });

    app.listen(PORT,()=>{
    console.log("Server is started at " +PORT);
    })

})()