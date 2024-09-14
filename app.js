import express from 'express';
import { createNote, getNote, getNotes } from './db.js';

const app = express();
//json body will be parsed into req.body 
app.use(express.json());

app.get("/notes", async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
})

app.get("/notes/:id", async (req, res) => {
    const id = req.params.id;
    const note = await getNote(id);
    res.send(note);
})

app.post("/notes", async (req, res) => {
    const { title, contents } = req.body;
    const note = await createNote(title, contents);
    res.status(201).send(note);
})

//this middleware is good for error handling 
//while connecting to the server
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(8080, () => {
    console.log('Server is running on port 8080');
})