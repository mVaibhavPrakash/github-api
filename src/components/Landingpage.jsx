import React,{ useEffect,useState} from 'react';
import axios from 'axios'
import Cards from './Cards';
import '../css/landingpage.css'

const Landingpage = () => {

  const [user, setUser] = useState('mvaibhavprakash')
  const [state, setState] = useState('')
  const [data,setData] = useState('')
  const [Error,setError] = useState('')

  useEffect(() =>{
    
  user !=='' ? axios({
    method: 'GET',
    url: `https://api.github.com/users/${user}/repos`,
  }).then((res) => {
    if(res.status===200){
      const auth = res.data
      setData(auth)
    }
    else{
      setError('Account not available')
    }

  }).catch((err) =>{
    setError('Account not available')
  }):''
},[user])
  return(
    <>
      <div id='nav'>
        <div className='lpage'>
          <div className='some'>
            <input id='search' placeholder='Enter username to search' type='text' value={state} onChange={(e) => {setState(e.target.value); console.log(state)}}/>
            <button id='search-btn' onClick={e => setUser(state)}>Search User</button>
          </div>
        </div>
      </div>
        {user ? <img id='img' src={`https://ghchart.rshah.org/${user}`}/> :''}
      <p id='error'>{Error}</p>
      <Cards data={data}/>
  </>
  )
};

export default Landingpage;
