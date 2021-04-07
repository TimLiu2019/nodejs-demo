const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String, String],
  data: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Node Course",
    author: "Tom",
    tags: ["node", "backend"],
    isPublished: true
  });
  const result = await course.save();
  console.log("result", result);
}

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
    //.find({ author: "Tom", isPublished: true })
    .find()
    .or ([{author:'Tom'}, {isPublished:true}])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count()
  console.log("course", courses);
}
//createCourse();
getCourse();
