const booksContainer = document.getElementById("books-container");
const textnode = document.createTextNode('fnsj');
const submitButton = document.getElementById('submit')
const addBookButton = document.getElementById('add-book-button')
const formContainer = document.getElementById('form-container')
const readButton = document.createElement('button')

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  get info() {
    return this.info();
  }
  
  info() {
    return this.title + "<br/>Author: " + this.author + "<br/>Pages: " + this.pages;
  }
}
let myLibrary = [new Book("Pride and Prejudice", "Jane Austen", 384, "Read")];

function addBookToLibrary(titleInput, authorInput, pagesInput, statusInput) {
  myLibrary.push(new Book(titleInput, authorInput, pagesInput, statusInput))
}

function displayBooks(){
  const bookCard = document.createElement('div');
  const readButton = document.createElement('button')
  const removeButton = document.createElement('button')
  
  bookCard.classList.add('book-card');

  myLibrary.forEach(function (book) {
    bookCard.innerHTML = book.info();
    bookCard.appendChild(readButton)
    readButton.innerHTML = "Status: " + book.status;
    readButton.classList.add('status-button')
    readButton.addEventListener('click', function(){
      if(book.status === "Read") {
        book.status = "Not read";
        readButton.innerHTML = "Status: " + book.status;

      } else if (book.status === "Not read"){
        book.status = "Read";
        readButton.innerHTML ="Status: " + book.status;

      }
  })

    })
  
  
  booksContainer.appendChild(bookCard);
  
  const books = booksContainer.querySelectorAll('.book-card');
  console.log(books)

  books.forEach(function (book) {
    book.appendChild(removeButton)
    removeButton.innerHTML = '❌'
    removeButton.classList.add('remove-button')
    removeButton.addEventListener('click', function(){
    this.parentNode.remove();
    })
  })

  
}



submitButton.addEventListener('click', function(){
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const statusInput = document.querySelector('input[name="read-or-not-read"]:checked').value;
  addBookToLibrary(titleInput, authorInput, pagesInput, statusInput)
  displayBooks();
  formContainer.classList.remove('show')
  
})

addBookButton.addEventListener('click', function(){
  formContainer.classList.add('show')
})
console.log(myLibrary)
displayBooks();
