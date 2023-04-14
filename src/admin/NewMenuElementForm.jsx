import React from 'react'

export default function NewMenuElementForm ({ element, newInputValue, newInputValueSubmit, onlyOne, hiddenClass }) {

  if (!onlyOne)
    return null;
    
  return (
    <>
    <form 
      id={`form_${element.id}`}
      className={`inline-block ${hiddenClass}`}
      onSubmit={(e) => newInputValueSubmit(e, element)}
    >
      <input
        type="text"
        name="newname"
        placeholder={element.id}
        autoComplete="off"
        class="inline-block mt-1 px-1 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md sm:text-sm focus:ring-1"
        style={{ paddingLeft: 10, marginLeft: 15 * element.deep }}
        onChange={(e) => newInputValue(e)}
      />
      <button 
        type="submit"
        className="inline-block text-white bg-orange-500 hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2 py-1 ml-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add row
      </button>
    </form>
    </>
  );
}