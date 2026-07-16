import dotenv from "dotenv";

dotenv.config();


import app from "./app.js";
import sequelize from "./config/database.js";


const PORT = process.env.PORT || 5000;



const startServer = async () => {

  try {


    await sequelize.authenticate();


    console.log(
      "Database Connected Successfully"
    );



    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });



  } catch (error) {


    console.error(
      "Database Connection Failed"
    );


    console.error(
      error.message
    );


    process.exit(1);

  }

};



startServer();