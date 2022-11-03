import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


const Search = () => {
    return (
    <div>
    <form action="/games/search/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search all games</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Enter title here..."
            name="s" 
        />
        <button type="submit">Find game</button>
    </form>
    </div>
    )
}

export default Search;