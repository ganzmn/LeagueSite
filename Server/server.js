const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

var messages = [{
  id: 1,
  messageBody: [
    'nisl duis ac nibh fusce lacus purus aliquet at feugiat'
  ],
  user: { userName: 'Jake', id: 3 }
}, {
  id: 2,
  messageBody: [
    'donec dapibus duis at velit eu est congue elementum in hac habitasse platea'
  ],
  user: { userName: 'Jake', id: 0 }
}, {
  id: 3,
  messageBody: [
    'lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula consequat morbi a ipsum integer a nibh'
  ],
  user: { userName: 'Jake', id: 0 }
}, {
  id: 4,
  messageBody: [
    'ut erat id mauris vulputate elementum nullam varius nulla facilisi cras non velit nec'
  ],
  user: { userName: 'Jake', id: 0 }
}]
var users = [{ userName: 'jake.ganser@gmail.com', password: '1', id: 0, role: 'admin', firstName: 'Jake', lastName: 'Ganser', bootsChamps: 3, bootsHof: false }]
var teams = [{ id: 0, teamName: 'Boots n Hoes', w: 350, l: 6, t: 0, champs: 3 }]
var gameRecordBoots = [{ id: 0, t1: { id: 0, g: 12, s: 23 }, t2: { id: 1, g: 5, s: 16 } }]
var playerGameRecordBoots = [{ id: 0, gameRecordId: 0, userId: 0, teamId: 0, g: 4, a: 0, sh: 10, w: true, l: false, t: false }]

// messages
app.get('/messages', (req, res) => {
  res.send(messages)
})

app.post('/messages', (req, res) => {
  // implement some checks and try catch
  const token = req.header('Authorization')
  const userId = jwt.decode(token, '123')
  const user = users[userId]
  const msg = req.body
  msg.user = user
  msg.user.id = token
  msg.id = messages[messages.length - 1].id + 1
  messages.push(msg)
  res.json(msg)
})

// registration and authentication
app.post('/register', (req, res) => {
  const registerData = req.body
  const userId = users.length
  registerData.id = userId
  users.push(registerData)

  const token = jwt.sign(userId, '123')
  res.json(token)
})

app.post('/login', (req, res) => {
  const loginData = req.body
  const userId = users.findIndex(user => user.userName === loginData.userName)

  if (userId === -1) { return res.status(401).send({ message: 'name or password is invalid' }) }
  if (users[userId].password !== loginData.password) { return res.status(401).send({ message: 'name or password is invalid' }) }

  loginData.id = userId

  const token = jwt.sign(userId, '123')
  res.json(token)
})

// team mgmt
app.get('/teams', (req, res) => {
  res.send(teams)
})

app.get('/teamGameRecords', (req, res) => {
  const games = gameRecordBoots.filter((data) => { return (data.t1.id === req.teamId || data.t2.id === req.teamId) })
  res.send(games)
})

// player mgmt
app.get('/userProfile', (req, res) => {
  const token = req.header('Authorization')
  const userId = jwt.decode(token, '123')
  const user = users[userId]
  const userProfile = { user: { name: user.firstName + ' ' + user.lastName, bootsChamp: user.bootsChamps, bootsHof: user.bootsHof } }
  res.send(userProfile)
})
app.get('/players', (req, res) => {
  res.send(users)
})

app.get('/playerGameRecords', (req, res) => {
  const games = playerGameRecordBoots.filter((data) => { return data.userId === req.userId })
  res.send(games)
})

app.listen(port, () => console.log('app running'))
