const { models } = require('../models');
const { Computer } = models;

const update = async (computer) => {
    try {
        if (!computer.id) {
            throw "The computer has no field ID. ";
        }

        const computer = await models.Computer.findByPk(id);

        if (!computer) {
            throw `No computer with id: ${computer.id} found.`;
        }

        await computer.update({
            name: name,
            processor: processor,
            ram: ram,
            storage: storage,
            gpu: gpu
        });
    } catch (exception) {
        throw exception;
    }
}

module.exports = { 
    update, 
};