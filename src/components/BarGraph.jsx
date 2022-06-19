import {useEffect,useState} from 'react'
import Chart from 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import { BarGraphApiCall } from '../js/axios'
import { Data } from '../js/graphdata'

const BarGraph = () => {
    const [state,setState] = useState([])
    const [IsGraphCreated,setGraphState] = useState(false);
    const [Error,setError] = useState('')
    useEffect(() =>{
        if(IsGraphCreated){
            const canvas = document.getElementsByTagName('canvas')[0]
            canvas.style.width='800px'
            canvas.style.height='700px'
            console.log(canvas)
        }
        !IsGraphCreated? BarGraphApiCall(setState,setGraphState,setError) : ''
    },[IsGraphCreated])

    const finalData=Data(state);

    
  return (
    finalData ? 
    <>
      <div style={{width:'100vw',height:'100px',borderBottom:'1px solid white',}}>
          <Link style={{lineHeight:'100px',marginLeft:'12.5vw',marginRight:'12.5vw'}} to={'/'}>Single User Data</Link>
          <Link to={'/all'}>All User Data</Link>
      </div>
      {
        Error ? <p style={{color:'white',fontSize:'15px',marginTop:'10px',textAlign:'center'}}>{Error}</p> :''
      }
      <p style={{color:'white',fontSize:'15px',marginTop:'10px',textAlign:'center'}}>Total Count : {state[1].reduce((a,b)=>a+b)}</p>
      <div style={{height:'0.7vh',width:'70vw',margin:'0 auto'}}>
        <Bar data={finalData} options={{responsive:true}} />
      </div>
    </>
    : <Spinner/>
  )
}

export default BarGraph