/** @param {Creep} creep **/
export const mineral = function (creep) {
    if (!creep.memory.working && creep.store[RESOURCE_HYDROGEN] == 0) {
        creep.memory.working = true;
    }
    if (creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = false;
    }

    if (creep.memory.working) {
        let source;
        if (!creep.memory.source) {
            source = creep.room.find(FIND_MINERALS)[0];
            if (source)
                creep.memory.source = source.id;
        }
        else {
            source = Game.getObjectById(creep.memory.source);
        }
        if (source) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
    else {
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => (
                structure.structureType == STRUCTURE_TERMINAL
                // || structure.structureType == STRUCTURE_STORAGE
            ) && structure.store.getFreeCapacity(RESOURCE_OXYGEN) > 0

        });
        if (container) {
            if (creep.transfer(container, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }

};