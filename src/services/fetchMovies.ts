const API_ID = 'tt3896198'
const API_KEY = '66daf36f'

interface Params {
  search: string
  searchError: string | null
}

interface Movie {
  id: string
  title: string
  year: string
  poster: string
}

interface ApiMovieTypes {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

export const fetchMovies = async ({ search, searchError }: Params): Promise<Movie[] | unknown> => {
  if (searchError !== null) return

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${API_ID}&apikey=${API_KEY}&s=${search}`)
    const json = await response.json()
    const movies = json?.Search

    if (movies.length < 1) return

    return movies?.map((movie: ApiMovieTypes) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (error) {
    throw new Error(`An error has ocurred during data fetching: ${(error as Error).message}`)
  }
}
