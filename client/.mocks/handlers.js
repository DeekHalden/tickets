import {rest} from 'msw'
const delay = 2500
export const handlers = [
  rest.post(
    'https://tessera.dev/api/v1/users/signup',
    async (req, res, ctx) => {
      console.log(req.body.password)
      console.log(req.body.email)
      if (!req.body.password) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'password is required'}),
        )
      }
      if (!req.body.email) {
        return res(
          ctx.delay(delay),
          ctx.status(400),
          ctx.json({message: 'email is required'}),
        )
      }
      return res(ctx.json({data: {user: {email: req.body.email, id: 1}}}))
    },
  ),
]
