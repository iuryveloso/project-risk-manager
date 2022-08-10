import { plusIcon, searchIcon } from '@components/icons'
import { useState } from 'react'

interface HeaderInterface {
  mode: 'form' | 'table'
  newCustomer: () => void
  search: (searchTag: string) => void
}

export default function Header({ newCustomer, search, mode }: HeaderInterface) {
  const [searchInput, setSearchInput] = useState('')
  return (
    <div
      className={`flex w-full mt-7 mb-2 ${mode === 'form' ? 'hidden' : ''} `}
    >
      <button
        className={`
              text-slate-50 px-3 py-2 mb-3 rounded-full
              bg-green-600 hover:bg-green-700
              dark:bg-green-500 dark:hover:bg-green-600
          `}
        onClick={() => newCustomer()}
      >
        {plusIcon}
      </button>
      <div className={'flex flex-grow justify-end'}>
        <input
          className={`
                  px-4 py-3 rounded-l-md rounded-y-md border focus:outline-none mb-3 ml-5
                  bg-slate-100 dark:bg-slate-600
                  border-slate-500 dark:border-slate-200
                  text-slate-900 dark:text-slate-100
                  focus:bg-white dark:focus:bg-slate-500 
                  focus:border-indigo-700 dark:focus:border-indigo-600 

              `}
          type="text"
          placeholder="Pesquisar..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => (e.key === 'Enter' ? search(searchInput) : false)}
        />

        <button
          className={`
                  text-slate-50 px-3 py-2 mb-3 rounded-r-md rounded-y-md
                  bg-blue-600 hover:bg-blue-700
                  dark:bg-blue-500 dark:hover:bg-blue-600
              `}
          onClick={() => search(searchInput)}
        >
          {searchIcon}
        </button>
      </div>
    </div>
  )
}
