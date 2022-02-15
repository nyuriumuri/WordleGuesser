import Square from "./square";
import "./styles.css"
import { wordlist } from "./wordlist";
import { useState } from "react";

const solution = ["","","","",""];
const miss = [new Set(),new Set(),new Set(),new Set(),new Set()]
let pruner = [...wordlist];
let words = [...wordlist];
let possible = new Set();
let wrong = new Set();
let buffer= [{},{},{},{},{}];
var pruning = true;
export default function Row(){
    const [guess, setGuess] = useState('arose');
    function handleSquareChange(index, letter, mode){
        buffer[index] = {
            letter: letter,
            mode: mode
        };
        return;
    }

    function getNext(){
        let flag = true;
        
        while(flag){
            flag = false;
            (possible.size >= 3 || pruner.length<1)? pruning = false : pruning=true;
            // console.log(pruning);
            let list;
            pruning? list = pruner: list = words;
            for(let i in list[0]){
                let letter = list[0][i];
                // console.log(letter);
                if(wrong.has(letter)){
                    flag = true;
                    break;
                }
            }
            for(let letter of possible){
                if(pruning && pruner[0].includes(letter) ){
                    flag = true;
                    break;
                }
                if(!words[0].includes(letter) && !pruning){
                    flag = true;
                    break;
                }
            }
            for(let i=0; i<5; i++){
                if(!pruning && solution[i]!="" && solution[i]!=words[0][i]){
                    flag = true;
                    break;
                }

                if(!pruning && miss[i].has(words[0][i])){
                    flag=true;
                    break;
                }
            }
            // console.log(flag);
            if(flag){
                pruning? pruner.splice(0,1) : words.splice(0,1);
                // console.log(pruner[0]);
            }

        }

        pruning? setGuess(pruner[0]) : setGuess(words[0]);
    }

    function handleSubmit(e){
        e.preventDefault();
        for(let i =0; i<5; i+=1){
            let x = buffer[i];
            // console.log(x.mode);

            switch(x.mode){
                case "absent":
                    if(possible.has(x.letter)){
                        miss[i].add(x.letter)
                    }
                    else{
                        wrong.add(x.letter);
                    }
                    break;
                case "present":
                    possible.add(x.letter);
                    wrong.delete(x.letter);
                    miss[i].add(x.letter);
                    break;
                case "correct":
                    possible.add(x.letter);
                    miss[i].delete(x.letter);
                    wrong.delete(x.letter);
                    solution[i]=x.letter;
                    break;
            }
        }

      getNext();
        return;
    }

    function handleKeyPress(e){
        console.log("hi");
        if(e.key=='Enter'){
            handleSubmit();
        }
    }

    function skip(){
        pruning? pruner.splice(0,1) : words.splice(0,1);
        getNext();
    }
   
    return(

        <div className="squarerow">
            {/* <input type="submit" onKeyPress={handleKeyPress}></input> */}
            <Square index="0" letter={guess[0]} handleChange={handleSquareChange} mode="absent"></Square>
            <Square index="1" letter={guess[1]} handleChange={handleSquareChange} mode="absent"></Square>
            <Square index="2" letter={guess[2]} handleChange={handleSquareChange} mode="absent"></Square>
            <Square index="3" letter={guess[3]} handleChange={handleSquareChange} mode="absent"></Square>
            <Square index="4" letter={guess[4]} handleChange={handleSquareChange} mode="absent"></Square>
            <div className="break"></div>
            <button  className="square circle" onClick={handleSubmit} onKeyPress={(e)=>handleKeyPress(e)}> {">>"} </button>
            <button  className="square circle skip" onClick={skip} onKeyPress={(e)=>handleKeyPress(e)}> {"X"} </button>

        </div>
    )
}