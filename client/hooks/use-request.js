import React from 'react'
import {useState} from 'react'
import {client} from '../api/api'

export const useRequest = ({endpoint, onSuccess, onError, config = {}} = {}) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async () => {
    try {
      setErrors(null)
      const response = await client(endpoint, config)
      onSuccess && onSuccess(response?.data)
      return response
    } catch (error) {
      onError && onError(error.errors)
      setErrors(
        <div aria-label="error" className="alert alert-danger">
          <ul className="my-0">
            {error.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>,
      )
      throw error
    }
  }
  return {
    doRequest,
    errors,
  }
}
