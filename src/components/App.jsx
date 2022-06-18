import { Suspense} from 'react'
import {Routes,Route} from 'react-router-dom'
import Spinner from './Spinner';
import Landingpage from './Landingpage';
import Secondpage from './Secondpage'
import BarGraph from './BarGraph';
const App = () => {
    return (
        <div className='app'>
        <div className="app-container">
            <Suspense fallback={<Spinner/>}>
                <Routes>
                    <Route path='/' element={<Landingpage/>}/>
                    <Route path='/all' element={<Secondpage/>}/>
                    <Route path='/chart' element={<BarGraph/>}/>
                </Routes>
            </Suspense>
        </div>
        </div>
    )
}

export default App
