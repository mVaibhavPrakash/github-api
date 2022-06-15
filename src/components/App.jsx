import { Suspense} from 'react'
import {Routes,Route} from 'react-router-dom'
import Spinner from './Spinner';
import Landingpage from './Landingpage';
const App = () => {
    return (
        <div className='app'>
        <div className="app-container">
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/' element={<Landingpage/>}/>
                </Routes>
            </Suspense>
        </div>
        </div>
    )
}

export default App
