/** @param {Creep} creep */
export const carrier = function (creep) {
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
        let source = creep.pos.findClosestByPath(FIND_RUINS, {
            filter: structure => structure.store[RESOURCE_ENERGY] > 0
        });
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_TOMBSTONES, {
                filter: tombstone =>
                tombstone.store[RESOURCE_ENERGY] > 0
            });
        }
        if (!source) {
            source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => (
                    structure.structureType == STRUCTURE_CONTAINER) &&
                    structure.store[RESOURCE_ENERGY] >= 300
            });
        }
        if (source) {
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            if (!creep.pos.isNearTo(Game.flags['source1'].pos))
                creep.moveTo(Game.flags['source1']);
        }
    }
};