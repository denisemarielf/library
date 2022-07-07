export default function formValidation() {
    const titleField = document.getElementById("title");
    const authorField = document.getElementById("author");
    const pagesField = document.getElementById("pages");
    const statusField = document.querySelector('input[name="read-or-not-read"]');
    const errorContainer = document.getElementById("error-message");
    const validity = {
      title: false,
      author: false,
      pages: false,
      status: false,
    }
  
    if (titleField.checkValidity()) {
      titleField.style.borderBlockColor = "green";
      validity.title = true;
    } else {
      titleField.style.borderBlockColor = "red";
      validity.title = false;
    }
  
    if (authorField.checkValidity()) {
      authorField.style.borderBlockColor = "green";
      validity.author = true;
    } else {
      authorField.style.borderBlockColor = "red";
      validity.author = false;
    }
  
    if (pagesField.checkValidity()) {
      pagesField.style.borderBlockColor = "green";
      validity.pages = true;
    } else {
      pagesField.style.borderBlockColor = "red";
      validity.pages = false;
    }
  
    if (!statusField.checkValidity()) {
      errorContainer.innerHTML = "Please choose an option";
      validity.status = false;
    } else {
      errorContainer.innerHTML = "";
      validity.status = true;
    }
  
    return Object.values(validity).every(
      value => value === true
    );
  }