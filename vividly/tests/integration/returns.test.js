const request = require("supertest");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  const exec = () => {
    return request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ movieId, customerId });
  };
  beforeEach(async () => {
    server = require("../../index");
    customerId = mongoose.Types.ObjectId();
    movieId = mongoose.Types.ObjectId();
    token = new User().generateAuthToken();
    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345"
      },
      movie: {
        _id: movieId,
        title: "movie title",
        dailyRentalRate: 2
      }
    });
    await rental.save();
  });
  afterEach(async () => {
    await server.close();
    //remove all
    await Rental.remove({});
  });
  //   it("should work!", async () => {
  //     const result = await Rental.findById(rental._id);
  //     expect(result).not.toBeNull();
  //   });

  it("should should return 401 if client is not logged in", async () => {
    const res = await request(server)
      .post("/api/returns")
      .send({ customerId, movieId });

    expect(res.status).toBe(401);
  });

  it("should should return 400 if customerId is not provided", async () => {
    customerId = "";
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should should return 400 if movieId is not provided", async () => {
    const token = new User().generateAuthToken();
    const res = await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId });

    expect(res.status).toBe(400);
  });
});
