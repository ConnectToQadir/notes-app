import React, { useState,useEffect } from "react";

const Home = () => {


  var [notes, setNotes] = useState([]);
  const fetchNotes = async () =>{
    var res = await fetch('http://localhost:5000/api/notes')
    res = await res.json()

    setNotes(res.message)
  }
  

  useEffect(()=>{
    fetchNotes()
  },[notes])




  var [title,setTitle] = useState('')
  var [desc,setDesc] = useState('')


  const submitHandler =async (e) =>{
    e.preventDefault()
    var res = await fetch('http://localhost:5000/api/notes',{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({title,desc})
    })

    res = await res.json()

    if(res.success){
      setDesc("")
      setTitle("")
    }else{
      alert(res.message)
    }


  }


  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={submitHandler} className="border-[1px] border-slate-200 my-10 p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Add <span className="text-blue-600">Notes</span>
        </h2>

        <input
          className="block focus:outline-blue-600 w-full border-[1px] p-2 rounded-sm mb-2 border-slate-300"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
        <textarea
          className="block focus:outline-blue-600 w-full border-[1px] p-2 mb-2 rounded-sm border-slate-300"
          placeholder="Description"
          required
          value={desc}
          onChange={(e)=>setDesc(e.target.value)}
        />

        <button className="py-1 px-2 bg-blue-600 rounded-sm text-white">
          Submit
        </button>
      </form>

      <div>
        {notes.map((v,i) => {
          return (
            <div key={v._id} className="border-[1px] border-slate-200 p-4 my-4">
              <h2 className="mb-1 font-semibold">{v.title}</h2>
              <p className="text-xs">
              {v.desc}
              </p>

              <div className="flex justify-end">
                <i className="bx bx-edit text-blue-600"></i>
                <i className="bx bx-trash text-red-700"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
