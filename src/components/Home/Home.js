import './Home.css'
import { useState, useRef, useEffect} from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Home () {
    const navigate = useNavigate();
    const [acesstoken, Setacesstoken] = useState();

    function onSubmitForm () {
        axios.post('http://localhost:3001/api/auth/sign_in', Data)
        .then((response) => {
            console.log(response)
        })
        .catch((response) => {
            setErrors("Login inválido")
            setEmail('')
            setPassword('')
        })
    }



    const {register, handleSubmit} = useForm();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState("");
    const [Errors, setErrors] = useState();

    
    const Data = {
        email: email,
        password: password
    }



    return (
        <div className='loginform'>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <fieldset>
                    <h1>Login</h1>
                    <span className='erroralert'>
                    {Errors}</span>
                    <div className='email'>
                        <input type='text' {...register("email", {required: true})} value={email} onChange={e => setEmail(e.target.value)} id='email' placeholder='Insira seu Email' />
                    </div>
                    <div className='password'>
                        <input type='password' {...register("password", { required: true})} value={password} onChange={e => setPassword(e.target.value)} id='password' placeholder='Insira sua Senha'/>
                    </div>
                    <button className='continuarbtn'> Continuar</button>
                    <div className='remembercheckbox'>
                        <input type='checkbox'/>
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