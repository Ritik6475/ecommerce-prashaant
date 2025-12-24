"use client";
import { useState,useEffect } from 'react'
import React from 'react'



const Design = () => {


  return (
  
  <div>      
       <h1 className='text-red-600 text-4xl '>This Shirt is looking so elegant</h1>
       <p>This Tshirt is looking so elegant</p>
    <div
   className="
  bg-gradient-to-r from-red-700 via-pink-500 to-yellow-500
  ring-1 ring-blue-500 w-1/3 mx-auto sm:px-1 sm:text-xs sm:text-red-500 md:px-2 md:text-xl md:text-red-500 lg:px-4 lg:text-lg lg:text-red-500 xl:px-8 xl:text-2xl xl:text-red-500 2xl:px-4 2xl:text-6xl 2xl:text-red-500">
  
  <p >One</p>
  <p >Two</p>
  <p >Three</p>
  <p>Four</p>
  <p>Five</p>


  </div>

<h1 class="text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text">
  Gradient Title
</h1>

  <div class="columns-3">
  <p>Lorem ipsum...</p>
  <p>Lorem ipsum...</p>
  <p>Lorem ipsum...</p>
  
</div>

<div class="flex gap-4 display:flex display:grid grid:grid-cols-2">

  <p>Item 1</p>
  <p>Item 2</p>
  <p>Item 3</p>
  <p>Item 4</p>
</div>



<div class="w-1/2 h-1/2 grid grid-cols-2 border-2 border-black-800 gap-1">

<div className='h-15 border-2 border-red-300'>one</div>
<div className='h-15 border-2 border-red-300'>two </div>
<div className='h-15 border-2 border-red-300'>three</div>
<div className='h-15 border-2 border-red-300'>four</div>
<div className='h-15 border-2 border-red-300'>five</div>
<div className='h-15 border-2 border-red-300'>six</div>

</div>


<div className='w-1/4 h-15 border-2 border-red-300'>one</div>

<div className="grid grid-cols-[1fr_3fr] gap-4">    
  <div className="bg-red-300">Sidebar</div>
  <div className="bg-blue-300">Main Content</div>
  
</div>


</div>

  )
}

export default Design