/** @param {Creep} creep */
export const builder = function (creep) {

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
        creep.say('🚧 build');
    }

    if (creep.memory.working) {
        let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    else {
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure => (
                structure.structureType == STRUCTURE_CONTAINER) &&
                structure.store[RESOURCE_ENERGY] > 200
        });

        if (!container) {
            container = creep.room.storage;
        }

        if (container) {
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }

    }
};