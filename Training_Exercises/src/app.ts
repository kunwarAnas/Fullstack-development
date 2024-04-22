import express from 'express';
import airthmeticRoute from './routes/arithmeticRoute'

const app = express()

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})

app.use('/api/calculate',airthmeticRoute)

app.use((_, res) => {
    res.status(404).send('Error occured')
})
