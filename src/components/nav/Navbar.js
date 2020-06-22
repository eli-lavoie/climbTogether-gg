import React, {useState} from 'react'
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

const NavbarHeader = props => {
  const logout = () => {
    sessionStorage.removeItem("authenticated")
    sessionStorage.removeItem("userId")
    window.location.reload()
  }
  
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <div>
      <Navbar  expand="lg" className="navbar">
        <NavbarBrand>
        <svg
              width={50}
              height={50}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink ="http://www.w3.org/1999/xlink"
            >       
              <image
                xlinkHref="https://i.ibb.co/6gn3mmJ/reactshell.png"
                height={50}
                width={50}
              />
            </svg>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/messages">
                Messages
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/articles">
                News
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/tasks">
                Tasks
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}


export default NavbarHeader