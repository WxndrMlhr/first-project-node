
const users = []
const port = 3000
const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())
const age = 24
const name = 'Wander'


const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {

        return response.status(404).json({ message: ' user not found' })

    }

    request.userIndex = index
    request.userId = id




next()
}


app.get('/users', (request, response) => {

    console.log('a rota foi chamada');

    return response.json({ users })
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }


    users.push(user)

    return response.status(201).json(user)

})


app.put('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex
    const id = request.userId

    const { name, age } = request.body

    const updateUser = { id, name, age }


    return response.json({ updateUser })

    users[index] = updateUser
})


app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    const { id } = request.params

    users.splice(index, 1)

    return response.status(204).json()

})







app.listen(3000, () => {

    console.log('🚀 Server started on port 3000');
})

