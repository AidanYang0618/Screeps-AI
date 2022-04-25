/** @param {StructureTower} Tower */
export const tower = function (Tower)  {
    let damagedStructure = Tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) =>
            structure.structureType != STRUCTURE_WALL &&
            structure.hits < structure.hitsMax
    });

    if(!damagedStructure)
            damagedStructure = Tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (structure) =>
            structure.structureType == STRUCTURE_WALL &&
            structure.hits < structure.hitsMax / 3000
    });

    if(damagedStructure) {
        Tower.repair(damagedStructure);
    }

        let closestHostile = Tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if(closestHostile) {
        Tower.attack(closestHostile);
    }
};