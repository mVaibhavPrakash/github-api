import { useReducer } from "react";
const customHook = () =>{
    const [state, dispatch] = useReducer(Reducer,{
        username :'mvaibhavprakash',
        isApiResultReady : false,
        apiResult : '',
        error :''
    })

    return [state,dispatch];
}

const Reducer = (state,action) =>{
    switch (action.type) {
        case 'Set Username':
            return {...state,username:action.payload}
        case 'Form Input':
            return {...state,formInput:action.payload}
        case 'Is Fetching':
            return {...state,isApiResultReady :!state.isApiResultReady}
        case 'Result':
            return {...state,apiResult:action.payload}
        case 'Error':
            return {...state,error:'Error during fetching the result, kindly try again or try with different username'}
        default:
            return state
    }
}

export default customHook;