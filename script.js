const booksContainer = document.getElementById("books-container");
const textnode = document.createTextNode('fnsj');
const submitButton = document.getElementById('submit')
const AddBookButton = document.getElementById('add-book-button')

let myLibrary = [new Book("fdsfdsf", "juancito", 1545, "Read")];

function Book(title, author, pages, status) {
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
}

Book.prototype.info = function () {
      return this.title + this.author + this.pages + this.status;
  }



function addBookToLibrary(titleInput, authorInput, pagesInput, statusInput) {
  myLibrary.push(new Book(titleInput, authorInput, pagesInput, statusInput))
}

function displayBooks(){
  const bookTitle = document.getElementById('book-title')
  const bookAuthor = document.getElementById('book-author')
  const bookPages = document.getElementById('book-pages')
  const bookStatus = document.getElementById('book-status')
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  myLibrary.forEach(function (book) {
    bookCard.innerHTML = book.info();
    console.log(book.info())
  })
  booksContainer.appendChild(bookCard);
}


submitButton.addEventListener('click', function(){
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const statusInput = document.querySelector('input[name="read-or-not-read"]:checked').value;
  addBookToLibrary(titleInput, authorInput, pagesInput, statusInput)
  displayBooks();
  /*const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  booksContainer.appendChild(bookCard);
  console.log(myLibrary)*/
})

//addBookToLibrary();
displayBooks();
//console.log(myLibrary[0].info())

