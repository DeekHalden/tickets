it("it fails when an email that doesn't exist is supplied", async () => {
  await signin(400, {
    email: 'test@test.com',
    password: '123456',
  })
})

it('fails when incorrect password is supplied', async () => {
  await signup()
  await signin(400, {
    email: 'dd@dd.fm',
    password: '12345',
  })
})

it('it responds with a cookie when valid creds given', async () => {
  await signup()
  const cookie = signin(200, {
    email: 'dd@dd.fm',
    password: '123456',
  })
  expect(cookie).toBeDefined()
})
