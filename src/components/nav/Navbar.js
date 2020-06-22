import React, {useState, useEffect} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import './Navbar.css'

const NavbarHeader = () => {
  const [userListings, setUserListings] = useState("")
  
  const getUser = () => {
    const user = sessionStorage.getItem("userId")
    const userListLink = "/listings/" + user
    setUserListings(userListLink)
  }
  const logout = () => {
    sessionStorage.removeItem("authenticated")
    sessionStorage.removeItem("userId")
    window.location.reload()
  }
  
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div>
      <Navbar  expand="lg" className="navbar">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/listings">
                Listings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/responses">
                Responses
              </NavLink>
            </NavItem>
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/profile">
                    Your Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/profile/settings">
                    Settings
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/listings/created">
                    Your Listings
                  </NavLink>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}


export default NavbarHeader