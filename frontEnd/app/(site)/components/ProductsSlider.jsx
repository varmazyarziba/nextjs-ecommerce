import pre from '/public/images/previous.png'
import next from '../public/images/next.png'
import Image from 'next/image'
import ProductItem from '../components/ProductItem'
import { toast } from 'react-toastify'
import {Store} from '../context/cart'
import { useContext,useEffect, useState } from 'react'

export default function ProductsSlider({products}){

    const {state , dispatch} = useContext(Store)
    const {cart} = state
    
    function addToCartHandler (product)
    {
      const existingItem = cart.cartItems.find(
        (item) =>item.slug === product.slug
      )
      const qty = existingItem ? existingItem.qty +1 :1
      dispatch({type:'ADD_TO_CART' , payload:{...product,qty}})
      toast.success('Product is added ')
    }
  const [counter,setCounter]=useState(0)
   
    let showProduct = products.slice(counter,counter+5)
      
    useEffect(()=>{
      const timer = setTimeout(()=>{
          clickNext ();
      },5000);
      return ()=>{
          clearTimeout(timer)
      };
      },[counter]);

    console.log(counter)
  
    const clickNext=()=>
         {
          counter==0 
          ?setCounter(3) 
          :setCounter(counter-1)
            
         }
       
         const clickPrev =()=>
          {
            counter ===(products.length -5 )
            ? setCounter(0)  
            : setCounter(counter+1)
         }
  
      
    return(
        <div>
      <h2 className='text-center font-serif text-4xl pb-12'>Now Trending</h2>
    <div className='flex items-center'>
    
      <div onClick={clickPrev} className="cursor-pointer">
                            <Image 
                            src={pre}
                            alt=''
                            width={40}
                            height={40}
                            />
    
                        </div>
    <div className=' font-serif container grid grid-cols-1 gap-6 sm:grid-cols-3 sm:row-span-4 md:grid-cols-3 lg:grid-cols-5'>
     
      {showProduct.map((pItem)=>(
        
        <ProductItem 
        AddToCart ={addToCartHandler}
        item ={pItem} 
        key={pItem.slug}>

        </ProductItem>
      ))}
       
    </div>
     <div onClick={clickNext} className=" cursor-pointer">
                            <Image
                             src={next}
                             alt=''
                            width={40}
                            height={40}
                             />
    
                        </div>
    </div>
        </div>
    )

}