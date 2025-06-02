// importar el Modelo
import UsuarioModel from "../Models/UsuarioModel.js"
import EscuelaModel from "../Models/EscuelaModel.js";
import db from "../database/db.js";
import { Sequelize } from "sequelize";
import MesasModel from "../Models/MesasModel.js";
import LemasModel from "../Models/LemasModel.js";
import DipModel from "../Models/DipModel.js";
//import SenModel from "../Models/SenModel.js";
//import AgrupacionesModel from "../Models/AgrupacionesModel.js";
import OtrosVotosModel from "../Models/OtrosVotosModel.js";
import OVRModel from "../Models/OtrosVotosResultModel.js";
import CertificadoModel from "../Models/CertificadoModel.js";




// metodos para el CRUD

// Nuevo endpoint para marcar mesa en uso
export const marcarMesaEnUso = async (req, res) => {
    try {
        const { num_mesa, userId } = req.body;
        const mesa = await MesasModel.findOne({ where: { num_mesa } });

        if (!mesa) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }

        if (mesa.cargada !== 'no') {
            return res.status(409).json({ message: 'La mesa ya está en uso o cargada' });
        }

        await mesa.update({ cargada: 'en_uso', usuario_en_uso: userId });
        res.status(200).json({ message: 'Mesa marcada como en uso' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Clientes

// mostrar todos
// export const prueba = async (req, res) => {
//     try {
//         const projects = await db.query('SELECT * FROM inventarios', {
//             model: InvModel,
//             mapToModel: false // pass true here if you have any mapped fields
//         });
//         res.json(projects)
//         console.log(res)
//         //const resp = await InvModel.sequelize.query('Select * from Inventarios;')
//         //console.log(resp)
//         //  res.resp
//         // console.log(res)
//     } catch (e) {
//         console.log(e)
//     }
// }
export const getEscuelas = async (req, res) => {
    try {
        const escuelas = await EscuelaModel.findAll({
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(escuelas)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getOtros = async (req, res) => {
    try {
        const otrosVotos = await OtrosVotosModel.findAll({
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(otrosVotos)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getMesas = async (req, res) => {
    try {
        const mesas = await MesasModel.findAll({
            order: [
                ["num_mesa", "ASC"]
            ]
        })
        res.json(mesas)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getMesasCargadas = async (req, res) => {
    try {
        const mesas = await MesasModel.findAll({
            where: {
                cargada: '1'
            },
            order: [
                ["num_mesa", "ASC"]
            ]
        })
        res.json(mesas)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getCertificado = async (req, res) => {

    try {
        const certificado = await CertificadoModel.findAll({
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(certificado)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getLemas = async (req, res) => {
    try {
        const lemas = await LemasModel.findAll({

            order: [
                ["id", "ASC"]
            ]
        })
        res.json(lemas)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getAgrupaciones = async (req, res) => {
    try {
        const agrupaciones = await AgrupacionesModel.findAll({

            order: [
                ["num_partido", "ASC"]
            ]
        })
        res.json(agrupaciones)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getDipResult = async (req, res) => {
    try {
        const mesas = await DipModel.findAll({
            where: {
                mesa: req.params.mesa
            },
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(mesas)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// export const getSenResult = async (req, res) => {
//     try {
//         const mesas = await SenModel.findAll({
//             where: {
//                 mesa: req.params.mesa
//             },
//             order: [
//                 ["id", "ASC"]
//             ]
//         })
//         res.json(mesas)
//     } catch (error) {
//         res.json({ message: error.message })
//     }
// }

export const getOtrosResultXMesa = async (req, res) => {
    try {
        const mesas = await OVRModel.findAll({
            where: {
                mesa: req.params.mesa
            },
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(mesas)
    } catch (error) {
        res.json({ message: error.message })
    }
}
export const getTotalOtrosRes = async (req, res) => {
    try {
        const mesas = await OVRModel.findAll({
            order: [
                ["id", "ASC"]
            ]
        })
        res.json(mesas)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getTotaDip = async (req, res) => {
    try {
        const totales = await db.query('SELECT DISTINCT `diputados`.`num_partido`,  SUM(`diputados`.`diputado`) AS diputados FROM `diputados` GROUP BY `num_partido` ORDER BY CAST(`diputados`.`num_partido` AS UNSIGNED);',
            {
                model: DipModel,
                mapToModel: false // pass true here if you have any mapped fields
            });
        res.json(totales)
    } catch (error) {
        res.json({ message: error.message })
    }
}
// export const getTotalSen = async (req, res) => {
//     try {
//         const totales = await db.query('SELECT DISTINCT `agrupaciones`.`num_provincial`, `agrupaciones`.`letra`, `agrupaciones`.`lista_provincial`, `agrupaciones`.`candidato`, SUM(`senadores`.`senadores`) AS senadores, SUM(`senadores`.`diputados`) AS diputados, SUM(`senadores`.`parMerReg`) AS parReg FROM `senadores` INNER JOIN `agrupaciones` ON `agrupaciones`.`num_provincial` = `senadores`.`num_partido` GROUP BY `lista_provincial`;',
//             {
//                 model: DipModel,
//                 mapToModel: false // pass true here if you have any mapped fields
//             });
//         res.json(totales)
//     } catch (error) {
//         res.json({ message: error.message })
//     }
// }
export const getTotalOtrosVotos = async (req, res) => {
    try {
        const totales = await db.query('SELECT DISTINCT `tipoVoto` AS tipo,SUM(`diputado`) AS diputado FROM `otrosvotosres` GROUP BY `tipoVoto`;',
            {
                model: DipModel,
                mapToModel: false // pass true here if you have any mapped fields
            });
        res.json(totales)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getTotalDiputados = async (req, res) => {
    try {
        const totales = await db.query(`
            SELECT SUM(diputado) AS total_diputados FROM diputados;
        `, {
            type: Sequelize.QueryTypes.SELECT // Especificar el tipo de consulta para obtener un resultado plano
        });
        res.json(totales);
    } catch (error) {
        console.error("Error en getTotalDiputados:", error);
        res.status(500).json({ message: error.message });
    }
}


export const getTotalMesas = async (req, res) => {
    try {
        const totales = await db.query('SELECT COUNT(*) AS mesas FROM `mesas`;',
            {
                model: MesasModel,
                mapToModel: false // pass true here if you have any mapped fields
            });
        res.json(totales)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getTotalMesasCargadas = async (req, res) => {
    try {
        const totales = await db.query('SELECT COUNT(*) AS cargadas FROM `mesas` WHERE `cargada` = 1;',
            {
                model: MesasModel,
                mapToModel: false // pass true here if you have any mapped fields
            });
        res.json(totales)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getAllDipResults = async (req, res) => {
    try {
        const results = await DipModel.findAll({
            include: [
                {
                    model: MesasModel,
                    as: 'mesa_model', // Usar el alias definido en el modelo
                    attributes: ['num_esc'], // Incluir el número de escuela de la mesa
                    include: {
                        model: EscuelaModel,
                        as: 'escuela_model', // Usar el alias si está definido en MesasModel
                        attributes: ['nombre'] // Incluir el nombre de la escuela
                    }
                },
                {
                    model: LemasModel, // Incluir LemasModel
                    as: 'lema_model', // Usar el alias definido en DipModel
                    attributes: ['partido', 'candidato'] // Incluir el nombre del partido
                }
            ],
            order: [
                ['mesa', 'ASC'],
                ['num_partido', 'ASC']
            ]
        });
        res.json(results);
    } catch (error) {
        console.error("Error en getAllDipResults:", error);
        res.status(500).json({ message: error.message });
    }
}

export const createDip = async (req, res) => {
    let transaction
    try {
        transaction = await db.transaction()
        await DipModel.bulkCreate(req.body, { transaction })
        // Simula un error para probar el rollback
        //throw new Error('Simulación de error');
        await transaction.commit();
        res.json({ "message": 'Registro creado correctamente' })
    } catch (error) {
        if (transaction) await transaction.rollback();

        if (error.name === 'SequelizeDatabaseError') {
            res.json('Error de base de datos: ', error);
        } else {
            res.json('Error de conexión: ', error);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await DipModel.bulkCreate(req.body, { transaction })
        await transaction.commit();
    }
}

// export const createSen = async (req, res) => {
//     let transaction
//     try {
//         transaction = await db.transaction()
//         await SenModel.bulkCreate(req.body, { transaction })
//         await transaction.commit();
//         res.json({ "message": 'Registro creado correctamente' })

//     } catch (error) {
//         if (transaction) await transaction.rollback();

//         if (Sequelize.DatabaseError === error.name) {
//             res.json('Error de base de datos: ', error);
//         } else {
//             res.json('Error de conexión: ', error);
//         }
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         await SenModel.bulkCreate(req.body, { transaction })
//         await transaction.commit();
//     }
// }
export const createOtrosVotos = async (req, res) => {
    let transaction
    try {
        transaction = await db.transaction()
        await OVRModel.bulkCreate(req.body, { transaction })
        await transaction.commit();
        res.status(200).send()

    } catch (error) {
        if (transaction) await transaction.rollback();
        console.error("Error en createOtrosVotos:", error); // Añadir log de error
        res.status(500).json({ "message": error.message }); // Devolver un error 500
    }
}

export const updateDip = async (req, res) => {
    const dataUpdate = req.body
    let transaction
    try {
        transaction = await db.transaction()
        await Promise.all(dataUpdate.map(data => {
            return DipModel.update(data, {
                where: { mesa: data.mesa, num_partido: data.num_partido },
                transaction
            });
        }))
        await transaction.commit();
        res.status(200).send()
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.log({ "message": error.message })
    }
}

// export const updateSen = async (req, res) => {
//     const dataUpdate = req.body
//     let transaction
//     try {
//         transaction = await db.transaction()
//         await Promise.all(dataUpdate.map(data => {
//             return SenModel.update(data, {
//                 where: { mesa: data.mesa, num_partido: data.num_partido, letra: data.letra },
//                 transaction
//             })
//         }))
//         await transaction.commit();
//         res.status(200).send()
//     } catch (error) {
//         if (transaction) {
//             await transaction.rollback();
//         }
//         res.json({ "message": error.message })
//     }
// }
export const updateOtrosVotos = async (req, res) => {
    const dataUpdate = req.body
    let transaction
    try {
        transaction = await db.transaction()
        await Promise.all(dataUpdate.map(data => {
            return OVRModel.update(data, {
                where: { mesa: data.mesa, tipoVoto: data.tipoVoto },
                transaction
            })
        }))
        await transaction.commit();
        res.status(200).send()
    } catch (error) {
        res.json({ "message": error.message })
    }
}

export const updateMesa = async (req, res) => {
    console.log(req.params)
    try {
        await MesasModel.update(
            {
                cargada: '1'
            },
            {
                where: { num_mesa: req.params.num }
            })
        res.status(200).send()
    } catch (error) {
        console.error("Error en updateMesa:", error); // Añadir log de error
        res.status(500).json({ "message": error.message }) // Devolver un error 500
    }
}

// Borrar una Mesa Cargada

export const deleteMesa = async (req, res) => {

    try {
        await DipModel.destroy(

            {
                where: { mesa: req.params.num }
            }).then(
                await OVRModel.destroy(

                    {
                        where: { mesa: req.params.num }
                    }).then(
                        await DipModel.destroy(

                            {
                                where: { mesa: req.params.num }
                            }).then(
                                await MesasModel.update(
                                    {
                                        cargada: 'no', // Marcar como no cargada (disponible)
                                        usuario_en_uso: null // Liberar usuario en uso
                                    },
                                    {
                                        where: { num_mesa: req.params.num }
                                    }).then(
                                        res.status(200).send()
                                    )
                            )
                    )
            )

    } catch (error) {
        res.json({ "message": error.message })
    }
}

// Nuevo endpoint para liberar una mesa
export const liberarMesa = async (req, res) => {
    try {
        const { num_mesa } = req.body;
        const mesa = await MesasModel.findOne({ where: { num_mesa } });

        if (!mesa) {
            return res.status(404).json({ message: 'Mesa no encontrada' });
        }

        await mesa.update({ cargada: 'no', usuario_en_uso: null });
        res.status(200).json({ message: 'Mesa liberada correctamente' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateMesaBorrada = async (req, res) => {

    try {

        await MesasModel.update(
            {
                cargada: 'no', // Marcar como no cargada (disponible)
                usuario_en_uso: null // Liberar usuario en uso
            },
            {
                where: { num_mesa: req.params.num }
            }).then(
                res.status(200).send()
            )

    } catch (error) {
        res.json({ "message": error.message })
    }
}


//  USUARIO
// crear usuario

export const createUsu = async (req, res) => {
    try {

        await UsuarioModel.create(req.body)
        res.json({ "msg": "Usuario creado correctamente", "msgError": "" })

    } catch (err) {

        const errObj = {};
        err.errors.map((e) => {
            errObj['msgError'] = e.message;
            errObj['value'] = e.value;
        })

        res.json({
            "msgError": errObj.msgError,
            "value": errObj.value
        })
    }
}

// login de usuario

export const loginUsu = async (req, res) => {

    try {
        const login = await UsuarioModel.findAll({
            where: {
                usuario: req.params.usuario,
            }
        });

        if (login.length === 0) {
            let respuesta = ({ ...login, error: "No existe el usuario, debe darse de alta", pass: "sin Pass" });
            res.json(respuesta);
        } else {
            // Devolver también el ID del usuario
            res.json({
                id: login[0].dataValues.id,
                usuario: login[0].dataValues.usuario,
                tipo: login[0].dataValues.tipo,
                pass: login[0].dataValues.pass // Asegúrate de que la contraseña no se envíe en producción
            });
        }


    } catch (error) {

    }
}
