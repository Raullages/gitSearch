import axios from 'axios'
import baseUrl from './ws'

async function Starred(name) {
  return await axios.get(`${baseUrl}/${name}/starred`)
}

it('response expect starred', async () => {
  let user = 'raullages'
  await Starred(user).then((data) => {
    expect(data.status).toBe(200)
  })
})