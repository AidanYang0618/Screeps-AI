/** @param {Creep} creep */
export const carrier2 = function (creep) {

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        let targets = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (structure) => (
                structure.structureType == STRUCTURE_EXTENSION ||
                structure.structureType == STRUCTURE_TOWER ||
                structure.structureType == STRUCTURE_SPAWN) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        });
        if (!targets) {
            targets = creep.room.storage;
        }
        if (targets) {
            if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    else {
        let sources = Game.flags['source2'].pos.findInRange(FIND_DROPPED_RESOURCES, 8)[0];
        if (sources) {
            if (creep.pickup(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            sources = Game.flags['source2'].pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) =>
                    structure.structureType == STRUCTURE_CONTAINER
            })[0];
            if (sources) {
                if (creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources);
                }
            }
            else {
                if (!creep.pos.isNearTo(Game.flags['source1'].pos))
                    creep.moveTo(Game.flags['source1']);
            }
        }
    }
};