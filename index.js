require("dotenv").config();
// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");
//models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publications");

//microservices implementation
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/publication");

// Initializing express
const shapeAI = express();

// Configurations
shapeAI.use(express.json());

console.log(process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established!!!!!!!"));

shapeAI.use("/book", Books);
shapeAI.use("/author", Authors);
shapeAI.use("/publications", Publications);

// publication new

shapeAI.post("/publication/new", async (req, res) => {
  const { newPublication } = req.body;

  const addNewPublication = PublicationModel.create(newPublication);
  return res.json({
    publications: database.publications,
    message: "new publication is assigned!",
  });
});

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
shapeAI.put("/publication/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/
shapeAI.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );

  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
shapeAI.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

  // update the author database
  database.authors.forEach((author) => {
    if (author.id === parseInt(req.params.authorId)) {
      const newBooksList = author.books.filter(
        (book) => book !== req.params.isbn
      );

      author.books = newBooksList;
      return;
    }
  });

  return res.json({
    message: "author was deleted!!!!!!😪",
    book: database.books,
    author: database.authors,
  });
});

/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
shapeAI.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});

shapeAI.listen(3400, () => console.log("Server running!!😎"));

// Talk to mongodb in which mongodb understands => ******
// talk to us in the way we understand => JavaScript

// mongoose
