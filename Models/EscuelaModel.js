import db from "../database/db.js";

import { DataTypes } from "sequelize";

const EscuelaModel = db.define('escuelas', {
    nombre: { type: DataTypes.STRING },
    numero: { type: DataTypes.STRING },
    cantidad_electores: { type: DataTypes.INTEGER },
})


export default EscuelaModel