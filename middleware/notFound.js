module.exports = (req, res, next ) => {
    return res.status(404).json({code: 404, message:'URL no encontrado'});// mensaje de error si la ruta no existe
}