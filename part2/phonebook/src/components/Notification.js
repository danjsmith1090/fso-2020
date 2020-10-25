import React from 'react'

const Notification = ({ message, notificationType }) => {
    if (message === null) {
      return null
    }

    if (notificationType === "Error") {
      return (
        <div className="error">
          {message}
        </div>
      )
    }
  
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  export default Notification;