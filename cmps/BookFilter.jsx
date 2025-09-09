const { useState, useEffect } = React


export function BookFilter({defaultFilter, onSetFilter}) {

   const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

   useEffect(() => {
      console.log('filterByToEdit:', filterByToEdit);
      console.log('defaultFilter:', defaultFilter);
      console.log('onSetFilter:', onSetFilter);
      onSetFilter(filterByToEdit)
   }, [filterByToEdit])






   function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return( 
      <section className="book-filter">
         <h2>Filter books</h2>
         <form >
            <ul>
            <label htmlFor="title">title:</label>
            <input onChange={handleChange} type="text" id='title' name='title' value={filterByToEdit.title} />
            </ul>
            <ul>
            <label htmlFor="minPrice">min price:</label>
            <input onChange={handleChange} type="number" id="minPrice" name="minPrice" value={filterByToEdit.minPrice} />
            </ul>
            <ul>
            <label htmlFor="category">category:</label>
            <select onChange={handleChange} id="category" name="category" value={filterByToEdit.category}>
               <option value="">All</option>
               <option value='Love'>Love</option>
               <option value='Fiction'>Fiction</option>
               <option value='Poetry'>Poetry</option>
               <option value='Computers'>Computers</option>
               <option value='Religion'>Religion</option>
            </select>
            </ul>
            <ul>
            <label htmlFor="isOnSale">On Sale:</label>
            <input onChange={handleChange} type="checkbox" id="isOnSale" name="isOnSale" checked={filterByToEdit.isOnSale} />
            </ul>
         </form>

      </section>
    )



}