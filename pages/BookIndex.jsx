import { BookList } from "../cmps/BookList.jsx";
import { BookFilter } from "../cmps/BookFilter.jsx"
import { bookService } from "../services/books.service.js";
import { utilService } from "../services/util.service.js";
// import { getTruthyValues } from "../services/util.service.js"
const { Link, useSearchParams } = ReactRouterDOM
const { useEffect, useState } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSrcParams(searchParams))


    useEffect(() => {
        setSearchParams(utilService.getTruthyValues(filterBy))
        loadBooks()
        // console.log(books)
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
                // console.log('books from service:', books)
            })
            .catch(err => {
                console.log('Had issues in book service', err)
            })
            // console.log(books)
    }
    
    // console.log(books)


    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />
            <section>
                {/* <Link to="/book/edit">Add book</Link> */}
            </section>
            <BookList
                books={books}
            />
        </section>
    )

}

