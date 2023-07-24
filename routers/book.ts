import express from "express";
import Book from "../types/book.js";
import data from "../data/SampleData.js";

const router = express.Router();

router.get('/', (req: Book.Request, res: Book.Response) => {

    const page = parseInt(req.query.page || '1');
    const pageSize = parseInt(req.query.pageSize || '10');
    const filteredItems = data.slice((page - 1) * pageSize, page * pageSize);
    res.send({
        page,
        pageSize,
        total: data.length,
        items: filteredItems
    });
});

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = data.find(it => it.id === id);
    if (task) {
        res.status(200).send(task);
    } else {
        res.status(404).send("Task not found");
    }
});

router.post('/', (req: Book.Request, res: Book.Response) => {
    const newBook: Book.Item = {
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        publicationYear: req.body.publicationYear
    };

    data.unshift(newBook);
    res.status(201).send('Task Created');
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        data[i] = { ...data[i], ...req.body };
        res.send("Success update student!");
        return;
      }
    }
    res.send("Failed update student!");
  });

// router.delete('/:id', (req, res) => {
//     const id = parseInt(req.params.id);

//     const arr: Book.Item[] = data.filter(book => {
//         return book.id !== id;
//     });
//     console.log('Book deleted')
//     res.send(arr);
// });

router.delete('/', (req, res) => {
    if (!req.query?.id) {
      res.send('Error: Please send student ID in query params!');
      return;
    } else {
      const id = parseInt(req.query.id.toString());
  
      let found = data.findIndex((book) => book.id === id);
      if (found >= 0) {
        data.splice(found, 1);
        res.send("Success Delete Student!");
        return;
      } else {
        res.send("Error: Student Not found!");
      }
    }
  });

export default router;