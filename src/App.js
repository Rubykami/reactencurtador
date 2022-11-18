import Header from './components/Header/Header'
import Formulario from './components/Formulario/Formulario'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {

    return (
        <>
        <Header/>
        <Router>
            <Routes>
                <Route exact path='/form' element={ <Formulario/>}/>
                <Route exact path='/' element={<Home/>} />
            </Routes>
        </Router>
        </>
    )
}

export default App