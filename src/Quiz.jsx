import { useEffect, useState } from "react";
import questionData from "../question.json";

export const Quiz = () => {

const [currentQuestion,setCurrentQuestion]=useState(0);
const [score,setScore]=useState(0);
const [showScore,setShowScore]=useState(false);
const [timer,setTimer]=useState(10);

useEffect(()=>{
 let interval;
 if(timer>0 && !showScore) {
 interval=setInterval(()=>{
  setTimer((preTimer)=>preTimer -1);
 },1000)
 }else{
    clearInterval(interval);
    setShowScore(true);
 }
 return()=>clearInterval(interval);
 
},[timer,showScore]);

const handleAnswerClick=(selectedOption)=>{
    if(selectedOption===questionData[currentQuestion].cooretOption){
        setScore((prevScore)=> prevScore +1)
    }
    if(currentQuestion < questionData.length-1){
        setCurrentQuestion((prevQuestion)=> prevQuestion +1)
        setTimer(10);
    }
    else{
        setShowScore(true)
    }
}


  return (
    <div className='quiz-app'>
        {showScore?(
            <div className="score-section" >
    <h2>Your Score:{score}/{questionData.length}</h2>
    <button onClick={()=>{
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setTimer(10);
    }}>Restart</button>
        </div>
        ):(
            <div className="question-section">
            <h2>Question {currentQuestion+1}</h2>
            <p>{questionData[currentQuestion].question}</p>
            <div className="options">
                {questionData[currentQuestion].option.map((item,index)=>(
                    <button key={index} onClick={()=>handleAnswerClick(item)}>{item}</button>
                ))}
            </div>
            <div className="timer">Time: 
                <span> {timer}s</span>
            </div>
        </div>
        )}
        
    </div>
  )
}
