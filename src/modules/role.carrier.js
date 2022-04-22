/** @param {Creep} creep */
export const carrier = function (creep) {

    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
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
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
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
        let sources;
        if (!creep.memory.source) {
            sources = creep.pos.findClosestByRange(FIND_TOMBSTONES, {
                filter: (tombstone) => (
                    tombstone.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                )
            });
            if (!sources)
                sources = Game.flags['source1'].pos.findInRange(FIND_DROPPED_RESOURCES, 16)[0];
            if (sources)
                creep.memory.source = sources.id;
            else {
                creep.memory.working = true;
            }
        }
        else
            sources = Game.getObjectById(creep.memory.source);
        if (creep.pickup(sources) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        else {
            creep.memory.source = undefined;
        }

    }
};