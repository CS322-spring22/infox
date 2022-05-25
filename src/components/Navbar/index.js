import React from 'react'
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink} from './NavbarElements'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../../firebase';

const Index = () => {
    var isLogged = "Sign Out";
    const [user] = useAuthState(auth)
    if (!user){
        isLogged = "Sign In";
    }
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
                    <NavLink to="/instructions">
                        Instructions
                    </NavLink>
                    <NavLink to="/signup">
                        Sign Up
                    </NavLink>
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/signin">
                        {isLogged}
                    </NavBtnLink>
                </NavBtn>
            </Nav>
    </>
  )
}

export default Index;