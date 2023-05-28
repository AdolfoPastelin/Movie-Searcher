import React from 'react'

interface Movie {
  title: string
  year: string
  id: string
  poster: string
}

interface Props {
  movies: Movie[]
}

export const Movies: React.FC<Props> = ({ movies }) => {
  const hasMovies = movies.length > 0

  return (
    <>
      {hasMovies ? <MovieList movies={movies}/> : <NotFound />}
    </>
  )
}

const MovieList: React.FC<Props> = ({ movies }) => {
  return (
    <ul className='movie-container'>
      {movies.map(movie => (
        <li key={movie.id} className='movie-item'>
          <h2>{movie.title}</h2>
          <img src={movie.poster} alt={movie.title} />
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  )
}

const NotFound: React.FC = () => {
  return (<p style={{ textAlign: 'center', marginTop: '5rem' }}>Your search does not return any data.</p>)
}
