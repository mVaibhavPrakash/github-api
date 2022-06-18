import React,{ useEffect,useState} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";

const Secondpage = () => {

  const worke = new WebWorker(worker);
  const [state,dispatch]=customHook()

  useEffect(() =>{
    console.log(state.apiResult)
    axios({
        method: 'GET',
        url: `http://localhost:8082/getall`,
      }).then((res) => {
            if(res.status===200){
              const result = res.data
              console.log(result)
              worke.postMessage(result)
              worke.addEventListener("message", event => {
                dispatch({type:'Result',payload:event.data})
              });
              if(!state.isApiResultReady)
              dispatch({type:'Is Fetching'})
            }
            else{
              dispatch({type:'Error'})
            }
      }).catch((err) =>{
            dispatch({type:'Error'})
      })
    },[])
  return (
    <>
      <div style={{width:'100vw',height:'100px',borderBottom:'1px solid white',}}>
          <Link style={{lineHeight:'100px',marginLeft:'12.5vw',marginRight:'12.5vw'}} to={'/'}>First Page</Link>
          <Link to={'/chart'}>Chart</Link>
      </div>
      {state.error ? <p style={{marginTop:'50px',marginLeft:'50px',fontSize:'0.6rem'}}>{state.error}</p>:''}
      {
      state.isApiResultReady ? 
        <>
          {
          state.apiResult.map((entry,index) =>{
           return <div className='parent' key={entry.id}>
                <a className='username' href={`https://github.com/${entry.username}`}>{entry.username}</a>
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