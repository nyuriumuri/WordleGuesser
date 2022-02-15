import { useState, useEffect} from "react"
import "./styles.css"


export default function Square(props){
    const [mode, setMode] = useState(props.mode);
    const [classname, setClass] = useState("square absent");
    useEffect(() =>{
        setMode("absent")
        setClass("square absent")
        props.handleChange(props.index, props.letter, "absent");
    }, [props]);
    
   
    async function handleClick(){
        let newmode = "absent";
        if (mode == "absent"){
            newmode = "present"
        }
        else if (mode=="present"){
            newmode = "correct"
        }
       await props.handleChange(props.index, props.letter, newmode);
       setMode(newmode);
       setClass("square "+newmode);
    }

    return(

        <div className={classname} onClick={()=>handleClick()}>{props.letter}</div>

    )
}