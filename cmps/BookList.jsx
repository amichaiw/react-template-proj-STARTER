const { Link } = ReactRouterDOM

import { BookPreview } from "./BookPreview.jsx";


export function BookList({books}) {
    return (
        console.log(books),
        <ul className="book-list">
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button><Link to={`/book/${book.id}`}>Details</Link></button>
                </li>
            )}
        </ul>)
}