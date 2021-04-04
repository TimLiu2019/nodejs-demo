// callback
// getCustomer(1, (customer) => {
//   console.log('Customer: ', customer);
//   if (customer.isGold) {
//     getTopMovies((movies) => {
//       console.log('Top movies: ', movies);
//       sendEmail(customer.email, movies, () => {
//         console.log('Email sent...')
//       });
//     });
//   }
// });

// Async and await
async function getCustomerInfo() {
  try {
    const customer = await getCustomer(1);
    console.log("customer: ", customer);
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("Top movies: ", movies);
      await sendEmail(customer.email, movies);
      console.log("Email sent...");
    }
  } catch (err) {
    console.log("Error: ", err.message);
  }
}
getCustomerInfo();

function getCustomer(id) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle({
        id: 1,
        name: "Tim",
        isGold: true,
        email: "email"
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle();
    }, 4000);
  });
}
