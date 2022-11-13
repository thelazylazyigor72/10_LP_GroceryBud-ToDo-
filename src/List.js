import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

//we passed list and functions-handlers
const List = ({items, removeItem, editItem}) => {
  //just populate w/ map and assign handlers
  return (
    <div className='grocery-list'>
      {items.map(item => {
        const {id, title} = item
        return <article key={id} className='grocery-item'>
          <p className='title'>{title}</p>
          <div className='btn-container'>
            <button type='button' className='edit-btn' onClick={() => editItem(id)}>
              <FaEdit/>
            </button>
            <button type='button' className='delete-btn' onClick={() => removeItem(id)}>
              <FaTrash/>
            </button>
          </div>
        </article>
      })}
    </div>
  )
}

export default List
