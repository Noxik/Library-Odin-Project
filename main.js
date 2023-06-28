let library = document.getElementById("library");
let newBookInLibrary = document.createElement("div");
let titleInput = document.getElementById("title")
let authorInput = document.getElementById("author")
let pagesInput = document.getElementById("pages")
let myForm = document.querySelector("#myForm");
let readInput = document.getElementsByName("read")


let myLibrary = [];
let validation
let checkIfNewBook
let isRead

let addBookBtn = document.getElementById("addBook")
addBookBtn.addEventListener("click", () => {
    myForm.style.display = "block"
})

/* Form closing after button X click */
document.getElementById("formCloseBtn").addEventListener("click", () => {
    myForm.style.display = "none";
    clearInputs()
})

/* ACTION AFTER SUBMIT FORM */
document.getElementById("submit").addEventListener("click", () => {
  
inputsValidation();

if (validation) {
read();
addBookToLibrary();
addBooksToDiv();
clearInputs();      

}});

/* FUNCTIONS */
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
    }
}

function addBookToLibrary() {
    myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, isRead))
   };

function addBooksToDiv() {
    library.textContent = "";
    myLibrary.forEach(book => {
        let div = document.createElement("div");
        let title = document.createElement("p");
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("p");
        let x = document.createElement("button");
        title.textContent = book.title;
        author.textContent = "by " + book.author;
        pages.textContent = book.pages + " pages";
        
        if (book.read === "yes") {
        read.textContent = "Read already! :)"
        } else {
            read.textContent = "not read :("
        }
// above replace: read.textContent = "Read?  " + book.read;
        
        x.textContent = "X";
        x.classList.add("delBtn");
        x.setAttribute('id', (`${book.title}_${book.author}_${book.pages}`));
        div.append(title, author, pages, read, x);
        library.appendChild(div);
        /* adding id to a delete button for easier solution */
        document.getElementById(`${book.title}_${book.author}_${book.pages}`).addEventListener("click", deleteBtn)   
    })
    }

/* when input pages is active we check if book is already in myLibrary (title/author) */
pagesInput.onfocus = function() {
    let isBookInLibraryTitle = myLibrary.some(inputBook => inputBook.title == document.getElementById("title").value && inputBook.author == document.getElementById("author").value);
//    let isBookInLibraryAuthor = myLibrary.some(inputBook => );
    if (isBookInLibraryTitle) {
        alert("This book is already in your library!!");
        titleInput.value = "";
        authorInput.value = "";
    } 
    }

function inputsValidation() {
        if (titleInput.value == "") {
            console.log("fill title input")} 
        else if (authorInput.value == "") {
            console.log("fill author input")
        }
        else if (pagesInput.value == "") {
            console.log("fill pages input")
        }
        else if (readInput[0].checked === false && readInput[1].checked === false) {
            console.log("fill read input")
        } else {
            validation = true;
        }
    }

function clearInputs() {
    myForm.style.display = "none";    //modal hide
    isRead = undefined;
    validation = false;
    let allInputs = document.querySelectorAll("input");
        for (let i=0; i<allInputs.length; i++) {
            allInputs[i].value = "";
            readInput[i].checked = false;
            }         
    }
    
function read() {
        for (let i=0; i<readInput.length; i++) {
         if (readInput[i].checked) {
            isRead = readInput[i].value}
                }
    }

function deleteBtn() {
    // here we remove div after click "X" button
        this.parentNode.remove();

    // here we take first word from our button id to compare with library titles
    let titleFromId = (this.id).split('_');

    // here we try to find title in myLibrary array  equal to id delete button
    const indexObject = myLibrary.findIndex(key => {
            return key.title === titleFromId[0]
            });
   
    // we delete that index from array myLibrary      
        myLibrary.splice(indexObject, 1);
        console.log(myLibrary)
    }