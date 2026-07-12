import { Fragment } from 'react/jsx-runtime';
import './App.css';
import { useEffect, useState } from 'react';

const API_URL ="https://api.imgflip.com/get_memes"

function Meme({item}){
  return(
    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3'>
      <div className="card" >
      <img src={item.url} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <a href={item.url} target='_blank' className="btn btn-primary">Ver Imagen</a>
    </div>
    </div>

    </div>
    
  )
}



function App() {

  useEffect(()=> {
    fetch(API_URL)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          setItems(result.data.memes)
        },
        (error) => {
          console.log("errpr: "+ error)
        }
      )
  },[])

  const [items, setItems] = useState([])
  const [searchInput, setSearchInput] = useState("")
  const searchItems = (searchValue) =>{
    setSearchInput(searchValue)

  }
  return (
    <Fragment>
      <h1 className='alert alert-primary'>Memes!</h1>

      <div className='input-group alert alert-dark mt-3'>
        <input onChange={(e) => searchItems(e.target.value)} type='search'placeholder='Ingrese el nombre del meme' className='form-control'></input>
        <button className='btn btn-primary'>BUSCAR</button>
      </div>
      
      <div className='row'>
        {items.filter(item => item.name.toLowerCase().includes(searchInput.toLowerCase())).map(item => (
          <Meme key={item.id} item={item} />
        ))}
      {/*items.map(item => (
          <Meme key={item.id} item={item} />
      ))*/}
      </div>
      
    
    </Fragment>
  );
}

export default App;
