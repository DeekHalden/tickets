import Router from 'next/router'
import React, {useState} from 'react'
import {useRequest} from '../../hooks/use-request'
const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {errors, doRequest} = useRequest({
    endpoint: '/users/signin',
    config: {
      method: 'POST',
      data: {email, password},
    },
    onSuccess: () => Router.push('/'),
  })
  const onSubmit = async e => {
    e.preventDefault()
    await doRequest()
  }
  return (
    <form onSubmit={onSubmit}>
      <h1>Sign in</h1>
      <div className="form-group mb-2">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          onChange={e => setEmail(e.target.value)}
          value={email}
          type="email"
          id="email"
          className="form-control"
        />
      </div>
      <div className="form-group mb-3">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          onChange={e => setPassword(e.target.value)}
          value={password}
          type="password"
          id="password"
          className="form-control"
        />
      </div>

      {errors}
      <div className="form-group">
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
      </div>
    </form>
  )
}

export default Signin
