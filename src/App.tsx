import React, { useState, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import './App.css'

const App: React.FC = () => {
  const [isSorted, setIsSorted] = useState(false)

  const { search, setSearch, searchError } = useSearch()
  const { getMovies, sortedMovies, isLoading } = useMovies({ search, searchError, isSorted })

  const debouncedGetMovies = useCallback(debounce((search: string) => {
    void getMovies({ search })
  }, 350)
  , [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    setSearch(search)
    void getMovies({ search })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = (): void => {
    setIsSorted(!isSorted)
  }

  return (
    <section>
      <header >
        <h1>Movie Searcher App</h1>
        <form className='form-container' onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Enter the name of a movie (e.g., Avengers, Parasite, John Wick)'
            onChange={handleChange}
            value={search}
            />
          <button type='submit'>Search</button>
        </form>
        {searchError !== null ? <p className='search-error'>{searchError}</p> : null}
      </header>

      <section className='sort-option-section'>
        <label htmlFor="sortMovies">Sort movies by title</label>
        <input type="checkbox" name='sortMovies' onChange={handleSort} checked={isSorted} />
      </section>

      <main>
        {isLoading ? <p style={{ textAlign: 'center' }}>Loading movies...</p> : <Movies movies={sortedMovies}/>}
      </main>
    </section>
  )
}

export default App
