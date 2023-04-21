import React from "react";
import { useState } from "react";
import { useAppContext } from '../variables'

import NewMenuElementForm from "./NewMenuElementForm";
import { useEffect } from "react";

export default function Menu({menu, handleClick, handleNewChildren, handleRenameMenu}) {

  const [menuVariable, setMenuVariable] = useState(menu)
  const [newMenuElement, setNewMenuElement] = useState({})

  let onlyOne = false;
  let prevDeep = null;
  let newChildrenName = null;
  let newMenuName = null;
  
  //Ez az ellenőrzés biztosítja, hogy a rekurzió leálljon, ha egy menüelemnek nincs gyermeke
  if (!menu || !menu.length) return null;

  const newInputValueSubmit = (e, element) => {
    e.preventDefault();

    console.log('Hozott element:')
    console.log(element)
    
    console.log('New name:')
    console.log(newMenuElement.newname)
    
    var foundIndex = menuVariable.findIndex(x => x.id == element.id);
    
    console.log('FOUND element:')
    console.log(foundIndex)

    let newElement = element;
    newElement.name = newMenuElement.newname
    setNewMenuElement({})
    
    console.log('Felépít element::')
    console.log(menuVariable[foundIndex])
    
    menuVariable[foundIndex] = newElement;
    
    console.log(menuVariable);
    setMenuVariable(menuVariable)

    /*
    let newRow = [
    {
      'id': 1001,
      'deep': 0,
      'name': 'JEEE'
    }];
    */

    //window.location.reload(true)
    //menu[foundIndex] = item;
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
    handleClick,
    handleNewChildren,
    handleRenameMenu
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

  const counterDeep = (deep) => {
    if (prevDeep == null) {
      onlyOne = true;
      prevDeep = deep;
    } else {
      onlyOne = (prevDeep === deep) ? false : true;
    }
  }

  return menuVariable.map((item) => (
        
    <div key={item.id} >
      {counterDeep(item.deep)}
      {onlyOne ? (
        <NewMenuElementForm {...NewMenuElementProps} 
          element = {item}
          onlyOne={onlyOne}
          hiddenClass={hiddenFunction(item.deep)}
          bgColor={colorFunction(item.deep)}
        />
      ) : (
        <></>
      )}

      <React.Fragment>
        
        <div
          id={item.id}
          style={{marginTop:0, paddingTop:0, paddingLeft: 10, marginLeft: 15 * item.deep }}
          className={`flex justify-between items-baseline ${colorFunction(item.deep)} ${hiddenFunction(item.deep)} ${boldFunction(item.child)} rounded-lg m-1 p-1`}
        >
          <span
            onClick={() => handleClick(item.id)} 
            className={`hover:cursor-pointer`}
          >
            {item.name}
          </span>
          <div className="text-end">
            <input
              type="text"
              name="newMenuName"
              placeholder={item.name}
              autoComplete="off"
              className="inline-block ml-1 mt-1 px-1 py-1 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
              onChange={(e) => newMenuName = e.target.value}
              style={{'width':'35%'}}
            />
            <button
              onClick={() => handleRenameMenu(item, newMenuName)}
              className={`text-end inline bg-white opacity-70 hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 ml-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>ren
            </button>
          </div>
          <div className="text-end">
            <input
              type="text"
              name="newChildrenName"
              placeholder={item.id}
              autoComplete="off"
              className="inline-block ml-1 mt-1 px-1 py-1 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
              onChange={(e) => newChildrenName = e.target.value}
              style={{'width':'35%'}}
            />
            <button
              onClick={() => handleNewChildren(item, newChildrenName)}
              className={`text-end inline bg-white opacity-70 hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 ml-1 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>child
            </button>
          </div>
        </div>

        <Menu {...menuProps} menu={item.child} />

      </React.Fragment>
    </div>
    
  ));
}
