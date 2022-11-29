import Header from './components/Header/Header'
import Formulario from './components/Formulario/Formulario'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Notfound from './components/NotFound/Notfound'
import PrivateRoute from './components/PrivateRoute/PrivateRoute'
import Navbar from './components/Navbar/Navbar'
import Signup from './components/Signup/Signup'
import SucessfulConfirmation from './components/Sucessful_confirmation/SucessfulConfirmation'
import SucessfulSignup from './components/Sucessful_signup/SucessfulSignup'
import ForgotPassword from './components/ForgotPassword/ForgotPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import SucessfullResetPassword from './components/SucessfullResetPassword/SucessfullResetPassword'
import SucessfullForgotPasswordEmail from './components/SucessfullForgotPasswordEmail/SucessfullForgotPasswordEmail'



const App = () => {

    return (
        <>
        <Header/>
        <Navbar/>
        <Router>
            <Routes>
                <Route exact path='/form' element={PrivateRoute(Formulario)} />
                <Route exact path='/sucessful_confirmation' element={<SucessfulConfirmation/>} />
                <Route exact path='/sucessful_signup' element={<SucessfulSignup/>} />
                <Route exact path='/' element={<Home/>} />
                <Route path='*' element={<Notfound/>}/>
                <Route exact path='/sign_up' element={<Signup/>} />
                <Route exact path='/forgot_password' element={<ForgotPassword/>}/>
                <Route exact path='/reset_password' element={<ResetPassword/>} />
                <Route exact path='SucessfullResetPassword' element={<SucessfullResetPassword />} />
                <Route exact path='/Sucessfullforgotpasswordemail' element={<SucessfullForgotPasswordEmail/>} />
            </Routes>
        </Router>
        </>
    )
}

export default App