import {useEffect,useState} from 'react'
import Chart from 'chart.js/auto'
import {Bar} from 'react-chartjs-2'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

const BarGraph = () => {
    const [state,setState] = useState([])
    const [one,setOne] = useState(false);
    useEffect(() =>{
        if(one){
            const canvas = document.getElementsByTagName('canvas')[0]
            canvas.style.width='800px'
            canvas.style.height='700px'
            console.log(canvas)
        }
        !one ? axios({
            method: 'GET',
            url: `http://localhost:8082/chart`,
          }).then((res) =>{
            if(res.status === 200){
                const response = res.data;
                const label = Object.keys(response);
                const data = Object.values(response);
                setState([label,data])
            }
            else{
                console.log('Error')
            }
            setOne(true)
          }):''
    },[one])

    let background=[]

    const finalData = state.length>0 ? {
        labels:state[0],
        datasets:[{
            label:'Language Count',
            data:state[1],
            backgroundColor:["red","green"]
        }]
    } : null

    
  return (
    finalData ? 
    <>
    <div style={{width:'100vw',height:'100px',borderBottom:'1px solid white',}}>
          <Link style={{lineHeight:'100px',marginLeft:'12.5vw',marginRight:'12.5vw'}} to={'/'}>Single User Data</Link>
          <Link to={'/all'}>All User Data</Link>
      </div>
      <p style={{color:'white',fontSize:'15px',marginTop:'10px',textAlign:'center'}}>Total Count : {state[1].reduce((a,b)=>a+b)}</p>
    <div style={{height:'0.7vh',width:'70vw',margin:'0 auto'}}>
        <Bar data={finalData} options={{responsive:true}} />
    </div>
    </>
    : <Spinner/>
  )
}

export default BarGraph