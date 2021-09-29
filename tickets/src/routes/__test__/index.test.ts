import request from 'supertest'
import { prefix } from '../../../consts'

import { app } from '../../app'

const createTicket = () =>
  request(app).post(`${prefix}/tickets`).set('Cookie', signin()).send({
    title: 'asd',
    price: 10,
  })

it('can fetch a list of tickets', async () => {
  await createTicket()
  await createTicket()
  await createTicket()

  const response = await request(app)
    .get(`${prefix}/tickets`)
    .send()
    .expect(200)
  expect(response.body.length).toEqual(3)
})
