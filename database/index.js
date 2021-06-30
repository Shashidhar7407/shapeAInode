const books = [
  {
    ISBN: "123405",
    title: "getting start with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["friction", "programming", "webdev"],
    publication: [1],
  },
  {
    ISBN: "1234056",
    title: "getting start with python",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["friction", "programming", "webdev"],
    publication: 1,
  },
];

const authors = [
  {
    id: 1,
    name: "pavan",
    books: ["123405"],
  },
  {
    id: 2,
    name: "shashi",
    books: ["123405"],
  },
];

const publications = [
  {
    id: 1,
    name: "shashi",
    books: ["123405"],
  },
];
module.exports = { books, authors, publications };
