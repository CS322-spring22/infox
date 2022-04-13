import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'

const Index = () => {
  return (
    <>
        <Nav>
            <NavLink to="/">
                <h1>InfoX</h1>
            </NavLink>
            <Bars />
            <NavMenu>
                <NavLink to="/history">
                    History
                </NavLink>
                <NavLink to="/settings">
                    Settings
                </NavLink>
                <NavLink to="/signup">
                    Sign Up
                </NavLink>
            </NavMenu>
            <NavBtn>
                <NavBtnLink to="/signin">
                    Sign In
                </NavBtnLink>
            </NavBtn>
        </Nav>
    </>
  )
}

export default Index;