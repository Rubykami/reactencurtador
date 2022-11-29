import { useForm } from 'react-hook-form'
import axios from 'axios'
import './Signup.css'
import { BsPeopleFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { MdEmail } from 'react-icons/md'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Signup = () => {

    const schema = yup.object({
        name: yup.string().required("O nome é obrigatório"),
        email: yup.string().email("Digite um email válido").required("O email é obrigatório"),
        password: yup.string().min(8, "A senha deve ter pelo menos 8 dígitos").required("A senha é obrigatória"),
        confirmPassword: yup.string().required("A senha de confirmação é obrigatória").oneOf([yup.ref('password')], "As senhas devem ser iguais"),
    });


    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()




    const [Email, setEmail] = useState('');
    const [Password, setPassowrd] = useState('');
    const [ConfPassowrd, setConfPassowrd] = useState('');
    const [Name, setName] = useState('');
    const [Showpassword, setShowpassword] = useState(false)

    const Data = {
        name: Name,
        email: Email,
        password: Password, 
        password_confirmation: ConfPassowrd

    }

    function CreateAccount () {
        axios.post('http://localhost:3001/api/auth', Data)
        .then((response) => {
            console.log(response)
            navigate('/sucessful_signup')
        }).catch((response) => {
            console.log(response)
        })
    }

    console.log(errors)

    function Mostrarsenha () {
        setShowpassword(!Showpassword)
    }

    return (
        <div className='signup'>
        <form onSubmit={handleSubmit(CreateAccount)}>
        <fieldset>
            <div className='introd'>
                <span className='criesuaconta'>Crie sua conta</span>
                <span className='preencherdados'>Preencha seus dados</span>
            </div>
            <span></span>
        <div htmlFor='nome' className='divnome'>
            <BsPeopleFill/>
            <input {...register('name', { required: true})}  className='inputnome' type='text' id='nome' placeholder='Insira seu nome' onChange={e => setName(e.target.value)}/>
            </div>
            { errors.name && <span className='nameerror'>{errors.name?.message}</span>}
            <div htmlFor='email' className='divemail'>
            <MdEmail/>
            <input {...register('email', { required: true})}  onChange={e => setEmail(e.target.value)} type='text' id='email' className='inputemail' placeholder='Insira um email' />
            </div>
            { errors.email && <span className='emailerror'>{errors.email?.message}</span>}

            <div htmlFor='senha' className='divsenha'>
            <RiLockPasswordFill/>
            <input {...register('password', { required: true})} onChange={e => setPassowrd(e.target.value)} className='inputsenha' type={Showpassword ? "text" : "password"} id='senha' placeholder='Insira uma senha' />
            </div>
            { errors.password && <span className='passworderror'>{errors.password?.message}</span>}

            <div htmlFor='confsenha' className='divconfsenha'>
            <RiLockPasswordFill/>
            <input {...register('confirmPassword', { required: true})} onChange={e => setConfPassowrd(e.target.value)} className='inputconfsenha' type={Showpassword ? "text" : "password"}  id='confsenha' placeholder='Insira novamente a senha' />
            </div>
            { errors.confirmPassword && <span className='confpassworderror'>{errors.confirmPassword?.message}</span>}

            <div className='mostrarsenha'>
            <label htmlFor='mostrarsenha'>Mostrar senha</label>
            <input type='checkbox' onClick={Mostrarsenha}/>
            </div>

            <button type='submit' className='cadastrarcontabtn'>Cadastrar</button>

        </fieldset>
        </form>

        </div>
    )
}

export default Signup