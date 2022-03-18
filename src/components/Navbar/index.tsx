import React from 'react'
import { NavbarContainer } from './style'
import LogoImg from '@public/logo-udemy.svg'

const Navbar: React.FC = (): JSX.Element => {
    console.log(LogoImg)
    return (
        <NavbarContainer>
            <LogoImg />
           
            hi
        </NavbarContainer>
    )

}

export default Navbar