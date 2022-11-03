import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { gameSearchResults } from '../api/game'

const Search = () => {
    const [name, setName] = useState('')

    const searchGame = (e) => {
        e.preventDefault()
      
        console.log(name)
        gameSearchResults('user', name)
            .then(res => {
                console.log('hello',res)
            })
    
    }
    return (
    <div>
    <form onSubmit={searchGame} action="/games/search/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search all games</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Enter title here..."
            name="name"
            value={name}
            onChange={e => setName(e.target.value)} 
        />
        <button type="submit">Find game</button>
    </form>
    </div>
    )
}

export default Search;