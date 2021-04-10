const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"]
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: "A course should have at least one tag."
    }
  },
  data: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublished;
    }
  }
});
const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
 //   name: "Node Course",
    author: " Mary M",
    category: "web",
    // tags: ["node", "backend"],
    isPublished: true,
    price: 20
  });
  try {
    const result = await course.save();
    console.log("result", result);
  } catch (ex) {
    for (field in ex.errors)
    {
      console.log(ex.errors[field].message);
    }
     
  }
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
    .or([{ author: "Tom" }, { isPublished: true }])
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .countDocuments();
  console.log("course", courses);
}
// update a course
//  async function updateCourse(id){
//    const course = await Course.findById(id);
//    if(!course) {
//      console.error('No this course!')
//      return;}
//    course.isPublished = true;
//    course.author = 'new author';
//    const result = await course.save();
//    console.log(result);
//  }
// update first
async function updateCourse(id) {
  const result = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Mosh",
        isPublished: false
      }
    },
    { new: true }
  );

  console.log(result);
}
// delete course
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });

  console.log(result);
}

//updateCourse('606c5db85f5a421446507ac7');
createCourse();
// getCourse();
//removeCourse('606c5db85f5a421446507ac7');
