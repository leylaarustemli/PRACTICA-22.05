
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
  data,setData,basket,setBasket,addToBasket,deleteBasket
}
useEffect(()=>{
axios.get("http://localhost:8080/api/products").then(res=>{
  setData([...res.data])
})
},[])

function addToBasket(id) {
  let target = data.find(item => item._id === id);

  let basketItem = basket.find(item => item._id === id);

  if (basketItem) {
    basketItem.count++;
    basketItem.totalPrice += target.price;
    setBasket([...basket]);
  } else {
    let newItem = {
      ...target,
      count: 1,
      totalPrice: target.price
    };
    setBasket([...basket, newItem]);
  }
}

function deleteBasket (id){
 let target=basket.find((x)=>x._id==id);
 if(target.count>1){
  target.count--,
  target.totalPrice=target.price*target.count;
  setBasket([...basket])
 }
 else{
  let indexOfTarget=basket.indexOf(target);
  basket.splice(indexOfTarget,1);
  setBasket([...basket])
 }
}



  return (
    <MainContext.Provider value={contextData}>
      <RouterProvider router={Router}/>
    </MainContext.Provider>
  )
}

export default App
