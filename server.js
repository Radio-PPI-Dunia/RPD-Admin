import express from "express";
import path from "path";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import {makeExcuteableSchema} from "graphql-tools";
import webpack from "webpack";
import webpackMiddleware from "webpack-dev-middleware";
import webpackConfig from "./webpack.config";

// TODO: Import a model and & schema here!!

require('dotenv').config();

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configuration mongoose to database
// TODO: create MLab URI
const MONGO_URI = '';
if (!MONGO_URI) {
    throw new Error('please provide your URI')
}
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection()
    .once('open', () => console.log("Connected to database"))
    .on('error', error => console.log(error));

// GraphQL Config
// TODO: Define a schema and resolvers
const schema = makeExcuteableSchema({
    typeDefs,
    resolvers
});

// Webpack config
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));

// Routes to React
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'))
});

// Routes to GraphiQL
app.use('/graphql', graphiqlExpress({
    schema,
    context: '', // define a model here!

    // Option
    tracing: true,
    cacheControl: true
}));

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}));

app.listen(3030, () => {
    console.log("App is running on 3030")
});