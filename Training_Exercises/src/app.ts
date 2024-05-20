import express, { json } from 'express';
import airthmeticRoute from './routes/arithmeticRoute'
import fsRoute from './routes/fs-task2';
import task from './routes/task';
import sequelize from './DB';
import 'dotenv/config'

const app = express()

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`)
})

const connectDB = async () => {
    sequelize.authenticate().then(() => console.log('DB Connected')).catch((err) => console.log(err.message))
    await sequelize.sync({ force : true });
}

connectDB()

app.use(json())

app.use('/api/calculate', airthmeticRoute);
app.use('/api/fs', fsRoute)
app.use('/api/task', task)

app.use((_, res) => {
    res.status(404).send('No Route matches error occured')
})
