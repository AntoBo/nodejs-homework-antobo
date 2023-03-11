export default (error, data, next) => {
    error.status = 422;
    next();
};
