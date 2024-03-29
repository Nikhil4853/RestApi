// // src/routes/authRoutes.js
// const express = require("express");
// const router = express.Router();
// const bodyParser = require('body-parser');


// const { getAllUser, register } = require('../controllers/UserOperations');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: true }));
// router.use(express.static('public'));


// // multer for image file
// const multer = require("multer");
// const paths = require("path");
// const storage=multer.diskStorage({
//     destination: function (req, file, cb) {

//         cb(null, paths.join(__dirname,"../../public/userImages", function (error, success) {
//             if (error) {
//                 throw error
//             }
//         }))
//     }, filename: function (req, file, cb) {
//         const name = Date.now() + "_" + file.originalname;
//         cb(null, name, function (error1, success1) {
//             if (error1) {
//                 throw error1
//             }
//         })
//     }
// });


// const upload=multer({storage:storage})



// // post (register) user 
// router.route("/newUser/register").post(upload.single('image'),register);


// // get user 
// router.route("/getUser").get(getAllUser);
// module.exports = router;
 


const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");

const { getAllUser, register,login } = require('../controllers/UserOperations');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public'));

// Define destination function
const destination = function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/userImages"));
};

// Define filename function
const filename = function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
};

// Set up multer storage
const storage = multer.diskStorage({
    destination: destination,
    filename: filename
});

// Create multer instance
const upload = multer({ storage: storage });

// Get user
router.get("/getUser", getAllUser);

// Post (register) user
router.post("/newUser/register", upload.single('image'), register);

// login 
router.post("/login", login)

module.exports = router;
