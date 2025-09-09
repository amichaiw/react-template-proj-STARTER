import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getFilterFromSrcParams,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }

            if (filterBy.id) {
                const regExp = new RegExp(filterBy.id, 'i')
                books = books.filter(book => regExp.test(book.vendor))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.minPrice)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
    .then(book=>_setNextPrevBookId(book))
    
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}


function save(book) {
    return storageService.post(BOOK_KEY, book)
}

function getFilterFromSrcParams(srcParams) {
    const title = srcParams.get('title') || ''
    const id = srcParams.get('id') || ''
    const minPrice = srcParams.get('minPrice') || ''
    return {
        title,
        id,
        minPrice
    }

}



function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}


function _createBooks() {
const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
const books = utilService.loadFromStorage(BOOK_KEY) || []
if (books && books.length) return
for (let i = 0; i < 20; i++) {
const book = {
id: utilService.makeId(),
title: utilService.makeLorem(2),
subtitle: utilService.makeLorem(4),
authors: [
utilService.makeLorem(1)
],
publishedDate: utilService.getRandomIntInclusive(1950, 2024),
description: utilService.makeLorem(20),
pageCount: utilService.getRandomIntInclusive(20, 600),
categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
thumbnail: `${process.env.PUBLIC_URL}/assets/img/booksImages/${i + 1}.jpg`,

// thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
language: "en",
listPrice: {
amount: utilService.getRandomIntInclusive(80, 500),
currencyCode: "EUR",
isOnSale: Math.random() > 0.7
}
}
books.push(book)
}
utilService.saveToStorage(BOOK_KEY, books)
console.log('books', books)
}
