const functions = require("firebase-functions");
const faker = require("faker");
const _ = require("lodash");

exports.products = functions.https.onRequest((request, response) => {
  const categories = [
    "Car",
    "Motorcycle",
    "Property",
    "Personal Purpose",
    "Electronic",
    "Sport",
    "Household",
    "Child",
    "Industry",
    "Service"
  ];
  response.json({
    products: _.times(20, index => {
      return {
        id: index,
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        description: faker.lorem.sentences(),
        category: categories[faker.random.number(9)],
        like: false,
        img: "https://picsum.photos/400/500/?random",
        rating: faker.random.number(5),
        seller: {
          sellerName: faker.name.firstName(),
          sellerImg: faker.image.avatar(),
          sellerRating: faker.random.number(5),
          positiveFeedback: faker.random.number(100)
        },
        feedback: {
          costumer: faker.random.word(),
          comment: faker.random.words()
        }
      };
    })
  });
});

exports.loginAuth = functions.https.onRequest((request, response) => {
  const email = request.body.email;
  const password = request.body.password;

  if (email === "heru@heru.com" && password === "123123") {
    response.status(200);
    response.json({
      user: {
        email: "heru@heru.com",
        password: "123123",
        address: "cijeunjing st",
        first_name: "heru",
        phone: "0895322072106",
        birthdate: "15 Juli 1999",
        gender: "male",
        last_name: "julyanto"
      }
    });
  } else if (email === "" && password === "") {
    response.status(401);
    response.json({
      errorMessage: "enter email and password "
    });
  } else {
    response.status(404);
    response.json({
      errorMessage: "Incorrect email or password"
    });
  }
});
