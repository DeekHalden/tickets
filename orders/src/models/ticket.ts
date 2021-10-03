import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

import { Document, model, Model, Schema } from 'mongoose'

import { OrderStatus } from '@microservices-tessera/common'

import { Order } from './order'

interface TicketAttrs {
  id: string
  title: string
  price: number
}

export interface TicketDoc extends Document {
  title: string
  price: number
  version: number
  isReserved(): Promise<boolean>
}

interface TicketModel extends Model<TicketDoc> {
  build(attrs: TicketAttrs): TicketDoc
  findByEvent(event: { id: string, version: number}): Promise<TicketDoc | null>
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
    }
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

ticketSchema.set('versionKey', 'version')
ticketSchema.plugin(updateIfCurrentPlugin)

ticketSchema.statics.build = (attrs: TicketAttrs) => {
  const { id, ...restAttrs} = attrs
  return new Ticket({
    ...restAttrs,
    _id: id,
  })
}

ticketSchema.statics.findByEvent = (event: { id: string, version: number}) => Ticket.findOne({
  _id: event.id,
  version: event.version - 1
})

ticketSchema.methods.isReserved = async function () {
  const existingOrder = await Order.findOne({
    ticket: this as any,
    status: { $ne: OrderStatus.Cancelled },
  })
  return !!existingOrder
}

export const Ticket = model<TicketDoc, TicketModel>('Ticket', ticketSchema)
