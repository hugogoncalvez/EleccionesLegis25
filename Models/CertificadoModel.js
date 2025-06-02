import db from "../database/db.js";

import { DataTypes } from "sequelize";

const CertificadoModel = db.define('certificados', {
    numero: { type: DataTypes.STRING },
    partido: { type: DataTypes.STRING },
    diputado: { type: DataTypes.INTEGER },
    // parMerNac: { type: DataTypes.INTEGER },
    // senadores: { type: DataTypes.INTEGER },
    // diputados: { type: DataTypes.INTEGER },
    // parMerReg: { type: DataTypes.INTEGER }
})


export default CertificadoModel
