import React from "react";
import { useState } from "react";
import { useAppContext } from '../variables'

import NewMenuElementForm from "./NewMenuElementForm";

export default function Menu({menu, handleClick}) {

  const { deepSwitch, setDeepSwitch } = useAppContext()

  const [newMenuElement, setNewMenuElement] = useState({})

  let onlyOne = false;
  let prevDeep = null;

  //console.log('deepSwitch: ' + deepSwitch);
  
  //Ez az ellenőrzés biztosítja, hogy a rekurzió leálljon, ha egy menüelemnek nincs gyermeke
  if (!menu || !menu.length) return null;

  const newInputValueSubmit = (e, element) => {
    e.preventDefault();
    console.log('SUBMIT INPUT:', newMenuElement)
    console.log('Bring element:', element)
  };

  const newInputValue = (e) => {
    setNewMenuElement({
      ...newMenuElement,
      [e.target.name]: e.target.value
    });
  };

  const NewMenuElementProps = {
    newInputValue,
    newInputValueSubmit
  }

  const menuProps = {
    handleClick
  }

  const colorFunction = (deep) => {
    let color
    if (deep===0) color = 'bg-red-500'
    if (deep===1) color = 'bg-blue-500'
    if (deep===2) color = 'bg-orange-500'
    if (deep===3) color = 'bg-purple-500'
    if (deep===4) color = 'bg-lime-400'
    if (deep===5) color = 'bg-fuchsia-500'
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

  const counterDeep = (deep) => {
    if (prevDeep == null) {
      onlyOne = true;
      prevDeep = deep;
    } else {
      onlyOne = (prevDeep === deep) ? false : true;
    }
    console.log('onlyOne: ' + onlyOne);
  }

  return menu.map((item) => (
    
    <>
    {counterDeep(item.deep)}
    {onlyOne ? (
      <NewMenuElementForm {...NewMenuElementProps} element = {item} onlyOne={onlyOne}/>
    ) : (
      <></>
    )}

    <React.Fragment key={item.id}>
      
      <div
      id={item.id}
      onClick={() => handleClick(item.id)} 
      style={{ paddingLeft: 10, marginLeft: 15 * item.deep }}
      className={`${colorFunction(item.deep)} ${hiddenFunction(item.deep)} ${boldFunction(item.child)} rounded-lg m-1 p-1`}
      >
        <>{item.name}</>
      </div>

      <Menu {...menuProps} menu={item.child} />

    </React.Fragment>
    </>
    
  ));
}
