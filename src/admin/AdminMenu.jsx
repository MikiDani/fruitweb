import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppContext } from '../variables'

import Menu from "./Menu";

export function AdminMenu({ menu }) {

  const { cookies, user, setUser, reload, setReload } = useAppContext()
  const [authorize, setAuthorize] = useState(false)
  const [msg, setMsg] = useState({ msg: 'semmi...', style: 'text-green-600' })
  let menuList = menu
  let findId = false;
  let findDeep = 0;
   
  const rekursive = (element, idValue) => {
    console.log('recursive id: '+element.id);

    if (element.deep === findDeep) {
      findId = false;
    }

    if (findId && element.deep > findDeep) {
      document.querySelector(`[id="${element.id}"]`).classList.toggle('hidden-div')
    }
    
    if (element.id === idValue) {
      console.log('MEGVAN!!! Majd a következő...');

      findId = true;
      findDeep = element.deep;
    }

    if (element.child) {
      element.child.forEach(childElements => {
        console.log('childElement: ')
        console.log(childElements)
        rekursive(childElements, idValue)
      });
    } else {
      return null;
    }
  }
  
  //console.log(idValue);
  
  const menuHideShow=(idValue) => {
    menuList.forEach(element => {
      findId = false;
      rekursive(element, idValue)
    });


  }

  const handleClick = (id) => {
    console.log('HOOK CLICK!!!')
    console.log('hozott id:', id)
    
    menuHideShow(id)


  };
  
  const menuProps = {
    handleClick,
    visability: 'show',
    proba: 'probaszöveg'
  };

  useEffect(() => {
  }, []);


  return (
    <div id="menu_wrapper">
      <Menu {...menuProps} menu = {menu} />
    </div>
  );
}
