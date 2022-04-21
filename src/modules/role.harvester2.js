/** @param {Creep} creep */
export const harvester2 = function (creep) {
    let Source2 = Game.flags['source2'];
    if (!creep.pos.isEqualTo(Source2.pos))
        creep.moveTo(Source2);
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
};