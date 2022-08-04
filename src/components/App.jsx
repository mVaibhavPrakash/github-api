import { Suspense} from 'react'
import {Routes,Route} from 'react-router-dom'
import Spinner from './Spinner';
import Profile from './Profile';
import Secondpage from './Secondpage';
import Landingpage from './Landingpage';
const App = () => {
    return (
        <div className='app'>
        <div className="app-container">
            <Suspense fallback={<Spinner/>}>
                <Landingpage/>
                <Profile/>
                <Secondpage/>
            </Suspense>
        </div>
        </div>
    )
}

export default App
