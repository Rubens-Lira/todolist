/* eslint-disable @typescript-eslint/no-unused-vars */
function errorHandlerMidleWare(error, request, response, next) {
  console.error("ERROR HANDLER: ", error);
  response.status(error.status || 500).json({
    message: error.message || "Internal server error",
  });
}

export default errorHandlerMidleWare;
