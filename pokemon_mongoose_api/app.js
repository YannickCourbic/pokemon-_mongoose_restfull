const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const generationsRoutes = require("./src/routes/generations.route");
const pokemonsRoutes = require("./src/routes/pokemons.route");
const typeRoutes = require("./src/routes/types.route");
app
    .use(express.json())
    .use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    .use(cors())

app.use("/api/v1/generations" , generationsRoutes);
app.use("/api/v1/pokemons" , pokemonsRoutes);
app.use("/api/v1/types" , typeRoutes);


app.listen(port , () => {
    console.log(`Notre application Node a démarée sur : http://localhost:${port}`);
})