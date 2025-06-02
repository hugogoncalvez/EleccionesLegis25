import db from "../database/db.js";

import { DataTypes } from "sequelize";

const LemasModel = db.define('lemas', {
    numero: { type: DataTypes.STRING },
    partido: { type: DataTypes.STRING },
})


export default LemasModel
