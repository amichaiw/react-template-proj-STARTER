import { bookService } from "../services/books.service.js";
import { LongTxt } from "../cmps/LongTxt.jsx";


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

      function kindOfReading () {
         if (book.pageCount > 500) return 'Serious Reading'
         if (book.pageCount > 200) return 'Decent Reading'
         if (book.pageCount < 100) return 'Light Reading'
         return ''
      }

      function priceHighLow() {
         if (book.listPrice.amount > 150) return 'high-price'
         if (book.listPrice.amount < 20) return 'low-price'
         return ''
      }



      if (!book) return <div>Loading...</div>
      return(
         <section className="book-details">
            <section>
               <Link to={`/book/${book.prevBookId}`}>
               <button> <i className="fa-solid fa-arrow-left"></i></button>
               </Link>
               <button> <Link to={`/book/${book.nextBookId}`}><i className="fa-solid fa-arrow-right"></i></Link></button>
            </section>
            <h1>{book.title}</h1>
            <h3><i className="fa-solid fa-feather"></i> {book.authors}</h3>
            <h3><i className="fa-solid fa-book"></i> {book.categories}</h3>
            <img src={book.thumbnail} alt="img" />
            <h3> {kindOfReading()} </h3>
            <h3 className={`book-details-${priceHighLow()}`}>Price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            <p><LongTxt>{book.description}</LongTxt></p>
            
         </section>
      )



}