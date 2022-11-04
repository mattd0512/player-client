import React, { Fragment } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Search from '../Search'

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
	fontFamily: 'Bungee Inline',
	fontSize: '13px'
	// fontWeight: 'bold'
}

const logoStyle = {
    color: 'white',
    textDecoration: 'none',
	fontFamily: 'Bungee Inline',
	fontSize: '20px'
}

const headerStyle = {
	backgroundColor: 'rgb(241, 50, 50)'
}

const appLogo = {
    fontFamily: 'Bungee Inline',
	// fontWeight: 'bold',
	marginLeft: '1%'
}

const unauthenticatedCSS = {
	paddingLeft: '45rem'
}

const authenticatedOptions = (
	
	<div>
		<Nav.Link>
			<Link to='my-profile' style={linkStyle} className='m-2'>
				My Profile
			</Link>
		</Nav.Link>
		<Nav.Link>
			<Link to='sign-out' style={linkStyle} className='m-2'>
				Sign Out
			</Link>
		</Nav.Link>
<<<<<<< HEAD
	</div>
	</>
=======
	</div>	
>>>>>>> refs/remotes/origin/main
)

const unauthenticatedOptions = (
	<>
        <Nav.Link style={unauthenticatedCSS}>
		    <Link to='sign-up' style={linkStyle} className='m-2'>Create Account</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle} className='m-2'>Login</Link>
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
            <Link to='/' style={logoStyle}>
                GameShare
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.username}</span>
				)}
				{/* {alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions} */}
			</Nav>
			<Container fluid='md'>
			<Nav className='justify-content-end'>
				{/* {alwaysOptions} */}
				<Search user={user}/>
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
			</Container>
		</Navbar.Collapse>
	</Navbar>
	
)

export default Header