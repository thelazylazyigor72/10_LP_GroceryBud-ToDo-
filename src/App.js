import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

//function to load our list w/ items when we restart the page/browser/app
const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(localStorage.getItem('list'))
  } else {
    return []
  }
}

function App() {
  //state for form, init - empty str
  const [name,setName] = useState('')
  //state for list / localStorage
  //initially we call our function to get whats kept in localstorage
  const [list, setList] = useState(getLocalStorage())
  //state flag for isEditing, to change button and initialize edditing process
  const [isEditing, setIsEditing] = useState(false)
  //edit ID, to keep id of element that we changing
  const [editID, setEditID] = useState(null)
  //state for alert, its an object to be able to make different types of alert, initially hidden and w/o any msgs and classes
  const [alert, setAlert] = useState({
    show: false, 
    msg: '', 
    type:'',
  })
  //as far as the second arg, we always store most actual list in localStorage
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  //handleSubmit func
  const handleSubmit = (e) => {
    e.preventDefault()
    //case when no passed string to input, then we show specific alert
    if (!name) {
      showAlert(true,'danger','please enter some value')
    }
    //case when we know that input isnt empty and isEdititng is true
    else if (name && isEditing) {
      //we go thru list and if some item matches with id of currently editing item, then we make changes in this item - we change his title to current in input/name
      setList(list.map(item => {
        if (item.id === editID) {
          return {...item, title: name}
        }
        //but if item id doesnt match editID then we make no changes
        return item
      }))
      //after that we reset flags, make emty input and showing specific alert
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true,'success','value changed')
    }
    //case when we just make new element, in this else we know wxactly that its not editing process and value is actually passed
    else {
      //show user that he passed new item
      showAlert(true,'success','u successfully added item')
      //make a new item, id is just костыль, title is input value/ name state
      const newItem = {id: new Date().getTime().toString(), title: name}
      //w/spread we make new array with added item at his end
      setList([...list, newItem])
      //set epty input
      setName('')
    }
  }
  //funciton to change alert state value, cuz we need to change it in many places, so we make this recallable function w/ default parameters
  const showAlert = (show = false,type = '',msg= '') => {
    setAlert({show,type,msg})
    //above is like not to make object like{name:name}, cuz u can just {name}
  }
  //handler to clear list, just make an alert and set list to emty arr
  const clearList = () => {
    showAlert(true,'danger','emty list')
    setList([])
  }
  //function to remove item from list, make an alert and set new list when we filtering out - if items id doesnt match passed id, then we keep them
  //but one that matched will not be passed to new arr
  const removeItem = id => {
    showAlert(true,'danger','item removed')
    setList(list.filter((item) => item.id !== id))
  }
  //when we need to edit item - get item by findin it in array, set editing flag to true, set editID to id of editable elem, pass editable item value to input/state value name
  const editItem = id => {
    const specificItem = list.find(item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  //1 see how we call alert component and what we passing in
  //2 see what happening in submit button text
  //3 see what how we call for the list component and what we passing in it
  return (
    <section className='section-center'>
        <form className='grocery-form' onSubmit={handleSubmit}>
          {alert.show && <Alert {...alert}  removeAlert = {showAlert} list={list}/>}
          <h3>grocery bud</h3>
          <div className='form-control'>
            <input className='grocery' placeholder='e.g. eggs' value={name} onChange={(e) => setName(e.target.value)} type="text"></input>
            <button type="submit" className="submit-btn">
              {isEditing? 'edit':'submit'}
            </button>
          </div>
        </form>
        {list.length > 0 && (
              <div className='grocery-container'>
                  <List items={list} removeItem={removeItem} editItem={editItem} />
                  <button onClick={clearList} className='clear-btn'>
                    clear items
                  </button>
              </div>
        )}

    </section>
  )
}

export default App
