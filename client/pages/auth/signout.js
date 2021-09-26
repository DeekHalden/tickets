import Router from 'next/router'
import {useEffect} from 'react'

import {useRequest} from '@hooks/use-request'

const Signout = () => {
  const {errors, doRequest} = useRequest({
    endpoint: '/users/signout',
    config: {
      method: 'POST',
    },
    onSuccess: () => setTimeout(() => Router.push('/'), 1500),
    onError: () => setTimeout(() => Router.push('/'), 1500),
  })
  useEffect(() => {
    doRequest()
  }, [])
  return <div>{errors || <div>Signing you out...</div>}</div>
}

export default Signout
