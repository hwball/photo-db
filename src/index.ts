import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import { todoRouter } from './routes/todo';
import { photoRouter } from './routes/photo';

const app = express()
app.use(todoRouter)
app.use(photoRouter)
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect('mongodb://localhost:27017/todo', {
}).then(() => {
    // tslint:disable-next-line: no-console
    console.log("Connected to DB.")
},
(err) => {
    // tslint:disable-next-line: no-console
    console.log("ERROR. Failed to connect to DB.", err)
})

app.listen(3000, () => {
    // tslint:disable-next-line: no-console
    console.log("Server is listening on port 3000.")
})