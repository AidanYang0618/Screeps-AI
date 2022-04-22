/** @param {Creep} creep */
export const renew = function (creep) {
    if (creep.ticksToLive < 300) {
        if (Game.spawns['Spawn1'].renewCreep(creep) == ERR_NOT_IN_RANGE) {
            moveTo(Game.spawns['Spawn1']);
        }
        else if (Game.spawns['Spawn1'].renewCreep(creep) == OK) {
        }
        else
            return true;
        return false;
    }
    else
        return true;
};