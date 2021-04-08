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
    tags: [String, String],
    data: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
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
    const courses = await Course
      .find({ tags: "backend", isPublished: true })
     // .find()
     // .or ([{author:'Tom'}, {isPublished:true}])
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, author: 1 })
    console.log("course", courses);
  }
  //createCourse();
  getCourse();