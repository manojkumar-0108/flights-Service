const { AirplaneRepository } = require('../repositories');
const { AppError, InternalServerError } = require('../errors/');
const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');


let airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {

    try {

        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch (error) {

        if (error.name == 'SequelizeValidationError') {

            let explanation = [];

            error.errors.forEach((err) => {
                explanation.push(err.message);
            });


            Logger.error({ message: "Something went wrong doing validation", error: error });

            throw new AppError(StatusCodes.BAD_REQUEST, "Something went wrong doing validation", explanation);

        }

        throw new InternalServerError("Cannot create a new Airplane Object");

    }
}


async function getAirplanes() {

    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;

    } catch (error) {

        Logger.error({ message: "Something went wrong fetching airplanes", error: error });
        throw new InternalServerError("Cannot get the airplanes");
    }
}

async function getAirplane(id) {

    try {

        const airplane = await airplaneRepository.get(id);
        return airplane;

    } catch (error) {

        Logger.error({ message: "Something went wrong fetching airplane", error: error });
        if (error.statusCode == StatusCodes.NOT_FOUND) {

            throw new AppError(error.statusCode, "Cannot fetched the airplane", ["Resource requested is not present"]);
        }

        throw new InternalServerError("Cannot get the airplane");
    }
}

async function destroyAirplane(id) {

    try {

        const airplane = await airplaneRepository.destroy(id);
        return airplane;

    } catch (error) {
        Logger.error({ message: "Something went wrong deleting airplane", error: error });

        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.statusCode, "Cannot delete the airplane", ["Resource requested to delete is not present"]);
        }

        throw new InternalServerError("Cannot delete the airplane");
    }
}

async function updateAirplane(key, data) {

    try {

        const airplane = await airplaneRepository.update(key, data);
        return airplane;

    } catch (error) {

        Logger.error({ message: "Something went wrong updating airplane", error: error });

        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError(error.statusCode, "Cannot update the airplane", ["Resource requested to update is not present"]);
        }

        throw new InternalServerError("Cannot update the airplane");
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
};