import React from "react";
import { useState } from "react";
import { useAppContext } from '../variables'

import { useEffect } from "react";

export default function Menu({menu, handleClick, newInputValue, newInputValueSubmit}) {

  const [menuVariable, setMenuVariable] = useState(menu)
  
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
    //if (deep!=0) returnValue = 'hidden-div'
    return returnValue;
  }
  
  const boldFunction = (child) => {
    let returnValue = ''
    if (child)
      returnValue = 'font-bold hover:bg-gray-500'
    return returnValue;
  }

  return menuVariable.map((item) => (
        
    <div key={item.id} >
      
      <React.Fragment>
        
        <div
          id={item.id}
          className={`flex justify-between items-center ${hiddenFunction(item.deep)} ${boldFunction(item.child)} rounded-lg m-1 p-1`}
          >
            <div className='w-full grid grid-cols-2'>
              <div className={`flex justify-between items-center ${colorFunction(item.deep)} rounded-tl-lg rounded-bl-lg`}  style={{marginTop:0, paddingTop:0, marginBottom:0, paddingBottom:0, paddingLeft: 10, marginLeft: 15 * item.deep }}>
                <span onClick={() => handleClick(item.id)} className={`hover:cursor-pointer`}>
                  {item.name}
                </span>
              </div>
              <form id={`form_${item.id}`} onSubmit={(e) => newInputValueSubmit(e, item)}>
                <div className="w-100 text-end flex justify-end items-center bg-gray-300">
                  <div className="block bg-purple-400">
                    <div className="inline w-64">
                    <input
                      type="text"
                      name="newname"
                      placeholder={item.id}
                      autoComplete="off"
                      className="inline ml-1 mt-1 px-1 py-1 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
                      onChange={(e) => newInputValue(e)}
                    />
                    </div>
                    <div className="inline w-48">
                    <button 
                      type="submit"
                      className={`inline text-white ${colorFunction(item.id)} hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 ml-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>RENAME
                    </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          
        </div>

        <Menu {...menuProps} menu={item.child} />

      </React.Fragment>
    </div>
    
  ));
}
