let library = document.getElementById("library");
let newBookInLibrary = document.createElement("div");
let titleInput = document.getElementById("title")
let authorInput = document.getElementById("author")
let pagesInput = document.getElementById("pages")
let readInput = document.getElementById("read")

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
    }
}

let validation
let checkIfNewBook
/* ACTION AFTER SUBMIT FORM */
document.getElementById("submit").addEventListener("click", () => {

// bookTitleValidation();    
inputsValidation();

if (validation) {
addBookToLibrary();
addBooksToDiv()

let allInputs = document.querySelectorAll("input");
    for (let i=0; i<allInputs.length; i++) {
        allInputs[i].value = "";
        }
validation = false        
}});

/* FUNCTIONS */
function addBookToLibrary() {
    myLibrary.push(new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value))
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
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;
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
        alert("this book is already in your library! Change title");
        document.getElementById("submit").disabled = true;
        titleInput.value = "";
        authorInput.value = "";
       
    } else {
        document.getElementById("submit").disabled = false;
    }
}

function inputsValidation() {
        if (titleInput.value == "") {
            alert("fill title input")} 
        else if (authorInput.value == "") {
            alert("fill author input")
        }
        else if (pagesInput.value == "") {
            alert("fill pages input")
        }
        else if (readInput.value == "") {
            alert("fill read input")
        } else {
            validation = true;
        }
    }

function deleteBtn() {
    // here we remove div after click "X" button
        this.parentNode.remove();

    // here we try to find title in myLibrary array  equal to id delete button
    const indexObject = myLibrary.findIndex(key => {
            return key.title === this.id;
            });
                  
    // we delete that index from array myLibrary      
        myLibrary.splice(indexObject, 1);
        console.log(myLibrary)
    }



/* TEST */
    let testLibrary = [
        {
            "title": "The Hobbit",
            "author": "J.R.R Tolkien",
            "pages": 295,
            "read": "not read yet"
        }, 
        {
            "title": "xyz",
            "author": "nieznany",
            "pages": 2,
            "read": "yup"
        },
        {
            "title": "Lalka",
            "author": "Bolek Prus",
            "pages": 200,
            "read": "read"
        }
        ]
        const goTest = function() {
        testLibrary.forEach(book => {
            let div = document.createElement("div");
            let title = document.createElement("h1");
            let author = document.createElement("h2");
            let pages = document.createElement("p");
            let read = document.createElement("p");
            let x = document.createElement("button");
            title.textContent = book.title;
            author.textContent = book.author;
            pages.textContent = `${book.pages} pages`;
            read.textContent = book.read;
                    x.textContent = "X";
        x.classList.add("delete");
        div.append(title, author, pages, read, x);
        library.appendChild(div);

        deletes = document.querySelectorAll(".delete");
        })
        }
        