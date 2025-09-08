
export function BookPreview({book}) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h3>{book.authors}</h3>
            {/* <h4>{book.subtitle}</h4> */}
            <img src={book.thumbnail} alt={book.title} />
            <h4>{book.listPrice.amount} {book.listPrice.currencyCode}</h4>
            {book.listPrice.isOnSale && <img className="sale-badge" src="assets\img\sign.png" alt="sale" />}
        </article>
    )
}