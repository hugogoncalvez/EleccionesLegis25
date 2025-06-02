import db from "../database/db.js";

import { DataTypes } from "sequelize";

const OVRModel = db.define('otrosvotosres', {
    num_esc: { type: DataTypes.STRING },
    mesa: { type: DataTypes.STRING },
    tipoVoto: { type: DataTypes.INTEGER },
    diputado: { type: DataTypes.INTEGER },
    usuario: { type: DataTypes.STRING }
})


export default OVRModel