import Cookies from 'js-cookie'
import { useState } from 'react'


const isLoggedin = () => {
    return (!!Cookies.get('access-token'),
    !!Cookies.get('client'),
    !!Cookies.get('uid'),
    !!Cookies.get('name'))
}

const Logout = () => {
    Cookies.remove('access-token')
    Cookies.remove('client')
    Cookies.remove('uid')
    Cookies.remove('name')
    window.location.reload()
}


export {isLoggedin, Logout}