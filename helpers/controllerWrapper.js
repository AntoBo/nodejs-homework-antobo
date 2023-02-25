export default (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            // console.log("controllerWrapper error :>> ", error);
            next(error);
        }
    };
};
