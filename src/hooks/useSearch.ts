import type React from 'react'
import { useState, useEffect, useRef } from 'react'

interface UseSearchReturnTypes {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  searchError: string | null
}

export const useSearch = (): UseSearchReturnTypes => {
  const [search, setSearch] = useState('')
  const [searchError, setSearchError] = useState<string | null>(null)
  const isInitialInput = useRef(true)

  useEffect(() => {
    if (isInitialInput.current) {
      isInitialInput.current = search === ''
      return
    }

    if (search === '') {
      setSearchError('Search cannot be empty')
      return
    }

    if (search.length < 3) {
      setSearchError('Search length should contain at least 3 characters')
      return
    }

    setSearchError(null)
  }, [search])

  return { search, setSearch, searchError }
}
