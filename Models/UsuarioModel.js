// import la conexion a la base de datos

import db from "../database/db.js";

// importar sequelize

import { DataTypes } from "sequelize";


const UsuarioModel = db.define('usuarios',{
    usuario:{type: DataTypes.STRING},
    pass:{type: DataTypes.STRING},
    tipo:{type: DataTypes.INTEGER},
})

export default UsuarioModel;