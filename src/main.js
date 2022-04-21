import { ErrorMapper } from "./utils/ErrorMapper";
import { repairer } from "./modules/role.repairer";
import { harvester } from './modules/role.harvester';
import { harvester2 } from "./modules/role.harvester2";
import { carrier } from "./modules/role.carrier";
import { carrier2 } from "./modules/role.carrier2";
import { upgrader } from './modules/role.upgrader';
import { builder } from './modules/role.builder';

export const loop = ErrorMapper(() => {

    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

    let harvester2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    if (harvester2s.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
            { memory: { role: 'harvester2' } });
    }

    let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    if (repairers.length < 0) {
        let newName = 'repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE,], newName,
            { memory: { role: 'repairer' } });
    }

    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 1) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder' } });
    }

    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if (carriers.length < 1) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'carrier' } });
    }

    let carrier2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2');
    if (carrier2s.length < 2) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'carrier2' } });
    }
    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE, WORK, WORK, WORK, MOVE, WORK, WORK, CARRY, MOVE,], newName,
            { memory: { role: 'upgrader' } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 1,
            { align: 'left', opacity: 0.8 });
    }

    let tower = Game.getObjectById('626126573907dd7f14e1500b');
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
        if (creep.memory.role == 'repairer') {
            repairer(creep);
        }
        if (creep.memory.role == 'carrier') {
            carrier(creep);
        }
        if (creep.memory.role == 'carrier2') {
            carrier2(creep);
        }
        if (creep.memory.role == 'upgrader') {
            upgrader(creep);
        }
        if (creep.memory.role == 'builder') {
            builder(creep);
        }
    }
});