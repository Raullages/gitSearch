import axios from 'axios'
import baseUrl from './ws'

async function User(name) {
  try {
    return await axios.get(`${baseUrl}/${name}`)

  } catch (error) {
    return JSON.stringify({"erro": "Usuário não encontrado."});

  }
}

it('response expect user', async () => {

  const user = 'raullages'
  await User(user).then((data) => {
    expect(data.status).toBe(200)
  })
})