const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

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
