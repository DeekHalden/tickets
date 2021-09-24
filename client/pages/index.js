import {client} from '../api/api'

const LandingPage = props => {
  console.log('I am in the component')
  console.log(props)
  return <h1>LandingPage page! </h1>
}

export async function getServerSideProps({req}) {
  const {data} = await client(
    '/api/v1/users/currentuser',
    {
      headers: req.headers
    },
  )
  return {props: data ?? {}}
}

export default LandingPage
