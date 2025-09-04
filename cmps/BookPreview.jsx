


export function BookPreview({book}) {
    return (
        <article className="book-preview">
            <h2>{book.title}</h2>
            <h4>{book.subtitle}</h4>
            <img src={book.thumbnail} alt={book.title} />
        </article>
    )
}