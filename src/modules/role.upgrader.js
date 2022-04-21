/** @param {Creep} creep */
export const upgrader = function (creep) {

    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;
        creep.say('🔄withdraw');
    }
    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
        creep.say('⚡upgrade');
    }
    
    if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
        }
    }
    else {
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => (
                structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store[RESOURCE_ENERGY] > 600
        });

        if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
    }

};