// first connect to 
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB exercise..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

  // create a schema
  const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String],
    data: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {type: Number, required: function(){this.isPublished}},
    __v: Number

  });
  // create a course
  const Course = mongoose.model("Course", courseSchema);

  // get

  async function getCourse() {
    //eq (equal)
    // ne (not equal)
    // gt (greater than)
    //gte(greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    //in
    // nin (notin)
    // .find ({price: {$gte:10, $lte:20}})

    // get backend and published
    // const courses = await Course
    //   .find({ tags: "backend", isPublished: true })
    //   .limit(10)
    //   .sort({ name: 1 })
    //   .select({ name: 1, author: 1 })
    
    // cources including backend or frontend: $in:[]
    // price in descending order, from big to small or use or
  //   const courses = await Course
  //  // .find({ tags:  {$in:['backend','frontend']}, isPublished: true })
  //   .find({isPublished: true })
  //   .or ([{tags:'backend'},{tags:'frontend'}])
  //   .limit(10)
  //   .sort({ price: -1 })
  //   .select({ name: 1, author: 1 ,price:1})
  //   console.log("course", courses);

    // get all courses that are $15 or more 
    // or have the word  'by' in their title
    // price in descending order, from big to small or use or
    const courses = await Course
    .find({isPublished:true})
    .or ([{price: {$gte:15}},{name: /.*by.*/}])
    .limit(10)
    .sort({ price: -1 })
    .select({ name: 1, author: 1 ,price:1})
    console.log("course", courses);
  }
  //createCourse();
  getCourse();