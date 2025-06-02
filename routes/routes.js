import express from "express";
import {
    loginUsu, getEscuelas, getMesas, getMesasCargadas, getCertificado, getLemas,
    getOtrosResultXMesa, createDip, getDipResult, getOtros, createOtrosVotos, updateMesa, updateDip, updateOtrosVotos,
    getTotaDip, getTotalOtrosVotos, getTotalMesas, getTotalMesasCargadas, deleteMesa, updateMesaBorrada, marcarMesaEnUso, liberarMesa,
    getAllDipResults, getTotalOtrosRes
} from "../controllers/Controller.js";



const router = express.Router();

router.post('/marcar-mesa-en-uso', marcarMesaEnUso);
router.post('/liberar-mesa', liberarMesa);
router.get('/mesas', getMesas)
router.get('/mesascargadas', getMesasCargadas)
router.get('/totalmesascargadas', getTotalMesasCargadas)
router.get('/totalmesas', getTotalMesas)
router.put('/mesa/:num', updateMesa)
router.put('/upmesaborrada/:num', updateMesaBorrada)
router.delete('/deletemesa/:num', deleteMesa)

router.get('/escuelas', getEscuelas)
router.get('/certificado', getCertificado)
router.get('/lemas', getLemas)


router.get('/dipresultados/:mesa', getDipResult)
router.post('/diputado', createDip)
router.put('/updateDip/:num', updateDip)
router.get('/totaldip', getTotaDip)
router.get('/alldipresults', getAllDipResults); // Nueva ruta para todos los resultados de diputados

router.get('/totalotrosvotos', getTotalOtrosVotos)
router.get('/otrosvotos', getOtros)
router.get('/otrosresultados/:mesa', getOtrosResultXMesa)
router.post('/otrosvotos', createOtrosVotos)
router.put('/updateotros/:num', updateOtrosVotos)
router.get('/totalotrosres', getTotalOtrosRes)
//router.get('/totaldiputados', getTotaDiputados); // Nueva ruta para totales de diputados

// router.get('/nota/:id', getNota)
//router.post('/', inject('gob'), createDip)
// router.put('/nota/:id', updateNota)
// router.delete('/nota/:id', deleteNota)

// router.post('/register', createUsu)
router.get('/login/:usuario', loginUsu)



export default router
