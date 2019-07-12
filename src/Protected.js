import React from 'react'
import netlifyIdentity from 'netlify-identity-widget'

const Protected = () => {
  const user = netlifyIdentity.currentUser()
  console.log({ user })
  return (
    <div>
      <h3>Protected Page</h3>
      <p>You are logged in as <b>{user.email}</b></p>
    </div>
  )
}

export default Protected
