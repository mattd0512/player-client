import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const headerStyle = {
    backgroundColor: 'red',
	display: 'flex',
	justifyContent: 'center'
}

const authenticatedOptions = (
	<>
		<Nav.Link>
			<Link to='change-password' style={linkStyle} className='m-2'>
				Change Password
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle} className='m-2'>
				Sign Out
			</Link>
		</Nav.Link>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link>
		    <Link to='sign-up' style={linkStyle} className='m-2'>Create Account</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle} className='m-2'>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Link>
			<Link to='/' style={linkStyle} className='m-2'>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar style={ headerStyle } variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                GameShare
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.username}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
