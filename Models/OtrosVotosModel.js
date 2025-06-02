import db from "../database/db.js";

import { DataTypes } from "sequelize";

const OtrosVotosModel = db.define('otrosvotos', {
    tipoVoto: { type: DataTypes.STRING },
    diputado: { type: DataTypes.STRING },
})


export default OtrosVotosModel