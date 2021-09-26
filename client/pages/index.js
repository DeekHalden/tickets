import {client} from '../api/api'

const LandingPage = ({user}) => {
  return <h1>{user ? 'You are signed in' : 'You are signed out'}</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
  const {data} = await client('/users/currentuser', {
    headers: req?.headers,
  })
  return data ?? {}
}

console.log('👌👌👌👌👌rendered')

export default LandingPage
