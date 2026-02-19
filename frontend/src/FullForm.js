import {useState,useRef} from "react";
import axios from "axios";

function FullForm(){

	const rWord=useRef();
	const [word,setWord]=useState("");
	const [msg,setMsg]=useState("");

	const hWord=(event)=>{setWord(event.target.value.toUpperCase());}

	const find=(event)=>{
		event.preventDefault();
		
		if(word.trim()===""){
			alert("Word cannot be empty");
			setMsg("");
			rWord.current.focus();
			return;
		}
			

		let url="https://acronym-buddy.onrender.com/find";
			axios.get(url,{params:{word:word}})
		.then(
			(res)=>{
				if(res.data.fullform){
			setMsg(res.data.fullform);
		}
		else{
                    setMsg(res.data.message);
                }

                setWord(""); 
            })
            .catch((err) => {
                setMsg("Server error. Try again.");
                console.log(err);
            });
    };
return(
<>

<div className="container">
<h1>📚 Acronym Buddy</h1>
<form onSubmit={find}>
	<label>Enter The Acronym</label><br/>
	<input type="text"	ref={rWord}	onChange={hWord}	value={word}/><br/><br/>
	<input type="Submit" value=" FullForm ?"/><br/><br/>

	<h2>{msg}</h2>
</form>
</div>
</>
)
}

export default FullForm;
