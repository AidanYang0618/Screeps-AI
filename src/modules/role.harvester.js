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
        creep.harvest(source);
    }
};