import { ErrorMapper } from "./utils/ErrorMapper";
import { harvester } from './modules/role.harvester';
import { harvester2 } from "./modules/role.harvester2";
import { carrier } from "./modules/role.carrier";
import { carrier2 } from "./modules/role.carrier2";
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

    // let repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');
    // if (repairers.length < 0) {
    //     let newName = 'repairer' + Game.time;
    //     console.log('Spawning new repairer: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE,], newName,
    //         { memory: { role: 'repairer', working: false } });
    // }

    let upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if (upgraders.length < 1) {
        let newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, MOVE, WORK, CARRY, CARRY, CARRY, CARRY, MOVE,], newName,
            { memory: { role: 'upgrader', working: false } });
    }

    let builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if (builders.length < 0) {
        let newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder', working: false } });
    }

    let carrier2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier2');
    if (carrier2s.length < 2) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'carrier2', working: false } });
    }

    let harvester2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    if (harvester2s.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester2: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'harvester2', working: false } });
    }

    let carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier');
    if (carriers.length < 1) {
        let newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
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

    let towers = Game.rooms['E11S39'].find(FIND_STRUCTURES ,(structure) => structure.structureType == StructureTower)[1]

    if (towers) {
        let closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) =>
                structure.structureType != STRUCTURE_WALL &&
                structure.hits < structure.hitsMax
        });

        if (!closestDamagedStructure)
            closestDamagedStructure = towers.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>
                    structure.structureType == STRUCTURE_WALL &&
                    structure.hits < structure.hitsMax / 3000
            });
        
        if (closestDamagedStructure) {
            towers.repair(closestDamagedStructure);
        }

        let closestHostile = towers.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            towers.attack(closestHostile);
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
        // if (creep.memory.role == 'repairer') {
        //     repairer(creep);
        // }
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