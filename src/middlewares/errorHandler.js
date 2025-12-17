export default function errorHandler(error, req, res, next){
    console.log("error:", error);
    res.status(error.status || 500).json({
    mesagge: error.message || 'error interno del servidor'
  });
}