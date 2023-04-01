import React from "react";
import { useRef } from "react";

export default function Menu({menu, handleClick}) {

//Ez az ellenőrzés biztosítja, hogy a rekurzió leálljon, ha egy menüelemnek nincs gyermeke
if (!menu || !menu.length) return null;
  
  const menuProps = {
    handleClick,
  }

  const colorFunction = (deep) => {
    let color
    if (deep===0) color = 'bg-red-500'
    if (deep===1) color = 'bg-blue-500'
    if (deep===2) color = 'bg-orange-500'
    if (deep===3) color = 'bg-purple-500'
    if (deep===4) color = 'bg-blue-500'
    return color;
  }

  return menu.map((item) => (
    <React.Fragment key={item.id}>
      
      <div
      id={item.id}
      onClick={() => handleClick(item.id)} 
      style={{ paddingLeft: 10, marginLeft: 15 * item.deep }}
      className={`${colorFunction(item.deep)} ${menu.visability} rounded-lg m-1 p-1`}
      >
        {item.name}
      </div>

      <Menu {...menuProps} menu={item.child} />
    </React.Fragment>
  ));
}
