import 'dotenv/config'
import express, { json } from 'express';
import airthmeticRoute from './routes/arithmeticRoute'
import fsRoute from './routes/fs-task2';
import task from './routes/task';
import sequelize from './DB';
import TasksECommerceRouter from './routes/EcommerceRoutes'
import cors from 'cors'

const app = express()

const corsOptions = {
    origin: true, //included origin as true
    credentials: true, //included credentials as true
};

app.use(cors(corsOptions))


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Server started at port: ${process.env.PORT}`)
})

const connectDB = async () => {
    sequelize.authenticate().then(() => console.log('DB Connected')).catch((err) => console.log(err.message))
    //await sequelize.sync({ force: true });
}

connectDB()

app.use(json())

app.use('/api/calculate', airthmeticRoute);
app.use('/api/fs', fsRoute)
app.use('/api/task', task)
app.use('/api/Ecommerce', TasksECommerceRouter)

app.use((_, res) => {
    res.status(404).send('No Route matches error occured')
})
