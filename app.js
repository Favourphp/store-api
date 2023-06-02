require('dotenv').config()
require('express-async-errors')


const express = require('express');
const app = express();
const productsRouter = require('./routes/products')



const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')

//middleware
app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.send('<h1>store  API</h1><a href="/api/v1/products">products route</a>')

})

app.use('/api/v1/products', productsRouter)

//products route

app.use(notFoundMiddleware)
app.use(errorMiddleware)
  
const port = process.env.PORT || 600

const start = async() => {
    try {
        // connect to DB 
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
       console.log(error) 
    }
}

 start()