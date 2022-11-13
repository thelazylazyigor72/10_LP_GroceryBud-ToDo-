import React, { useEffect } from 'react'

//we have no need to pass show property
const Alert = ({type, msg, removeAlert, list}) => {
  //we passed our list to detect if we change it, then we call our effect
  //effect is just about to remove alert after N seconds and return function to avoid bugs
  //removeAlert is jyst showAlert w/ default parameters
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 7000)
    return () => clearTimeout(timeout)
  }, [list])
  //notice that by passed parameters we will make specific css class
  return (
    <p className={`alert alert-${type}`}>{msg}</p>
  )
}

export default Alert
