import React,{ useEffect,useState} from 'react';
import axios from 'axios'
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";
import { Link } from 'react-router-dom';

const Landingpage = () => {

  const worke = new WebWorker(worker);
  const [state,dispatch]=customHook()

  useEffect(() =>{
  axios({
      method: 'POST',
      url: `http://localhost:8082/username`,
      data: {
        username: state.username
      },
      withCredentials:true
    }).then((res) => {
          if(res.status===200){
            const result = res.data
            worke.postMessage(result)
            worke.addEventListener("message", event => {
              dispatch({type:'Result',payload:event.data})
            });
            if(!state.isApiResultReady)
            dispatch({type:'Is Fetching'})
          }
          else{
            !state.isApiResultReady ? dispatch({type:'Is Fetching'}) : null
            dispatch({type:'Error'})
          }
    }).catch((err) =>{
      !state.isApiResultReady ? dispatch({type:'Is Fetching'}) : null
          dispatch({type:'Error'})
    })
  },[state.username])

  return(
    <>
      <div id='nav'>
        <div className='lpage'>
          <div className='some'>
            <input id='search' placeholder='Enter username to search' type='text' value={state.formInput} onChange={(e) => dispatch({type:'Form Input',payload:e.target.value})}/>
            <button id='search-btn' onClick={e =>{ dispatch({type:'Set Username',payload:state.formInput});dispatch({type:'Is Fetching'});dispatch({type:'Form Input',payload:''})}}>Search User</button>
            <Link to={'/all'} style={{lineHeight:'100px',marginLeft:'7.5vw',marginRight:'12.5vw'}} >All User Data</Link>
            <Link to={'/chart'}>Bar Chart</Link>
          </div>
        </div>
      </div>

      {state.error ? <p id='error'>{state.error}</p> : ''}
    {state.isApiResultReady ? 
        state.apiResult.map((entry,index) =>{
            return <div key={entry.id}>

              {/* Lazy loading image */}
            <img id='img' src={`https://ghchart.rshah.org/${entry.username}`} loading='lazy'/>
              
              <div className='parent'>
                  <a className='username' href={`https://github.com/${entry.username}`}>{state.username}</a>
                  <Cards data={entry.repositories}/>
              </div>
            </div>
        }) : 
        <Spinner/>
    }
  </>
  )
};

export default Landingpage;
