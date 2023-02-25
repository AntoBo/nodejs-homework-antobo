const handleMongooseError = (error, data, next) => {
    error.status = 422;
    next();
};

export default handleMongooseError;
