import { fetchMovies } from '../services/fetchMovies'
import { useState, useRef, useMemo, useCallback } from 'react'

interface Movie {
  id: string
  title: string
  year: string
  poster: string
}

interface UseMoviesReturnTypes {
  sortedMovies: Movie[]
  getMovies: (search: GetMoviesParams) => Promise<void>
  isLoading: boolean
}

interface UseMoviesHookParams {
  search: string
  searchError: string | null
  isSorted: boolean
}

interface GetMoviesParams {
  search: string
}

export const useMovies = ({ search, searchError = null, isSorted }: UseMoviesHookParams): UseMoviesReturnTypes => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }: GetMoviesParams): Promise<void> => {
    if (searchError !== null || previousSearch.current === search) return

    try {
      setIsLoading(true)
      previousSearch.current = search
      const newMovies = await fetchMovies({ search, searchError })
      setMovies(newMovies as never[])
    } catch (error) {
      console.error(`An error has ocurred during the set of the fetched movies: ${(error as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return isSorted
      ? ([...movies] as Movie[]).sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [isSorted, movies])

  return { getMovies, sortedMovies, isLoading }
}
