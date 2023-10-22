const express = require('express')
const cors = require('cors')
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId, HostAddress } = require('mongodb');
const { config } = require('dotenv');

const app = express()
const port = process.env.PORT || 5000;

// mdsoyaibsourav
// SHwEM3yQAPpIGML1


app.use(cors());
app.use(express.json());

// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hzg7hl2.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://mdsoyaibsourav:SHwEM3yQAPpIGML1@cluster0.hzg7hl2.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


    const productCollection = client.db('user').collection('productCollection')
    const myCartCollection = client.db('user').collection('myCartCollection')

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // load all data 
    app.get('/brands',async(req,res)=>{
      const curser = productCollection.find()
      const result = await curser.toArray();
      res.send(result);
    })

    // load brandName wise 4 data
    app.get(`/brands/:brandName`,async(req,res)=>{
      const brandName = req.params.brandName ;
      console.log(brandName);
      const query ={brandName: brandName}
      // console.log(query);
      const cursor = productCollection.find(query);
      const result = await cursor.toArray();
      res.send(result)
    })
    

    // update er data 
    app.get('/brand/:name',async(req,res)=>{
      const name= req.params.name ;
      console.log(name);
      const query = {name:name};
      const cursor =await productCollection.findOne(query)
      res.send(cursor)
    })
    app.get('/detelis/:name',async(req,res)=>{
      const name= req.params.name ;
      console.log(name);
      const query = {name:name}
      const cursor = await productCollection.findOne(query);
      res.send(cursor)
    })



  
    app.post('/brands',async(req,res)=>{
      const data = req.body
      console.log(data);
      const result = await productCollection.insertOne(data)
      res.send(result)

    })

    app.patch('/brand/:id',async(req,res)=>{
      const id = req.params.id ;
      console.log(id);
      const data = req.body
      const filter = {_id:new ObjectId(id)};
      const options = { upsert: true };
      const updateProduct = {
        $set: {
          name:data.name,
          img:data.img,
          product:data.product,
          brandName:data.brandName,
          price:data.price,
          rating:data.rating,
          description:data.description
        },
      };
      const result =  await productCollection.updateOne(filter, updateProduct, options);
      res.send(result)
    })





    // MyCart a all data dekha nor jonno
    app.get('/cart',async(req,res)=>{
      const cursor = myCartCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    // delete korar jonno
    app.get('/cart/:name',async(req,res)=>{
      const name = req.params.name;
      console.log(name);
      const query = {name:name};
      const result = await myCartCollection.findOne(query);
      res.send(result)
    })

    app.post('/cart',async(req,res)=>{
      const data = req.body ;
      console.log(data);
      const result = await myCartCollection.insertOne(data);
      res.send(result)
    })

    app.delete('/cart/:name',async(req,res)=>{
      const name = req.params.name ;
      console.log(name);
      const query = {name:name };
      const result = await myCartCollection.deleteOne(query);
      res.send(result)
    })





    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('The server is running: :')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







// vaiya varcel a deploy korar por vaiya problem hosse
