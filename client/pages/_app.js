import 'bootstrap/dist/css/bootstrap.min.css'

import {client} from '@api/api'
import Header from '@components/header'

const AppComponent = ({Component, pageProps, user}) => {
  return (
    <div>
      <Header user={user}></Header>
      <Component {...pageProps} />
    </div>
  )
}

AppComponent.getInitialProps = async ({ctx, Component}) => {
  const {data} = await client('/users/currentuser', {
    headers: ctx?.req?.headers,
  })
  let pageProps = {}
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {pageProps, ...data}
}

export default AppComponent
