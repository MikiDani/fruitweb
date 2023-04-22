import React, { useState } from 'react'
import Menu from "./Menu";

export function AdminMenu({ menu }) {

  const [selectedMenuId, setSelectedMenuId] = useState(null)

  const [menuVariableState, setMenuVariableState] = useState(menu)

  // ---------
  
  //let testValue = menuVariableState[2].child[0].child[0].child[0].child[0].name
  //console.log(testValue)
  
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
        console.log('Last element!');
        lastMenuElement = true;
      }
      findId = true;
      findDeep = element.deep;
    }

    // invate element rekursive
    if (element.child) {
      //console.log('element.child.length: '+element.child.length);
      element.child.forEach(childElements => {
        rekursive(childElements, idValue)
      });
    }
  }
    
  const menuHideShow=(idValue) => {
    menuVariableState.forEach(element => {
      findId = false;
      rekursive(element, idValue)
    });
  }

  // Hook handleClick
  const handleClick = (id) => {
    console.log('hozott id:', id)
    menuHideShow(id)
    if (lastMenuElement) {
      // selected element
      console.log('Utolsó megnyomva!!! id: '+id)
      setSelectedMenuId(id)
      lastMenuElement = false;
    }
  };

  const handleNewChildren = (item, newchildname) => {
    console.log('NEW CHILD INSERT:')
    console.log('item:') 
    console.log(item)
    console.log('newchildname:'+newchildname)
  };

  const handleRenameMenu = (element, newMenuName) => {
    console.log('RENAME ROW:')

    console.log('hozott element:')
    console.log(element.id)
    
    console.log('New name:')
    console.log(newMenuName)
    
    console.log(menuVariableState)
    
    
    var foundIndex = menuVariableState.findIndex(x => x.id == element.id);
    //var foundIndex = menuVariableState.findIndex(x => { x.id == element.id });
    
    console.log('TALÁLAT:')
    console.log(foundIndex)
    console.log(menuVariableState[foundIndex])

    /*

    let newElement = element;
    newElement.name = newMenuName
    console.log('Gyártott element:')
    console.log(newElement)
    
    
    */
    /*
    menuVariable[foundIndex] = newElement;
    
    console.log(menuVariable);
    setMenuVariable(menuVariable)
    */
    
  };
  
  const menuProps = {
    handleClick,
    handleNewChildren,
    handleRenameMenu
  };

  return (
    <div className='mt-2'>
      <div className='w-100'>
        <Menu {...menuProps} menu={menuVariableState} lastMenuElement={lastMenuElement} />
      </div>
      <div className='w-100 bg-gray-300 p-2 align-top'>
        <h3>{selectedMenuId}</h3>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem atque quibusdam facere accusamus tempora expedita similique sint quisquam debitis eum nam, illum nulla voluptates minima maiores veniam ullam illo eaque!
        Doloremque eius, dolores nesciunt commodi iure nemo? Molestias maiores numquam nostrum illo. Animi aliquam distinctio sit ut error ex earum labore, doloremque illum perferendis optio saepe porro sequi nihil veniam.</p>
      </div>
    </div>
  );
}
