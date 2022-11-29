import React from 'react'
import './Navbar.css'
import { isLoggedin, Logout } from '../Auth/Auth'
import Cookies from 'js-cookie'

const Navbar = () => {    
    return (
        <nav>
            <div className='Navbar'>
            { isLoggedin() ?
            <> 
            <span className='Welcome'>Bem-vindo {Cookies.get('name')}!</span>
            <a href='/' className='teladelogin'>Tela de Login</a>
            <a href='/form' className='form'>Encurtador</a>
            <span type='button' onClick={Logout} className='logout'>Sair</span>
            </>
            : null}
            </div>
        </nav>
    )

}

export default Navbar