import axios from 'axios'
import baseUrl from './ws'

async function Repos(name) {
  return await axios.get(`${baseUrl}/${name}/repos`)
}

describe("Tests com jest.js", () => {
  let user = ''

  it('response expect repos', async () => {
    user = 'raullages'
    await Repos(user).then((data) => {
      expect(data.status).toBe(200)
    })
  })
})