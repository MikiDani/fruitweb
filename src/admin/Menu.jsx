import React from "react";
import { useState } from "react";

export default function Menu({menu, handleClick, newInputValue, newInputValueSubmit}) {
  
  //Ez az ellenőrzés biztosítja, hogy a rekurzió leálljon, ha egy menüelemnek nincs gyermeke
  if (!menu || !menu.length) return null;

  const menuProps = {
    handleClick,
    newInputValue,
    newInputValueSubmit
  }

  const colorFunction = (deep) => {
    let color
    if (deep===0) color = 'bg-red-500'
    if (deep===1) color = 'bg-blue-500'
    if (deep===2) color = 'bg-orange-500'
    if (deep===3) color = 'bg-purple-500'
    if (deep===4) color = 'bg-lime-400'
    if (deep===5) color = 'bg-fuchsia-500'
    if (deep > 5) color = 'bg-green-300'
    return color;
  }

  const hiddenFunction = (deep) => {
    let returnValue = ''
    if (deep!==0) returnValue = 'hidden-div'
    return returnValue;
  }
  
  const boldFunction = (child) => {
    let returnValue = ''
    if (child)
      returnValue = 'font-bold hover:bg-gray-200'
    return returnValue;
  }

  return menu.map((item) => (
        
    <div key={item.id} >
      
      <React.Fragment>
        
        <div id={item.id} className={`flex justify-center items-center ${hiddenFunction(item.deep)} ${boldFunction(item.child)} rounded-lg m-1 p-1 text-center`} >
          <div className='w-1/2'>
            <div className={`flex justify-between items-center ${colorFunction(item.deep)} rounded-lg`} style={{ marginTop: 0, paddingTop: 0, marginBottom: 0, paddingBottom: 0, paddingLeft: 10, marginLeft: 15 * item.deep }}>
              <span onClick={() => handleClick(item.id)} className={`hover:cursor-pointer`}>
                {item.name}
              </span>
            </div>
          </div>
        </div>

        <Menu {...menuProps} menu={item.child} />

      </React.Fragment>
    </div>
    
  ));
}
