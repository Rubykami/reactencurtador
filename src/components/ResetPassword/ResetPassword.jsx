import './ResetPassword.css'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState} from 'react'
import { useNavigate} from 'react-router-dom'


const ResetPassword = () => {
    const navigate = useNavigate()

    const [Password, setPassword] = useState();
    const [ConfPassword, setConfPassword] = useState();


         const ResetURL = window.location.href

    const schema = yup.object({
        password: yup.string().min(8, "A senha deve ter pelo menos 8 dígitos").required("A senha é obrigatória"),
        confirmPassword: yup.string().required("A senha de confirmação é obrigatória").oneOf([yup.ref('password')], "As senhas devem ser iguais") 
    }); 

    const {register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });


    function ForgotSubmit () {
        axios.put('http://localhost:3001/api/auth/password', {
            password: Password,
            password_confirmation: ConfPassword,
            }, {
            headers: {
            "Content-Type": "application/json",
            "access-token": ResetURL.slice(50, 72),
            "client": ResetURL.slice(80, 102),
            "uid": ResetURL.slice(222, ResetURL.length).replace('%', '@').replace('40','')
            }
            }).then((response) => {

            navigate('/SucessfullResetPassword')

            })
            }
    return (
        <div className='resetpassworddiv'>
            <form onSubmit={handleSubmit(ForgotSubmit)}>
                <fieldset>
                    <input type='password' placeholder='Insira sua nova senha' {...register('password', {required: true})} onChange={e => setPassword(e.target.value)} />
                    { errors.password && <span className='resetpassworderror'>{errors.password?.message}</span>}
                    <input type='password' placeholder='Insira novamente a sua senha'{...register('confirmPassword', {required: true})} onChange={e => setConfPassword(e.target.value)} />
                    { errors.confirmPassword && <span className='resetconfpassworderror'>{errors.confirmPassword?.message}</span>}
                    <button type='submit'>Enviar</button>
                </fieldset>
            </form>
        </div>
    )

}

export default ResetPassword