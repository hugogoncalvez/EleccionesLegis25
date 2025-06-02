import express from "express";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
import { PORT, DB_PORT } from "./config.js";

//importar la base de datos
import db from './database/db.js';

//importar las rutas
import Routes from './routes/routes.js';


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', Routes, express.static(path.join(__dirname, 'dist')));

// try {
//     await db.authenticate();
//     console.log('Conexion exitosa a la DB')
// } catch (error) {
//     console.log(`No se pudo conectar a la DB : ${error}`)
// }
(async () => {
    try {
        await db.authenticate();
        console.log('Conexión exitosa a la DB');
    } catch (error) {
        console.log(`No se pudo conectar a la DB: ${error}`);
    }

    try {
        // Sincroniza los modelos con la base de datos
        await db.sync(); // Esto aplicará las asociaciones y creará las tablas si no existen
        console.log('Modelos sincronizados con éxito');
    } catch (error) {
        console.log(`Error al sincronizar los modelos: ${error}`);
    }

})();
console.log('puerto app')
console.log(PORT)

console.log('puerto DB')
console.log(DB_PORT)

app.get('*', (req, res) => {
    // res.send('Server Node OnLine !!')
    res.sendFile(path.join(__dirname, 'dist', 'index.html')) // poner el nombre de la carpeta donde se ubica la build
});


app.listen(PORT, () => {
    console.log(`Server UP running in http://localhost:${PORT}/`)
})
