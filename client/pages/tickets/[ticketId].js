import {useRequest} from '@hooks/use-request'
import Router from 'next/router'

const TicketShow = ({ticket}) => {
  const {doRequest, errors} = useRequest({
    endpoint: '/orders',
    config: {
      method: 'POST',
      data: {
        ticketId: ticket.id,
      },
    },
    onSuccess(order) {
      console.log(order)
      Router.push(`/orders/${order.id}`)
      console.log('bingo!!!')
    },
  })

  return (
    <div>
      <h1>{ticket?.title}</h1>
      <h4>${ticket?.price.toFixed(2)}</h4>
      {errors}
      <button className="btn btn-primary" onClick={() => doRequest()}>
        Purchase
      </button>
    </div>
  )
}

TicketShow.getInitialProps = async ({req, query}, client) => {
  const {ticketId} = query

  const {data: ticket} = await client(`/tickets/${ticketId}`, {
    headers: req?.headers,
  })
  return {
    ticket,
  }
}

export default TicketShow
