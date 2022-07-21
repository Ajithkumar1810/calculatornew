import { useReducer } from 'react';
import './style.css';
import DigitButton from './DigitButton';
import OperationButton from './OperatonButton';
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
// let f=""
function render(state,{type,payload}){
  switch(type) {
   case ACTIONS.ADD_DIGIT:
    if(state.overwrite){
      return {
        ...state,
        currentOperand:payload.digit,
        overwrite:false
      }
    }
    if(payload.digit === "0" && state.currentOperand === "0"){
       return state
    }
    if(payload.digit === "." && state.currentOperand.includes(".")) {
      return state 
    }
    // if(payload.digit == ".")
    // {
    //   window.location.reload()
    // }
    return {
      ...state,
      currentOperand: `${state.currentOperand || ""}${payload.digit}`,
    } 
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand == null && state.previousoperand == null){
        return state
      }
      if(state.currentOperand == null){
        return{
          ...state,
          operation:payload.operation,
        }
      }
      // if(!(state.previousoperand== null)&& isNaN(state.operation)){
       
      //  return{ ...state,
      //   previousoperand: evaluate(state)+payload.operation,
      //   operation: payload.operation,
      //   currentOperand:null 
      //  }
      // }
      if(state.previousoperand == null){
        return {
        ...state,
        operation: payload.operation,
       
        previousoperand:state.currentOperand ,
        currentOperand:null
        }
      }
      return {
        ...state,
        previousoperand: evaluate(state),
        operation: payload.operation,
        currentOperand:null
      }
    case ACTIONS.CLEAR:
      {
        return {}
      }
    case ACTIONS.DELETE_DIGIT:
      {
        if(state.overwrite)
        {
          return{
            ...state,
            overwrite:false,
            currentOperand:null
          }
        }
        if(state.currentOperand==null)
        {
          return state
        }
        if(state.currentOperand.length==1)
        {
          return{
            ...state,
            currentOperand:null
          }
        }
        return{
          ...state,
          currentOperand:state.currentOperand.slice(0,-1)
        }
      }
    case ACTIONS.EVALUATE:
      {
        if(state.operation == null||
          state.currentOperand==null ||
          state.previousoperand== null)
          {
            return state
          }
          return{
            ...state,
            overwrite: true,
            previousoperand:null,
            operation:null,
            currentOperand:evaluate(state)
          }
      }
  }
}
function evaluate({currentOperand,previousoperand,operation}){
 const prev=parseFloat(previousoperand)
 const curr=parseFloat(currentOperand)
 if(isNaN(prev) || isNaN(curr)){ return ""}
 let computation=""
 switch(operation){
  case "+":
    computation=(prev +curr)
    break
  case "-":
      computation=prev -curr
      break
  case "*":
     computation=prev *curr
     break
  case "/":
    computation=prev /curr
    break
 }
 return computation.toString()
}
const  INTEGER_FORMATER= new Intl.NumberFormat("en-us",{
  maximumFractionDigits:0,
})

function formatoperand(operand){
  if(operand==null){return }
  const [integer,decimal]=operand.split('.')
  if(decimal==null)return INTEGER_FORMATER.format(integer)
  return `${INTEGER_FORMATER.format(integer)}.${decimal}`
}
function App() {
  const [{currentOperand, previousoperand, operatoin}, dispatch] = useReducer(render, {})
  return (
    <div className="App">
      <div align="center" className='topname'>
        <h1 ><b><u>Calculator</u></b></h1>
        </div>
        <div className="calclator-grid">
          <div className='output'>
            <div className='previous-operand'>{ formatoperand(previousoperand)} {operatoin}</div>
              <div className='current-operand'>{formatoperand(currentOperand)}</div>
              </div>
          <button className='span-two' 
          onClick={()=>dispatch({type:ACTIONS.CLEAR})}>
            AC
            </button>
          <button  onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>
            DEL</button>
          <OperationButton operation="/" dispatch={dispatch}/>
          <DigitButton digit="1" dispatch={dispatch}/>
          <DigitButton digit="2" dispatch={dispatch}/>
          <DigitButton digit="3" dispatch={dispatch}/>
          <OperationButton operation="*" dispatch={dispatch}/>
          <DigitButton digit="4" dispatch={dispatch}/>
          <DigitButton digit="5" dispatch={dispatch}/>
          <DigitButton digit="6" dispatch={dispatch}/>
          <OperationButton operation="+" dispatch={dispatch}/>
          <DigitButton digit="7" dispatch={dispatch}/>
          <DigitButton digit="8" dispatch={dispatch}/>
          <DigitButton digit="9" dispatch={dispatch}/>
          <OperationButton operation="-" dispatch={dispatch}/>
          <DigitButton digit="." dispatch={dispatch}/>
          <DigitButton digit="0" dispatch={dispatch}/>
          <button className='span-two' 
            onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>
              =</button>
        
      </div>
     </div>
  );
}


export default App;
