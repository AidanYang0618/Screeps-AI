/** @param {Creep} creep */
export const harvester2 = function (creep) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.store.getFreeCapacity() == 0) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        let container ;
        if (!creep.memory.container) {
            source = creep.pos.findInRange(FIND_STRUCTURES, 1, {
                filter: (structure) => structure.structureType == StructureLink
            })[0];
            creep.memory.container = container.id;
        }
        else
            container = Game.getObjectById(creep.memory.container);
        creep.transfer(container);
    }
    else {
        let Source = Game.flags['source2'];
        if (!creep.pos.isEqualTo(Source.pos))
            creep.moveTo(Source);
        else {
            let source;
            if (!creep.memory.source) {
                source = creep.pos.findInRange(FIND_SOURCES, 1)[0];
                creep.memory.source = source.id;
            }
            else
                source = Game.getObjectById(creep.memory.source);
            creep.harvest(source);
        }
    }
};