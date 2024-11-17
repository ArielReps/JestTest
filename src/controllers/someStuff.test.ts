import request from "supertest";
import app from "../app"; // הנתיב לאפליקציית אקספרס שלך
import mongoose from "mongoose";

beforeAll(async () => {
  await mongoose.connection.dropDatabase();
});
afterAll(async () => {
  await mongoose.connection.close();
});
afterEach(async()=>{
  await mongoose.connection.dropDatabase();
})

describe("User API", () => {
  test("POST /register, creating new user in database, should pass", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({
        name: "Ariel",
        email: "Arielohanapc@gmail.com",
        password: "123456",
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty("_id");
    expect(res.body.data.name).toBe("Ariel");
  
  });
  test("POST /register, creating new user in database, should fail for email", async () => {
    const res = await request(app)
      .post("/users/register")
      .send({ name: "Esterika", email: "Arielohanap", password: "123456" })
      .expect(500);
  });

  test("PUT /editname, Edit the name of a user in database, should pass and return updated user", async () => {
    const addUser = await request(app)
    .post("/users/register")
    .send({
      name: "Ariel",
      email: "Arielohanapc@gmail.com",
      password: "123456",
    });
    const res = await request(app)
      .put("/users/editname")
      .send({ name: "Esterika", _id: addUser.body.data._id })
      .expect(200);
    expect(res.body.message).toBe("Name was changed to: Esterika");
  });
  test("POST /Login, Registers and login", async() =>{
      const register = await request(app)
      .post("/users/register")
      .send({
        name: "Ariel",
        email: "Arielohanapc@gmail.com",
        password: "123456",
      })
      expect(register.status).toBe(201)
      const login = await request(app)
      .post("/users/login")
      .send({
        email:"Arielohanapc@gmail.com",
        password:"123456",
      })
      expect(login.status).toBe(200)
      expect(login.body.data._id).toBe(register.body.data._id)

  })  
});
