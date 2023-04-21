import React from 'react'

export default function NewMenuElementForm ({ element, newInputValue, newInputValueSubmit, onlyOne, hiddenClass, bgColor }) {

  if (!onlyOne)
    return null;
    
  return (
    <>
    <form 
      id={`form_${element.id}`}
      className={`block pb-1 m-1 rounded-lg ${bgColor} bg-opacity-30 ${hiddenClass}`}
      onSubmit={(e) => newInputValueSubmit(e, element)}
      style={{ marginLeft: 9 * element.deep }}
    >
      <button 
        type="submit"
        className={`inline text-white ${bgColor} hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 ml-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}>row
      </button>
      <input
        type="text"
        name="newname"
        placeholder={element.id}
        autoComplete="off"
        className="inline-block ml-1 mt-1 px-1 py-1 bg-white border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
        onChange={(e) => newInputValue(e)}
        style={{'width':'40%'}}
      />
    </form>
    </>
  );
}