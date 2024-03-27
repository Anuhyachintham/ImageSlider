import { useState,useEffect } from "react";


import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider=({url})=>{

    const[images,setImages]=useState([])
    const[error,setError]=useState(null)
    const[loading,setLoading]=useState(false)
    const[currentslide,setCurrentSlide]=useState(0)

    useEffect(()=>{
        fetchUrl()
    },[url])
    
    const fetchUrl= async()=>{
        try{
            setLoading(true)
        const response=await fetch(url);
        const data=await response.json();
        setImages(data)
        setLoading(false)
        }
        catch(error){
            setError(error.message);
            setLoading(false)
        }
    }
    console.log(images);
    const handlePrevious=()=>{
       
setCurrentSlide(currentslide===0?images.length-1:currentslide-1)
    }
    const handleNext=()=>{
setCurrentSlide(currentslide===images.length-1?0:currentslide+1)
    }
    return(<div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left"/>
{images && images.length?images.map((imageItem,index)=>{return <img className={currentslide===index?"current-image":"current-image hide-current-image"} key={imageItem.id} src={imageItem.download_url} alt={imageItem.download_url}/>}):null}
   
   
   <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right"/>
   <span className="circle-indicators">
{images && images.length?images.map((_,index)=><button className={currentslide===index?"current-indicator":"current-indicator inactive-indicator"} onClick={()=>setCurrentSlide(index)} key={index}></button>):null}
   </span>
    </div>)
}

export default ImageSlider