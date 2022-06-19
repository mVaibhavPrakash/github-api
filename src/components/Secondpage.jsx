import React,{ useEffect} from 'react';
import {Link} from 'react-router-dom'
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";
import { AllUserApiCall } from '../js/axios';

const Secondpage = () => {

  const work = new WebWorker(worker);
  const [state,dispatch]=customHook()

  useEffect(() =>{
    AllUserApiCall(dispatch,work,state)
    },[])
  return (
    <>
      <div style={{width:'100vw',height:'100px',borderBottom:'1px solid white',}}>
          <Link style={{lineHeight:'100px',marginLeft:'12.5vw',marginRight:'12.5vw'}} to={'/'}>Single User Data</Link>
          <Link to={'/chart'}>Bar Chart</Link>
      </div>
      
      {
        /*Error handling for api error */
        state.error ? <p style={{marginTop:'50px',marginLeft:'50px',fontSize:'0.6rem'}}>{state.error}</p>:''
      }
      {
        state.isApiResultReady ? 
          <>
            {
            state.apiResult.map((entry,index) =>{
            return <div className='parent' key={entry._id}>
                  <a className='username' target='_blank' href={`https://github.com/${entry.username}`}>{entry.username}</a>
                  <Cards data={entry.repositories}/>
              </div>
            })
            }
          </> : 
          <Spinner/>
      }
    </>
  )
}

export default Secondpage