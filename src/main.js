import { ErrorMapper } from "./utils/ErrorMapper";
import { harvester } from './modules/harvester';
import { harvester2 } from "./modules/harvester2";
import { carrier } from "./modules/carrier";
import { upgrader } from './modules/upgrader';
import { builder } from './modules/builder';

export const loop = ErrorMapper(() => {

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

    let harvester2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    if (harvester2s.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
            { memory: { role: 'harvester2' } });
    }

    let carrirers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if (carrirers.length < 3) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'carrier' } });
    }

    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 2) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    let tower = Game.getObjectById('6260d559c6f82bf14b23beb7');
    if (tower) {
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for (var name in Game.creeps) {
        let creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            harvester(creep);
        }
        if (creep.memory.role == 'harvester2') {
            harvester2(creep);
        }
        if (creep.memory.role == 'carrier') {
            carrier(creep);
        }
        if (creep.memory.role == 'upgrader') {
            upgrader(creep);
        }
        if (creep.memory.role == 'builder') {
            builder(creep);
        }
    }
});