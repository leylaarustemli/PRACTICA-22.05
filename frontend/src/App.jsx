
import { RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import './App.css'
import MainContext from './Context/Context'
import { useEffect, useState } from 'react'
import ROUTES from './Routes/routes'
import axios from 'axios';

function App() {
const Router=createBrowserRouter(ROUTES)
const[data,setData]=useState([])
const[basket,setBasket]=useState([])
const contextData={
  data,setData,basket,setBasket,addToBasket
}
useEffect(()=>{
axios.get("http://localhost:8080/api/products").then(res=>{
  setData([...res.data])
})
},[])

function addToBasket(id){
  let basketItem=basket.find(item=>item._id==id)
 
  if(basketItem){
    basketItem.count++
    basketItem.totalPrice+=basketItem.price
    setBasket([...basket])
  }
  else{
    let target=basket.find(item=>item._id==id)
    let newItem={
      ...target,count:1,totalPrice:target.price
    }
    console.log(target);
    setBasket([...basket])
  }
  console.log("item");
}




  return (
    <MainContext.Provider value={contextData}>
      <RouterProvider router={Router}/>
    </MainContext.Provider>
  )
}

export default App
