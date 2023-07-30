let library = document.getElementById("library");
let newBookInLibrary = document.createElement("div");
let titleInput = document.getElementById("title")
let authorInput = document.getElementById("author")
let pagesInput = document.getElementById("pages")
let myForm = document.querySelector("#myForm");
let readInput = document.getElementsByName("read")
let mainContainer = document.querySelector(".main")

let myLibrary = [];
let validation
let checkIfNewBook
let isRead

let addBookBtn = document.getElementById("addBook")
addBookBtn.addEventListener("click", () => {
    myForm.style.display = "block";
 
    // hide background when form modal is open
    mainContainer.style.cssText = "position: relative; z-index: -1; filter: blur(10px)"
 
    // add event which close Form after click outside it   
    document.onclick = function(e){
    if (!myForm.contains(e.target)) {
        myForm.style.display = 'none';
      
    }
    if (e.target.id == "addBook") {
        myForm.style.display = "block"
    }
    // after click outside form background is visible and inputs clear - so it works like press X button
    if (myForm.style.display == "none") {
        mainContainer.style.cssText = ""
        clearInputs()
    }
    };
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

class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    info() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
    }
}

 /* change constructor into class
function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        return this.title + " by " + this.author + ", " + this.pages + " pages, " + this.read
    }
}*/

// FUNCTIONS
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
        let switchBtn = document.createElement("button");
                
        div.setAttribute('id',(`${book.title}-${book.author}-${book.pages}`))
        title.textContent = book.title;
        author.textContent = "by " + book.author;
        pages.textContent = book.pages + " pages";
        
        // below replace: read.textContent = "Read?  " + book.read;
        if (book.read === "yes") {
        read.textContent = "Read already! :)";
        div.style.border = "2px solid green"
        read.style.color = "green"
        } else {
            read.textContent = "not read :(";
            div.style.border = "2px solid red";
            read.style.color = "red"
        }

        x.textContent = "X";
        x.classList.add("delBtn");
        x.setAttribute('id', (`${book.title}_${book.author}_${book.pages}`));
        
        switchBtn.setAttribute('id', (`${book.title}+${book.author}+${book.pages}`));
        switchBtn.textContent = "Read / Unread"
    //    document.getElementsByClassName("switch").addEventListener("click", switchRead)


        div.append(title, author, pages, read, x, switchBtn);
        library.appendChild(div);
        /* adding id to a delete button for easier solution */
        document.getElementById(`${book.title}_${book.author}_${book.pages}`).addEventListener("click", deleteBtn)   
        document.getElementById(`${book.title}+${book.author}+${book.pages}`).addEventListener("click", switchRead)   
        
        // make background visible again
        mainContainer.style.cssText = " "
       
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
    let titleFromId = (this.parentNode.id).split('-');

    // here we try to find title in myLibrary array  equal to id delete button
    const indexObject = myLibrary.findIndex(key => {

        /* check if we found correct book because we can have the same title for many books, 
        but we stop adding book to library if title and author is the same, 
        so we need to check if title found by id delete button belong to correct author */
        if (key.author === titleFromId[1]) {;
        //we found author in Library so now we can delete title with same "key"            
        return key.title === titleFromId[0];} 
    });
   
    // we delete that index from array myLibrary      
        myLibrary.splice(indexObject, 1);
        console.log(myLibrary)
    }

function switchRead() {
    let titleFromId = (this.parentNode.id).split('-');
    const indexInLibrary = myLibrary.findIndex(key => {
    
    if (key.author === titleFromId[1]) {;
    return key.title === titleFromId[0];} 
    }); 
       
    if (myLibrary[indexInLibrary].read === "yes") {
        myLibrary[indexInLibrary].read = "no"
    } else {
        myLibrary[indexInLibrary].read = "yes"
    }
    
    // after we change object Library property "read" we must update our Div with books
    addBooksToDiv()
    }