/** @param {Creep} creep */
export const carrier = function (creep) {

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
        creep.say('🔄withdraw');
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
        creep.say('🚧work');
    }

    if (creep.memory.working) {
        let targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) => (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        if (!targets) {
            targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => (
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 100
            });
        }
        if (!targets) {
            targets = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => (
                    structure.structureType == STRUCTURE_TOWER) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
        }
        if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    else {
        let sources = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
        if (sources) {
            if (creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            creep.memory.working = true;
            creep.say('🚧work');
        }
    }
};