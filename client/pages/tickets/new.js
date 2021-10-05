import {useRequest} from '@hooks/use-request'
import Router from 'next/router'
import {useState} from 'react'

const NewTicket = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const onBlur = () => {
    const value = parseFloat(price)
    if (isNaN(value)) {
      return
    }

    setPrice(value.toFixed(2))
  }

  const {doRequest, errors} = useRequest({
    endpoint: '/tickets',
    config: {
      method: 'POST',
      data: {
        title,
        price,
      },
    },
    onSuccess() {
      Router.push('/')
    },
  })

  const submit = async e => {
    e.preventDefault()
    await doRequest()
  }

  return (
    <div>
      <h1>Create a Ticket</h1>
      <form action="" onSubmit={submit}>
        <div className="form-group mb-2">
          <label className="form-label" htmlFor="title">
            Title
          </label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="form-label" htmlFor="price">
            Price
          </label>
          <input
            className="form-control"
            type="text"
            name="price"
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            onBlur={onBlur}
          />
        </div>
        {errors}
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewTicket
