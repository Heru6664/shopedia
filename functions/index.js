const functions = require("firebase-functions");
const faker = require("faker");
const _ = require("lodash");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://shopedia-10ff0.firebaseio.com/"
});

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
          positiveFeedback: faker.random.number(100),
          sellerPlace: faker.address.city()
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
  const db = admin.database();

  if (email === "heru@heru.com" && password === "123123") {
    const ref = db.ref("user/0");
    ref.once("value", data => {
      response.status(200);
      response.json(data);
    });

    response.status(200);
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

exports.updateProfile = functions.https.onRequest((request, response) => {
  admin
    .database()
    .ref("user/0")
    .set(request.body, error => {
      if (error) {
        response.status(500);
      } else {
        response.status(200);
        response.json(request.body);
      }
    });
});

exports.addAddress = functions.https.onRequest((req, res) => {
  const user = admin.database().ref("user/0/address");
  const ref = user.push(req.body);

  const key = ref.key;
  res.status(200);
  res.json({ [key]: req.body });
});
