import { OrderStatus } from '@microservices-tessera/common'
import { Types } from 'mongoose'
import request from 'supertest'
import { prefix } from '../../../consts'

import { app } from '../../app'
import { Order } from '../../models/order'
import { Payment } from '../../models/payment'
import { stripe } from '../../stripe'

// jest.mock('../../stripe')

it('returns a 404 when purchasing an order that doenst exist', async () => {
  await request(app)
    .post(`${prefix}/payments`)
    .set('Cookie', signin())
    .send({
      token: 'qwe',
      orderId: new Types.ObjectId().toHexString(),
    })
    .expect(404)
})

it('returns a 401 when purchasing an order that doenst belong to the user', async () => {
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: new Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post(`${prefix}/payments`)
    .set('Cookie', signin())
    .send({
      token: 'qwe',
      orderId: order.id,
    })
    .expect(401)
})

it('returns a 401 when purchasing an cancelled order', async () => {
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: 'qwe123x',
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  })

  await order.save()

  await request(app)
    .post(`${prefix}/payments`)
    .set('Cookie', signin())
    .send({
      token: 'qwe',
      orderId: order.id,
    })
    .expect(400)
})

it('returns 200 if the data is valid', async () => {
  const user = {
    id: 'qwe123x',
    email: 'qwe@wqe.fm',
  }
  const price = Math.floor(Math.random() * 10000)
  const order = Order.build({
    id: new Types.ObjectId().toHexString(),
    userId: user.id,
    version: 0,
    price,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app)
    .post(`${prefix}/payments`)
    .set('Cookie', signin(user))
    .send({
      token: 'tok_visa',
      orderId: order.id,
    })
    .expect(201)

  const { data } = await stripe.charges.list({ limit: 50 })

  const stripeCharge = data.find((charge) => charge.amount === price * 100)

  expect(stripeCharge).toBeDefined()
  const payment = await Payment.findOne({
    stripeId: stripeCharge!.id,
    orderId: order.id,
  })

  expect(payment).not.toBeNull()
})
