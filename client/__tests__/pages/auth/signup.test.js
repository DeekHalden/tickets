import 'whatwg-fetch'
import * as React from 'react'
import {fireEvent} from '@testing-library/dom'
import {render as rtlRender, screen, waitFor} from '@testing-library/react'
import user from '@testing-library/user-event'
import {setupServer} from 'msw/node'
import Signup from '../../../pages/auth/signup'
import {client as mockClient} from '../../../api/api'
import {act} from 'react-dom/test-utils'
import Router from 'next/router'

jest.mock('next/router', () => ({
  push: jest.fn(),
}))
jest.mock('../../../api/api')

afterEach(() => {
  jest.clearAllMocks()
})

function render(ui) {
  const screen = rtlRender(ui)
  const email = screen.getByLabelText(/email/i)
  const password = screen.getByLabelText(/password/i)
  const submitButton = screen.getByText(/sign up/i, {selector: 'button'})
  return {
    email,
    password,
    submitButton,
    ...screen,
  }
}

test('should fire event once', async () => {
  const data = {email: 'test@test.com', password: 'password'}
  mockClient.mockResolvedValueOnce({data: {user: {email: data.email, id: 1}}})

  const {submitButton} = render(<Signup />)
  await act(async () => await fireEvent.click(submitButton))
  expect(mockClient).toHaveBeenCalledTimes(1)
  expect(Router.push).toHaveBeenCalledWith('/')
})

test('should show block with errors if the same email sent twice', async () => {
  const data = {email: 'test@test.com', password: 'password'}
  mockClient
    .mockResolvedValueOnce({data: {user: {email: data.email, id: 1}}})
    .mockRejectedValueOnce({
      errors: [{message: 'Email already taken'}],
    })

  const {submitButton} = render(<Signup />)
  await act(async () => {
    await fireEvent.click(submitButton)
    await fireEvent.click(submitButton)
  })
  expect(mockClient).toHaveBeenCalledTimes(2)
  expect(screen.getByLabelText(/error/i)).toBeInTheDocument()
})
