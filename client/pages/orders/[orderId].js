import {useRequest} from '@hooks/use-request'
import Router from 'next/router'
import {useEffect, useState} from 'react'
import StripeCheckout from 'react-stripe-checkout'
const SECOND = 1000

const OrderShow = ({order, user}) => {
  const [timeLeft, setTimeLeft] = useState('')

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(msLeft / 1000))
    }
    findTimeLeft()
    const timerId = setInterval(findTimeLeft, SECOND)

    return () => {
      clearInterval(timerId)
    }
  }, [])

  const {doRequest, errors} = useRequest({
    endpoint: '/payments',
    config: {
      method: 'POST',
      data: {
        orderId: order.id,
      },
    },
    onSuccess() {
      Router.push('/orders')
    },
  })

  return (
    <div>
      <h1>Time left to pay: {timeLeft} seconds</h1>
      {order.status !== 'complete' && (
        <StripeCheckout
          token={token => doRequest({token: token.id})}
          stripeKey="pk_test_51JgobgDnT2AiHuveH5JtFs8btF6ByKImFSILYF0XS4jkaNOVF9s3ESgbrmcym4r8BEf01ENZPpZ3Vk9M8EByclo4005rkepShj"
          amount={order.ticket.price * 100}
          email={user.email}
        />
      )}
      {order.status}
      {errors}
    </div>
  )
}

OrderShow.getInitialProps = async ({req, query}, client) => {
  const {orderId} = query
  console.log(orderId)
  const {data: order} = await client(`/orders/${orderId}`, {
    headers: req?.headers,
  })
  return {
    order,
  }
}

export default OrderShow
