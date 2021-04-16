const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema]
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId) {
  const course = await Course.findById(courseId);
  course.author.name = " Tom Lee";
  course.save();
}

async function addAuthor(courseId, author){
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
}
// createCourse("Node Course", [
//   new Author({ name: "Tom" }),
//   new Author({ name: "Jack" })
// ]);
//updateAuthor('6078e1860c101a48a509282f');
//addAuthor('6079dc19b5e4377c8199a332',new Author({ name: "Amy" }));
removeAuthor('6079dc19b5e4377c8199a332','6079dd5f6e68197d7919ba4e');