import React, { useState } from 'react'
import Menu from "./Menu";

export function AdminMenu({ menu }) {

  const [selectedMenuId, setSelectedMenuId] = useState(null)

  const [menuVariable, setMenuVariable] = useState(menu)
  const [newMenuElement, setNewMenuElement] = useState({})

  // recursive menu variables
  let findId;
  let findDeep = 0;
  let menuClose;
  let lastMenuElement;

  const rekursive = (element, idValue) => {

    if (element.deep === findDeep) {
      // returns to the pressed id level
      findId = false;
    }

    if (menuClose) {
      // close all level deep childrens
      if (findId) {
        document.querySelector(`[id="${element.id}"]`).classList.add('hidden-div')
        if (document.querySelector(`[id="form_${element.id}"]`)) {
          document.querySelector(`[id="form_${element.id}"]`).classList.add('hidden-div')
        }
      }
    } else {
      // open only to one level children
      if (findId && findDeep+1 === element.deep) {

        document.querySelector(`[id="${element.id}"]`).classList.remove('hidden-div')
        if (document.querySelector(`[id="form_${element.id}"]`)) {
          document.querySelector(`[id="form_${element.id}"]`).classList.remove('hidden-div')
        }
      }
    }
    
    if (element.id === idValue) {
      // Finded the clicked id!
      // I check whether the menu opens or closes
      if (element.child && element.child[0]) {
        // if element child have class 'hidden-div' now open the menu. Not have now closed the menu.
        let classText = document.querySelector(`[id="${element.child[0].id}"]`).className
        menuClose = (classText.search('hidden-div') !== -1) ? false : true;
      } else {
        lastMenuElement = true;
      }
      findId = true;
      findDeep = element.deep;
    }

    // invate element rekursive
    if (element.child) {
      element.child.forEach(childElements => {
        rekursive(childElements, idValue)
      });
    }
  }
    
  const menuHideShow=(idValue) => {
    menuVariable.forEach(element => {
      findId = false;
      rekursive(element, idValue)
    });
  }

  // Hook handleClick
  const handleClick = (id) => {
    menuHideShow(id)
    if (lastMenuElement) {  
      setSelectedMenuId(id)
      lastMenuElement = false;
    }
  };

  const newInputValue = (e) => {
    setNewMenuElement({
      ...newMenuElement,
      [e.target.name]: e.target.value
    });
  };

  const newInputValueSubmit = (e, element) => {
    e.preventDefault();

    var foundIndex = menuVariable.findIndex(x => x.id === element.id);
    
    let newElement = element;
    newElement.name = newMenuElement.newname
    setNewMenuElement({})
        
    menuVariable[foundIndex] = newElement;
    setMenuVariable(menuVariable)

  };
  
  const menuProps = {
    handleClick,
    newInputValue,
    newInputValueSubmit
  };

  return (
    <div className='mt-4'>
      <div className='w-100'>
        <Menu {...menuProps} menu={menuVariable} lastMenuElement={lastMenuElement} />
      </div>
      <div className='w-100 bg-gray-300 p-2 mt-4 align-top rounded-lg'>
      {selectedMenuId ? ( <h3 className='uppercase font-medium'>Selected menu id: {selectedMenuId}</h3> ): (<></>) }
        <p>This is uninteresting. I just left it in the code. This is an exercise for a recursive menu. can be deleted.</p>
      </div>
    </div>
  );
}