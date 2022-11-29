import './Home.css'
import { useState, useEffect} from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'


function Home () {
    const navigate = useNavigate();
    const InputEmail = document.getElementById('email')
    const InputPassword = document.getElementById('password')
    const [expiration, setExpiration] = useState('')

    const SetCookie = (cookiename, usrin, expires=expiration) => {
        Cookies.set(cookiename, usrin, {
            expires: expires,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
    }

    const GetCookie = (cookiename) => {
        return Cookies.get(cookiename)
    }

    const RemoveCookie = (cookiename) => {
        return Cookies.remove(cookiename)
    }



    const {register, handleSubmit} = useForm();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState("");
    const [Errors, setErrors] = useState();

    const Data = {
        email: email,
        password: password
    };

    function onSubmitForm () {
        axios.post('http://localhost:3001/api/auth/sign_in', Data)
        .then((response) => {
            SetCookie('access-token', response.headers['access-token'])
            SetCookie('client', response.headers['client'])
            SetCookie('uid', response.headers['uid'])
            SetCookie('name', response.data.data['name'])
            console.log(response.headers)
            navigate('/form')
            navigate(0)
        })
        .catch((response) => {
            setErrors("Login inválido")
            setEmail('')
            setPassword('')
        })
    };

    useEffect (() => { 
        axios.get('http://localhost:3001/api/auth/validate_token', {
            headers: {
            'access-token': GetCookie('access-token'),
            'client': GetCookie('client'),
            'uid': GetCookie('uid'),
        }}).then((response) => {
            console.log("Autenticou")
        }).catch((response) => {
            RemoveCookie('access-token')
            RemoveCookie('client')
            RemoveCookie('uid')
            RemoveCookie('name')
            console.log('Não autenticou')
            navigate('/')
        }, {timeout: 1000})
    },[]);


    axios.interceptors.response.use( function(config) {
        if (config.headers['access-token']) {
            SetCookie('access-token', config.headers['access-token'])
        }
        return config;
    })

    function Rememberme () {
        setExpiration(30)
    }
    



    return (
        <div className='loginform'>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <fieldset>
                    <h1>Login</h1>
                    <span className='erroralert'>
                    {Errors}</span>
                    <div className='email'>
                        <input type='text' {...register("email", {required: true})} onChange={e => setEmail(e.target.value)} id='email' placeholder='Insira seu Email' />
                    </div>
                    <div className='password'>
                        <input type='password' {...register("password", { required: true})} onChange={e => setPassword(e.target.value)} id='password' placeholder='Insira sua Senha'/>
                    </div>
                    <button className='continuarbtn'> Continuar</button>
                    <div className='remembercheckbox'>
                        <input type='checkbox' onClick={Rememberme} id='rememberme'/>
                        <h2>Lembrar-me</h2>
                    </div>
                    <div className='forgotpassword'>
                        <h2>
                            <a href='http://localhost:3000/forgot_password'>Esqueceu sua senha?</a>
                        </h2>
                    </div>
                    <a href='http://localhost:3000/sign_up'>Criar conta</a>
                </fieldset>
            </form>
        </div>
    )
}

export default Home