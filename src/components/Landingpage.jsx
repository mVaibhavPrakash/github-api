import React,{ useEffect} from 'react';
import Cards from './Cards';
import Spinner from './Spinner'
import customHook from '../js/customHook';
import '../css/landingpage.css'
import worker from "../js/worker.js";
import WebWorker from "../js/workerSetup";
import { Link } from 'react-router-dom';
import { UserApiCall } from '../js/axios';
import Profile from './Profile';
import Secondpage from './Secondpage';

const Landingpage = () => {

  const [state,dispatch]=customHook()

  return(
    <>
      <div id='nav'>
        <div className='lpage'>
          <div className='some'>
            <input id='search' placeholder='Enter username to search' type='text' value={state.formInput} onChange={(e) => dispatch({type:'Form Input',payload:e.target.value})}/>
            <button id='search-btn' onClick={e =>{ dispatch({type:'Set Username',payload:state.formInput});dispatch({type:'Is Fetching'});dispatch({type:'Form Input',payload:''})}}>Search User</button>
          </div>
        </div>
      </div>
  </>
  )
};

export default Landingpage;
