/** @param {Creep} creep **/
export const repairer = function (creep) {

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
        creep.say('🔄withdraw');
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
        creep.say('🚧repair');
    }

    if (creep.memory.working) {
        let broken = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: structure =>
                structure.hits < structure.hitsMax &&
                structure.structureType != STRUCTURE_WALL
        });
        if (broken) {
            if (creep.repair(broken) == ERR_NOT_IN_RANGE) {
                creep.moveTo(broken);// check if there are broken structures
            }
        }
    }
    else {
        let ruins = creep.pos.findClosestByPath(FIND_RUINS, {
            filter: structure => structure.store[RESOURCE_ENERGY] > 0
        })
        if (ruins) {
            if (creep.withdraw(ruins, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(ruins);
            }
        }
        else {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: structure => (
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store[RESOURCE_ENERGY] > 300
            });

            if (container) {
                // try to withdraw energy, if the container is not in range
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    // move towards it
                    creep.moveTo(container);
                }
            }
        }

    }
};
