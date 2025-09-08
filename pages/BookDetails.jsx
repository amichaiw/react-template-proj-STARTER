import { bookService } from "../services/books.service.js";


const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails() {
      const [book, setBook] = useState(null)
      const params = useParams()

      useEffect(() => {
         loadBook()
      }, [params.bookId])

      function loadBook() {
         bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {console.log('Had issues in book service', err)})
      }



      if (!book) return <div>Loading...</div>
      return(
         <section className="book-details">
            <h1>{book.title}</h1>
            <p>{book.description}</p>
            <img src={book.thumbnail} alt="img" />
            <section>
               <button> <Link to={`/book/${book.prevBookId}`}>prev book</Link></button>
               <button> <Link to={`/book/${book.nextBookId}`}>next book</Link></button>
            </section>
         </section>
      )



}