const express = require("express")
const { error } = require("node:console")
const app = express()


const dotenv = require("dotenv")
dotenv.config()


const ejs = require("ejs")
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }));

app.use(express.json())

const userRouter = require("./router/userRouter")
app.use("/api/v1", userRouter)


const productRouter = require("./router/productRouter")
app.use("/api/v1", productRouter)


const mongoose = require("mongoose")
mongoose.connect(process.env.DATABASE_URI)
.then(()=>{
  console.log("Database connected successfully")
})
.catch((error)=>{
  console.log("Database failed to connect...")
console.log(error.message)
})


const carProducts = [
  {
    id: 1,
    name: "Toyota Camry 2022",
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    price: 28000,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.5L 4-Cylinder",
    mileage: "15,000 km",
    description: "A comfortable midsize sedan with excellent fuel economy and smooth ride quality.",
    image: "https://images.unsplash.com/photo-1626072784121-0e64c7b7c3f7"
  },
  {
    id: 2,
    name: "Honda Accord 2023",
    brand: "Honda",
    model: "Accord",
    year: 2023,
    price: 30000,
    color: "White",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "1.5L Turbo",
    mileage: "5,000 km",
    description: "A stylish and spacious sedan with advanced safety and modern interior design.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
  },
  {
    id: 3,
    name: "BMW X5 2021",
    brand: "BMW",
    model: "X5",
    year: 2021,
    price: 55000,
    color: "Blue",
    transmission: "Automatic",
    fuelType: "Diesel",
    engine: "3.0L Inline-6",
    mileage: "20,000 km",
    description: "Luxury SUV with powerful performance and premium interior comfort.",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a"
  },
  {
    id: 4,
    name: "Mercedes-Benz C300 2022",
    brand: "Mercedes-Benz",
    model: "C300",
    year: 2022,
    price: 48000,
    color: "Silver",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.0L Turbo",
    mileage: "12,000 km",
    description: "Compact luxury sedan offering advanced technology and smooth driving experience.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
  },
  {
    id: 5,
    name: "Tesla Model 3 2023",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 42000,
    color: "Red",
    transmission: "Automatic",
    fuelType: "Electric",
    engine: "Dual Motor",
    mileage: "2,000 km",
    description: "Fully electric sedan with autopilot features and impressive acceleration.",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68"
  },

  {
    id: 6,
    name: "Ford Mustang 2022",
    brand: "Ford",
    model: "Mustang",
    year: 2022,
    price: 45000,
    color: "Yellow",
    transmission: "Manual",
    fuelType: "Petrol",
    engine: "5.0L V8",
    mileage: "8,000 km",
    description: "Iconic sports car delivering thrilling performance and bold styling.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537"
  },

  {
    id: 7,
    name: "Hyundai Tucson 2021",
    brand: "Hyundai",
    model: "Tucson",
    year: 2021,
    price: 26000,
    color: "Grey",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.0L 4-Cylinder",
    mileage: "18,000 km",
    description: "Compact SUV with modern design and advanced driver assistance features.",
    image: "https://images.unsplash.com/photo-1601924579440-1f1c4b8e1c4d"
  },

  {
    id: 8,
    name: "Kia Sportage 2022",
    brand: "Kia",
    model: "Sportage",
    year: 2022,
    price: 24000,
    color: "White",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.4L 4-Cylinder",
    mileage: "10,000 km",
    description: "Affordable SUV with spacious interior and user-friendly technology.",
    image: "https://images.unsplash.com/photo-1597007030739-6d2e3e6d6d73"
  },

  {
    id: 9,
    name: "Audi A4 2023",
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 39000,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.0L Turbo",
    mileage: "3,000 km",
    description: "Luxury sedan known for refined handling and premium cabin experience.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228d4989"
  },

  {
    id: 10,
    name: "Chevrolet Tahoe 2022",
    brand: "Chevrolet",
    model: "Tahoe",
    year: 2022,
    price: 60000,
    color: "Dark Blue",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "5.3L V8",
    mileage: "14,000 km",
    description: "Full-size SUV offering strong towing capability and spacious seating.",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
  },

  {
    id: 11,
    name: "Nissan Altima 2021",
    brand: "Nissan",
    model: "Altima",
    year: 2021,
    price: 22000,
    color: "Silver",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.5L 4-Cylinder",
    mileage: "25,000 km",
    description: "Reliable midsize sedan with comfortable seating and fuel efficiency.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537"
  },

  {
    id: 12,
    name: "Lexus RX 350 2022",
    brand: "Lexus",
    model: "RX 350",
    year: 2022,
    price: 52000,
    color: "White",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "3.5L V6",
    mileage: "9,000 km",
    description: "Luxury SUV with refined interior, smooth ride and advanced safety systems.",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a"
  },

  {
    id: 13,
    name: "Mazda CX-5 2023",
    brand: "Mazda",
    model: "CX-5",
    year: 2023,
    price: 28000,
    color: "Red",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.5L 4-Cylinder",
    mileage: "4,000 km",
    description: "Stylish compact SUV offering sporty handling and elegant interior.",
    image: "https://images.unsplash.com/photo-1601924579440-1f1c4b8e1c4d"
  },

  {
    id: 14,
    name: "Jeep Wrangler 2022",
    brand: "Jeep",
    model: "Wrangler",
    year: 2022,
    price: 41000,
    color: "Green",
    transmission: "Manual",
    fuelType: "Petrol",
    engine: "3.6L V6",
    mileage: "11,000 km",
    description: "Off-road SUV built for adventure with rugged performance capabilities.",
    image: "https://images.unsplash.com/photo-1597007030739-6d2e3e6d6d73"
  },

  {
    id: 15,
    name: "Porsche Cayenne 2023",
    brand: "Porsche",
    model: "Cayenne",
    year: 2023,
    price: 85000,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "3.0L Turbo V6",
    mileage: "2,500 km",
    description: "High-performance luxury SUV combining speed, comfort and technology.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8"
  },

  {
    id: 16,
    name: "Volkswagen Passat 2021",
    brand: "Volkswagen",
    model: "Passat",
    year: 2021,
    price: 23000,
    color: "Blue",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.0L 4-Cylinder",
    mileage: "22,000 km",
    description: "Practical sedan offering spacious interior and solid driving comfort.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228d4989"
  },

  {
    id: 17,
    name: "Subaru Outback 2022",
    brand: "Subaru",
    model: "Outback",
    year: 2022,
    price: 27000,
    color: "Grey",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "2.5L Boxer Engine",
    mileage: "13,000 km",
    description: "All-wheel-drive crossover ideal for both city and outdoor adventures.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537"
  },

  {
    id: 18,
    name: "Range Rover Sport 2023",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 95000,
    color: "White",
    transmission: "Automatic",
    fuelType: "Diesel",
    engine: "3.0L Turbo",
    mileage: "1,800 km",
    description: "Premium SUV with luxurious interior and powerful off-road capability.",
    image: "https://images.unsplash.com/photo-1617704548623-340376564e68"
  },

  {
    id: 19,
    name: "Toyota Corolla 2022",
    brand: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 20000,
    color: "Silver",
    transmission: "Automatic",
    fuelType: "Petrol",
    engine: "1.8L 4-Cylinder",
    mileage: "16,000 km",
    description: "Compact sedan known for reliability and fuel efficiency.",
    image: "https://images.unsplash.com/photo-1626072784121-0e64c7b7c3f7"
  },

  {
    id: 20,
    name: "Honda CR-V 2023",
    brand: "Honda",
    model: "CR-V",
    year: 2023,
    price: 31000,
    color: "Black",
    transmission: "Automatic",
    fuelType: "Hybrid",
    engine: "2.0L Hybrid",
    mileage: "6,000 km",
    description: "Efficient and spacious SUV with hybrid performance and family-friendly design.",
    image: "https://images.unsplash.com/photo-1601924579440-1f1c4b8e1c4d"
  }
];

app.get("/carproducts", (req, res)=>{

   // res.send(carProducts)

res.render("carproducts", {carProducts})

})
app.get("/addproduct", (req,res)=>{
  
  res.render("addproduct")
})

app.post("/addproduct", (req,res)=>{
  const {image, brand, year, currency, location, description } = req.body

  carProducts.push(req.body)
  // console.log(carProducts)
  res.render("carproducts", {carProducts})
})

app.post("/delete/:id", (req, res)=>{
  
  const {id} = req.params
  carProducts.splice(id,1)
  res.render("carproducts", {carProducts})


})

app.get("/editproduct/:id", (req,res)=>{

  res.render("editproduct")

})
app.post("/editproduct/:id", (req,res)=>{

//  const editFinal = {
//    image: req.body.image,
//    brand: req.body.brand,
//    year: req.body.brand,
//    currency: req.body.currency,
//    location: req.body.location,
//    description: req.body.description

//  }
const {image, brand, year, currency, location, description} = req.body

carProducts.push(req.body)
res.render("carproducts", {carProducts})


})

let PORT = process.env.PORT
app.listen(PORT, (error)=>{
    if(error){
        console.log("Error loading...")
    }
    else{
        console.log(`Server connected successfullly at port ${PORT}`)
    }

})