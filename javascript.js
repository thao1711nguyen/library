

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        return this.name + " by " + this.author + ', ' + this.pages + ' pages, ' + this.read;
    }
};

let myLibrary = [];
const book1 = new Book("Harry Potter", "J.K.Rowling", 456, "read");
const book2 = new Book("Angels and Demons", "Dan Brown", 375, "read");
myLibrary.push(book1, book2);

function addBookToLibrary(bookInfo) {
    bookInfo = bookInfo.split(",")
    const newBook = new Book(...bookInfo)
    myLibrary.push(newBook)
};
function displayBook() {
    let bookTableBody = document.querySelector("#books tbody")
    let rows = bookTableBody.getElementsByTagName("tr")
    for(let i=rows.length; i < myLibrary.length; i++) {
        
        let clone = document.getElementById("book").content.cloneNode(true)
        let cells = clone.querySelectorAll("td")
        
        cells[0].textContent = myLibrary[i].title
        cells[1].textContent = myLibrary[i].author
        cells[2].textContent = myLibrary[i].pages

        readDisplay(cells[3], myLibrary[i].read)
        readEventListener(cells[3])

        bookTableBody.appendChild(clone)
        rows[i].setAttribute("data-id", i)
        // add data attribute to each row to associate book object with dom element
        remove(rows[i])
    }
}
function readDisplay(cell, status) {
    const checkBox = cell.querySelector("label input")
    if (status == "yes") {
        checkBox.checked = true
    } else {
        checkBox.checked = false
    }
    
}
function readEventListener(cell) {
    cell.querySelector("label input").addEventListener("click", (event) => {
        let bookId = cell.parentElement.dataset.id 
        if (event.target.checked) {
            myLibrary[bookId].read = "yes"
        } else {
            myLibrary[bookId].read = "no"
        }
    })
}

const bookDialog = document.getElementById("book-info");

document.getElementById("adding").addEventListener("click", () => {
    bookDialog.showModal();
});
document.getElementById("submit").addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const reads = document.getElementsByName("read");
    let readStatus;
    for(const choice of reads ) {
        if (choice.checked) {
            readStatus = choice.value;
        }
    }
    bookDialog.close([title.value, author.value, pages.value, readStatus]);
});

bookDialog.addEventListener("close", () => {
    let bookInfo = bookDialog.returnValue
    if (bookInfo == "") {
        return; 
    } else {
        addBookToLibrary(bookInfo)
        displayBook()
    }
});
function remove(row) {
    let button = row.querySelector("button")
    button.addEventListener("click", () => {
        let bookTable = document.getElementById("books")
        let row = button.parentElement.parentElement
        let bookId = Number(row.dataset.id)
        myLibrary = myLibrary.slice(0, bookId).concat(myLibrary.slice(bookId+1))
        bookTable.querySelector("tbody").removeChild(row)
    })
}

window.addEventListener("load", () => {
    displayBook()
});




