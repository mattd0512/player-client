import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Search from '../Search'

const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const headerStyle = {
	backgroundColor: 'rgb(241, 50, 50)'
}

const appLogo = {
    fontFamily: 'Monoton',
	fontWeight: 'bold',
	marginLeft: '1%'
}

const unauthenticatedCSS = {
	paddingLeft: '45rem'
}

const authenticatedOptions = (
	<>
	<div>
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
		</div>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Link style={unauthenticatedCSS}>
		    <Link to='sign-up' style={linkStyle} className='m-2'>Create Account</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle} className='m-2'>Sign In</Link>
        </Nav.Link>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item>
			<Search/>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar style={ headerStyle } variant='dark' expand='md'>
		<Navbar.Brand style={ appLogo }>
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
