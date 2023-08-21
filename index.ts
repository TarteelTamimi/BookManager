import express from 'express';
import bookRouter from './routers/book.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server Up!');
});

app.get('/health', (req, res) => {
    res.status(200).send('OK!!')
});

app.use('/book', bookRouter);

app.listen(PORT, () => {
    console.log(`Book manager is running and Listening on port ${PORT}`);
});
