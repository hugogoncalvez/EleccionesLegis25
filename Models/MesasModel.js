import db from "../database/db.js";

import { DataTypes } from "sequelize";
import EscuelaModel from "./EscuelaModel.js";

const MesasModel = db.define('mesas', {
    num_mesa: { type: DataTypes.STRING },
    num_esc: { type: DataTypes.STRING },
    cargada: { type: DataTypes.STRING },
    usuario_en_uso: { type: DataTypes.INTEGER, allowNull: true } // Nuevo campo para el ID del usuario en uso
})

// Definir asociación
MesasModel.belongsTo(EscuelaModel, { foreignKey: 'num_esc', targetKey: 'numero', as: 'escuela_model' }); // Asumiendo que num_esc se relaciona con numero en EscuelaModel

export default MesasModel
