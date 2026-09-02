'use client'
import { useState,useEffect } from 'react'
import Image from 'next/image'
import Description from '../components/description';
import pre from '../public/images/previous.png'
import next from '../public/images/next.png'
const Carousel = ({products}) => {
  
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const clickNext=()=> {
         currentIndex ===products.length -1 
         ? setCurrentIndex (0)
         :setCurrentIndex (currentIndex+1)
     }
     const clickPrev =()=>{
         currentIndex===0 
         ? setCurrentIndex(products.length -1)
         :setCurrentIndex(currentIndex -1)
     }
    useEffect(()=>{
     const timer = setTimeout(()=>{
         clickNext ();
     },5000);
     return ()=>{
         clearTimeout(timer)
     };
     },[currentIndex]);

  return (
     <div className= 'flex'>
       

        <div className=' grid place-items-center grid-cols-2  w-full mx-auto max-w-5xl shadow-2xl rounded-2xl'>
          <div className={`w-full flex justify-center row-span-3 items-centern gap-4 duration-5000 transition-transform ease-in-out  rounded-2xl`}
          >
          {products.map((item,index)=>(
              <div className={`${index===currentIndex 
                ?'block w-full h-[80vh] object-cover transition-all duration-5000 ease-in-out'
                :'hidden'
            }`} key={index} >
              <Image
              src={item.image}
              alt=""
              width={450}
              height={450}
              className='w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl '
              
              />
              
           </div>  
            
           ))} 
          
         </div>
         <Description 
           products={products}
           clickNext={clickNext}
           clickPrev={clickPrev}
           currentIndex ={currentIndex}
           />
       </div>
       </div>
  );
};

export default Carousel;
