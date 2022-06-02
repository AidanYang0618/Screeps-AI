import { ErrorMapper } from "./utils/ErrorMapper";
import { harvester } from './modules/role.harvester';
import { carrier } from './modules/role.carrier'
import { upgrader } from './modules/role.upgrader';
import { builder } from './modules/role.builder';
import { harvester2 } from "./modules/role.harvester2";

export const loop = ErrorMapper(() => {
    if (Game.cpu.bucket >= 10000) {
        Game.cpu.generatePixel();
    }
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    let num = 0;
    if (Game.spawns['W39N641'].room.find(FIND_CONSTRUCTION_SITES).length)
        num = 2;

    let r1builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.memory.room == 'W39N46');
    if (r1builders.length < 2) {
        let newName = 'r1Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['W39N641'].spawnCreep([WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder', room: 'W39N46', working: false } });
    }

    let r1upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.memory.room == 'W39N46');
    if (r1upgraders.length < 3) {
        let newName = 'r1Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['W39N641'].spawnCreep([WORK, WORK, CARRY, MOVE, WORK, WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader', room: 'W39N46', working: false } });
    }

    // let minerals = _.filter(Game.creeps, (creep) => creep.memory.role == 'mineral');
    // if (minerals.length < 0) {
    //     let newName = 'Mineral' + Game.time;
    //     console.log('Spawning new mineral: ' + newName);
    //     Game.spawns['W39N641'].spawnCreep([WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE], newName,
    //         { memory: { role: 'mineral', working: true } });
    // }

    // let harvester2s = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2');
    // if (harvester2s.length < 1) {
    //     let newName = 'Harvester' + (Game.time - 37880000);
    //     console.log('Spawning new harvester2: ' + newName);
    //     Game.spawns['W39N641'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE, MOVE, MOVE], newName,
    //         { memory: { role: 'harvester2', working: false } });
    // }

    let r1carriers = _.filter(Game.creeps, (creep) => creep.memory.role == 'carrier' && creep.memory.room == 'W39N46');
    if (r1carriers.length < 1) {
        let newName = 'r1Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        Game.spawns['W39N641'].spawnCreep([CARRY, CARRY, MOVE, CARRY, CARRY, MOVE, CARRY, CARRY, MOVE], newName,
            { memory: { role: 'carrier', room: 'W39N46', working: false } });
    }

    let r2harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester2' && creep.memory.room == 'W38N46');
    if (r2harvesters.length < 1) {
        let newName = 'r2Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['W38N461'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'harvester2', room: 'W38N46', working: false } });
    }
    let r1harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.memory.room == 'W39N46');
    if (r1harvesters.length < 1) {
        let newName = 'r1Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['W39N641'].spawnCreep([WORK, WORK, WORK, WORK, WORK, MOVE], newName,
            { memory: { role: 'harvester', room: 'W39N46', working: false } });
    }

    if (Game.spawns['W39N641'].spawning) {
        let spawningCreep = Game.creeps[Game.spawns['W39N641'].spawning.name];
        Game.spawns['W39N641'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['W39N641'].pos.x + 1,
            Game.spawns['W39N641'].pos.y + 1,
            { align: 'left', opacity: 0.8 });
    }

    let tower1 = Game.getObjectById('6270cb4fcd5ecd4e8764a34c');
    // let tower2 = Game.getObjectById('6264958e9068a600baa047b7');
    if (tower1) {
        let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower1.attack(closestHostile);
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
                        structure.hits < structure.hitsMax / 3000
                });

            if (damagedStructure) {
                tower1.repair(damagedStructure);
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
        // if (creep.memory.role == 'harvester2') {
        //     harvester2(creep);
        // }
        if (creep.memory.role == 'carrier') {
            carrier(creep);
        }
        // if (creep.memory.role == 'mineral') {
        //     mineral(creep);
        // }
        if (creep.memory.role == 'upgrader') {
            upgrader(creep);
        }
        if (creep.memory.role == 'builder') {
            builder(creep);
        }
    }

    // // 要占领房间的 creep
    // const creep123 = Game.creeps['claimer'];
    // // 要占领的房间
    // const room = Game.rooms['W38N46'];
    // // 如果该房间不存在就先往房间走
    // if (!room) {
    //     creep123.moveTo(new RoomPosition(25, 25, 'W38N46'), { reusePath: 50 });
    // }
    // else {
    //     // 如果房间存在了就说明已经进入了该房间
    //     // 移动到房间的控制器并占领
    //     if (creep123.claimController(room.controller) == ERR_NOT_IN_RANGE) {
    //         creep123.moveTo(room.controller);
    //     }
    // }
});

