const handleError = (error, req, res, next) => {
    res.status(400);
    console.error(error);
  
    const message = error.message;
  
    const unauthorizedIdentifier = "Unauthorized";
    if (message && message.startsWith(unauthorizedIdentifier)) {
      res.status(401);
    }
  
    res.json({ message, success: false });
}
  
export default handleError;