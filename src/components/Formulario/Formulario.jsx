import './Formulario.css'
import axios from 'axios'
import { useForm} from 'react-hook-form'
import { useState, useEffect} from 'react';
import { HiClipboardDocument } from 'react-icons/hi2'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Formulario = () => {
    const navigate = useNavigate();


    const {register, handleSubmit, formState: { errors }} = useForm();
    const [ ShortenedUrl, SetShortenedUrl] = useState('');
    const [ BaseUrl, SetBaseUrl ] = useState('');

    const Data = {
        BaseUrl: BaseUrl
    };

    const Popup = document.querySelector('#popup_copiarbtn')

    const Link = document.querySelector('#link')

    const Copiaricon = document.querySelector('#copiaricon')
    
    const Paragrform = document.querySelector('#paragrform')


    function CopiarTexto () {
        navigator.clipboard.writeText(Link.innerHTML)
        Popup.style.display = 'block'
    }

    let urltext;
    if (ShortenedUrl) {
        urltext = <span id='urltext'>URL encurtado:</span>
        Copiaricon.style.display = 'block'
        Paragrform.style.backgroundColor = 'lightgreen'
        Paragrform.style.display = 'flex'
    }
    else {
        urltext = null 
    }



    function Clear () {
        SetBaseUrl('')
        SetShortenedUrl('')
    }

    function onChangeForm (event) {
        SetBaseUrl(event.target.value)
    };
    function onSubmitForm () {
                axios.post('http://localhost:3001/api/v1/shortener', Data)
            .then((response) => {
                console.log(response.data.ShortenedUrl)
                SetShortenedUrl(response.data.ShortenedUrl)})

    }
    

    

    
    useEffect (() => { 
        axios.get('http://localhost:3001/api/auth/validate_token', {
            headers: {
            'access-token': Cookies.get("access-token"),
            'client': Cookies.get("client"),
            'uid': Cookies.get("uid"),
        }}).then((response) => {
            console.log("Autenticou")
        }).catch((response) => {
            console.log('Não autenticou')
            navigate('/')
        })
    }, []);

    axios.interceptors.response.use( function(config) {
        if (config.headers['access-token']) {
            Cookies.set('access-token', config.headers['access-token'])
        }
        return config;
    })


    return <div className='formulario'>
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <label htmlFor='BaseUrl'>Cole o URL a ser encurtado:</label>
            <input  type='text' id='BaseUrl' {...register('BaseUrl', { required: true})} value={BaseUrl} onChange={onChangeForm} placeholder='Insira o seu URL aqui'/>
            { errors.BaseUrl && <motion.span className='linkerror'>Inserir um URL é obrigatório.</motion.span>}
            <motion.button type='submit' className='encurtarbtn'
            whileHover={{
                scale: 1.1,
                textShadow: '0 0 10px #bd0000',
                boxShadow: '0 0 10px #bd0000',
                transition: {
                    yoyo: Infinity
                }
            }}
            >Encurtar URL</motion.button>
            <motion.button onClick={Clear} className='limparbtn' type='button'
            whileHover={{
            scale: 1.1,
            textShadow: '0 0 10px #bd0000',
            boxShadow: '0 0 10px #bd0000',
            transition: {
                yoyo: Infinity
            }
            }}
            >Limpar</motion.button>
            { BaseUrl &&
                <motion.p id='paragrform'
                initial={{y: -1000}}
                animate={{y: 0}}
                transition={{type: 'spring', stiffness: 500, mass: 2, damping: 14, ease: 'easeInOut'}}
                >
                {urltext}
                <span id ='link' className='link'>
                {ShortenedUrl}
                </span>
                <button type='button' className='copiarbtn'><HiClipboardDocument onClick={CopiarTexto} id ='copiaricon' className='copiaricon'/></button>
                </motion.p>}
        </form>
        { BaseUrl &&
            <motion.span className='popup_copiarbtn' id='popup_copiarbtn'
            initial={{y: -1000}}
            animate={{y: 0}}
            transition={{type: 'spring', stiffness: 500, mass: 2, damping: 7}}
            >
            <span className='popupshortenedurl'>{ShortenedUrl}</span> copiado para a área de transferência</motion.span>}

            
    </div>

    
}

export default Formulario;