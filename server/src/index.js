// framework utilisé par le serveur node
import express from "express";
// permet de lire les variables d'environnement contenues dans .env
import dotenv from "dotenv";
// permet de lire le contenu des cookies
import cookieParser from "cookie-parser";
import cors from "cors";
// permet de préciser où sont les routes
import routes from "./routes/index.js";

// récupère la connexion à la base de données
import { connectDB } from "./lib/db.js";

// indique que l'on va utiliser .env
dotenv.config();

const PORT = process.env.PORT;

// indique que note application utilise express
const app = express();

// indique que l'on va pourvoir traduire l eJSON et que l'on va utiliser des cookies
app.use(express.json());
app.use(cookieParser());

// chaque root localhost:2003 sera redirigé vers le dossier routes
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`le serveur est démarré sur le port ${PORT}`);
  connectDB();
});
