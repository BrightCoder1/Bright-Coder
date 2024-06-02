require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const connectDB = require("./Database/db");
const Register = require("./Database/schema");
const contactDB = require("./Database/contactSchema");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(201).render("home");
});

app.get("/register", (req, res) => {
  res.status(201).render("register");
});
app.post("/register", async (req, res) => {
  try {
    // const userEnter = req.body;
    const password = req.body.password;
    const cpassword = req.body.confirm_password;

    if (password === cpassword) {
      const email = req.body.email;

      const userExist = await Register.findOne({ email: email });
      console.log(userExist);

      if (!userExist) {
        const userEneter = Register({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          confirm_password: req.body.confirm_password,
        });
        // // generate token
        // const token = await userEneter.generateToken();
        // res.cookie("Register Cookie",token,{
        //   expires: new Date(Date.now() + 60000),
        //   httpOnly:true
        // });

        const usersave = await userEneter.save();
        console.log(usersave);
        res.status(201).redirect("/");
      } else {
        res.status(404).json({ msg: "user alredy exist" });
      }
    } else {
      res.status(404).json({ msg: "Invalid Details" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", (req, res) => {
  res.status(201).render("login");
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user
  const userExist = await Register.findOne({ email: email });
  console.log(userExist);

  if (!userExist) {
    res.status(404).json({ msg: "Invalid Details" });
  }

  // password compare
  const user = await userExist.comparePassword(password);
  // const token = await userExist.generateToken();
  // console.log(token);
  // res.cookie("Login Cookies",token,{
  //   expires: new Date(Date.now() + 60000),
  //   httpOnly:true
  // })
  if (user) {
    res.status(200).redirect("/");
  } else {
    res.status(404).json({ msg: "Invalid Details" });
  }
});

// admin
app.get("/admin", async (req, res) => {
  const adminData = await Register.find({});
  res.status(201).render("admin", {
    users: adminData,
  });
});

app.get("/course", (req, res) => {
  res.status(202).render("notfound");
});

app.get("/notes", (req, res) => {
  res.status(202).render("notfound");
});

app.post("/contact", async (req, res) => {
  const email = req.body.email;
  // console.log(email);
  const emailExist = await Register.findOne({ email: email });
  // console.log(emailExist);
  if (emailExist) {
    const data = new contactDB({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    const contactResponse = await data.save();
    // console.log(contactResponse);
    res.status(202).redirect("/");
  } else {
    res.status(202).redirect("/register");
  }
});
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
});
