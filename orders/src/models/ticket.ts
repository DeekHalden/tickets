import { Document, model, Model, Schema } from 'mongoose'

import { OrderStatus } from '@microservices-tessera/common'

import { Order } from './order'

interface TicketAttrs {
  title: string
  price: number
}

export interface TicketDoc extends Document {
  title: string
  price: number
  isReserved(): Promise<boolean>
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
}

const ticketSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

ticketSchema.statics.build = (attrs: TicketAttrs) => new Ticket(attrs)

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this as any,
    status: { $ne: OrderStatus.Cancelled },
  })
  return !!existingOrder
}

export const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)
