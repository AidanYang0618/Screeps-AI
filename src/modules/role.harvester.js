/** @param {Creep} creep */
export const harvester = function (creep) {
    let Source1 = Game.flags['source1'];
    if (!creep.pos.isEqualTo(Source1.pos))
        creep.moveTo(Source1);
    else {
        let source;
        if (!creep.memory.source) {
            source = creep.pos.findInRange(FIND_SOURCES, 1)[0];
            creep.memory.source = source.id;
        }
        else
            source = Game.getObjectById(creep.memory.source);
        let targets = creep.pos.findInRange(FIND_CREEPS, 1,{
            filter: (creep_) =>
                creep_.memory.role == 'carrier' &&
                creep_.memory.working == false
        })[0];
        if (creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
        }
        if (!creep.memory.working && ((targets && creep.store[RESOURCE_ENERGY] >= 300) || creep.store.getFreeCapacity() == 0)) {
            creep.memory.working = true;
        }
        if (creep.memory.working) {
            if (targets) {
                creep.transfer(targets, RESOURCE_ENERGY);
                creep.memory.working = false;
            }
        }
        else {
            creep.harvest(source);
        }
        
    }
};