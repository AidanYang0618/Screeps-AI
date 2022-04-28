import { ErrorMapper } from "./utils/ErrorMapper";
import { harvester } from './modules/role.harvester';
import { harvester2 } from "./modules/role.harvester2";
import { carrier } from "./modules/role.carrier";
import { upgrader } from './modules/role.upgrader';
import { builder } from './modules/role.builder';

export const loop = ErrorMapper(() => {
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 3) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE,], newName,
            { memory: { role: 'upgrader', working: false } });
    }

    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 0) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder', working: false } });
    }

    // let carrier2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2');
    // if (carrier2s.length < 0) {
    //     let newName = 'Carrier' + Game.time;
    //     console.log('Spawning new carrier2: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
    //         { memory: { role: 'carrier2', working: false } });
    // }

    let harvester2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    if (harvester2s.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'harvester2', working: false } });
    }

    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if (carriers.length < 3) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'carrier', working: false } });
    }

    let harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if (harvesters.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE], newName,
            { memory: { role: 'harvester', working: false } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y + 1,
            { align: 'left', opacity: 0.8 });
    }

    let tower1 = Game.getObjectById('626126573907dd7f14e1500b');
    let tower2 = Game.getObjectById('6264958e9068a600baa047b7');
    if (tower1 && tower2) {
        let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower1.attack(closestHostile);
            tower2.attack(closestHostile);
        }
        else {
            let damagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    structure.structureType == STRUCTURE_RAMPART &&
                    structure.hits < structure.hitsMax / 1000
            });

            if (!damagedStructure)
                damagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) =>
                        structure.structureType != STRUCTURE_WALL &&
                        structure.structureType != STRUCTURE_RAMPART &&
                        structure.hits < structure.hitsMax
                });

            if (!damagedStructure)
                damagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) =>
                        structure.structureType == STRUCTURE_WALL &&
                        structure.hits < structure.hitsMax / 30000
                });

            if (damagedStructure) {
                tower1.repair(damagedStructure);
                tower2.repair(damagedStructure);
            }
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
        // if (creep.memory.role == 'carrier2') {
        //     carrier2(creep);
        // }
        if (creep.memory.role == 'upgrader') {
            upgrader(creep);
        }
        if (creep.memory.role == 'builder') {
            builder(creep);
        }
    }
});