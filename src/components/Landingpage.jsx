import React,{ useEffect,useState} from 'react';
import axios from 'axios'
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";

const Landingpage = () => {

  const worke = new WebWorker(worker);
  const [state,dispatch]=customHook()

  useEffect(() =>{
  axios({
      method: 'GET',
      url: `https://api.github.com/users/${state.username}/repos`,
    }).then((res) => {
          if(res.status===200){
            const result = res.data
            worke.postMessage(result)
            worke.addEventListener("message", event => {
              dispatch({type:'Result',payload:event.data})
            });
            dispatch({type:'Is Fetching'})
          }
          else{
            dispatch({type:'Error'})
          }
    }).catch((err) =>{
          dispatch({type:'Error'})
    })
  },[state.username])

  return(
    <>
      <div id='nav'>
        <div className='lpage'>
          <div className='some'>
            <input id='search' placeholder='Enter username to search' type='text' value={state.formInput} onChange={(e) => dispatch({type:'Form Input',payload:e.target.value})}/>
            <button id='search-btn' onClick={e => dispatch({type:'Set Username',payload:state.formInput})}>Search User</button>
          </div>
        </div>
      </div>

      {state.error ? <p id='error'>{state.error}</p> : ''}
      {
      state.isApiResultReady ? 
        <>
          <img id='img' src={`https://ghchart.rshah.org/${state.username}`} loading='lazy'/>
          <Cards data={state.apiResult}/>
        </> : 
        <Spinner/>
      }
  </>
  )
};

export default Landingpage;
