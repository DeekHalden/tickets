const OrderIndex = ({orders}) => {
  return (
    <ul>
      {orders.map(order => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  )
}

OrderIndex.getInitialProps = async ({req}, client) => {
  const {data: orders} = await client('/orders', {
    headers: req?.headers,
  })
  return {orders}
}

export default OrderIndex
