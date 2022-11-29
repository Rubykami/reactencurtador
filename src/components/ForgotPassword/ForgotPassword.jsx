import './ForgotPassword.css'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

const ForgotPassword = () => {

    const navigate = useNavigate()
    
    const [Email, setEmail] = useState()

       const schema = yup.object({
        email: yup.string().email("Digite um email válido").required("O email é obrigatório")
    }); 

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });


    function Forgotpasswordsubmit() {
        axios.post('http://localhost:3001/api/auth/password', {
            email: Email
        }).then((response) => {
            console.log(response)
            navigate('/Sucessfullforgotpasswordemail')
        })
    }

    return (
    <div className='forgotpassworddiv'>
    <form onSubmit={handleSubmit(Forgotpasswordsubmit)}>
        <fieldset>
            <input type='text' {...register('email', { required: true})} onChange={ e => setEmail(e.target.value)} placeholder='Insira o seu email'/>
            { errors.email && <span>{errors.email?.message}</span>}
            <button>Enviar</button>
        </fieldset>
    </form>
    </div>

)}

export default ForgotPassword