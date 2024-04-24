import express, { json } from 'express';
import airthmeticRoute from './routes/arithmeticRoute'
import fsRoute from './routes/fs-task2';

const app = express()

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`)
})

app.use(json())

app.use('/api/calculate',airthmeticRoute);
app.use('/api/fs',fsRoute)

app.use((_, res) => {
    res.status(404).send('Error occured')
})
