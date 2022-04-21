/**
 * 
 * @param {string} roleClass Creep的职业
 * @param {number} num 该职业需要维持的数量
 * @param {array<string>} body 该职业的构造部件
 */
export const renew = function (roleClass, num, body) {
    let roles = _.filter(Game.creeps, (creep) => creep.memory.role == roleClass);
    if (roles.length < num) {
        var newName = roleClass + Game.time;
        console.log('Spawning new ' + roleClass + ': ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            { memory: { role: roleClass } });
    }
};
