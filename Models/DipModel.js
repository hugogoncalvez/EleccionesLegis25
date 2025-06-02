import db from "../database/db.js";
import { DataTypes } from "sequelize";
import MesasModel from "./MesasModel.js";
import LemasModel from "./LemasModel.js"; // Importar LemasModel

const DipModel = db.define('diputados', {
    num_esc: { type: DataTypes.STRING },
    mesa: { type: DataTypes.STRING },
    num_partido: { type: DataTypes.STRING },
    diputado: { type: DataTypes.INTEGER },
    usuario: { type: DataTypes.STRING },
})

// Definir asociaciones
DipModel.belongsTo(MesasModel, { foreignKey: 'mesa', targetKey: 'num_mesa', as: 'mesa_model' });
DipModel.belongsTo(LemasModel, { foreignKey: 'num_partido', targetKey: 'numero', as: 'lema_model' }); // Nueva asociación

export default DipModel
