import React from 'react'
import {Button, Container, Row, Col} from 'reactstrap'
import NotLoggedCarousel from './NotLoggedCarousel'
import './NotLogged.css'

const HomeNotLogged = props => {
  const onClickBtn = (location) =>{
    props.history.push(location)
  }

  return(
    <>
      <Container className="main-container">
          <NotLoggedCarousel/>
          <hr className="div-line"/>
          <Container>
            <Row className="login-register">
              <Col sm="5" className="login-col">
                <Button color="info" onClick={() => {onClickBtn("/login")}}>
                  Login
                </Button>
              </Col>
              <Col sm="2" className="or-col">
                <h2>or</h2>
              </Col>
              <Col sm="5" className="register-col">
                <Button color="info" onClick={() => {onClickBtn("/register")}}>
                  Register
                </Button>
              </Col>
            </Row>
          </Container>
      </Container>
    </>
  )
}

export default HomeNotLogged