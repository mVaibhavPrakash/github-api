import React,{ useEffect} from 'react';
import {Link} from 'react-router-dom'
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";
import { UserApiCall } from '../js/axios';

const Secondpage = () => {

  const work = new WebWorker(worker);
  const [state,dispatch]=customHook()

  useEffect(() =>{
    UserApiCall(state,dispatch,work)
    },[])
  return (
    <>
      {
        /*Error handling for api error */
        state.error ? <p style={{marginTop:'50px',marginLeft:'50px',fontSize:'0.6rem'}}>{state.error}</p>:''
      }
      {
        state.isApiResultReady ? 
          <>
            <Cards data={state.apiResult}/>
          </> : 
          <Spinner/>
      }
    </>
  )
}

export default Secondpage