/// <reference types="screeps" />

// Import role modules
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');

module.exports.loop = function () {
    // Count how many creeps we have of each role
    const harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    const upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    
    // Find the first spawn (make sure it exists)
    const spawn = Object.values(Game.spawns)[0];
    
    // Only try to spawn if we have a spawn
    if (spawn) {
        // Check if spawn is not busy and has enough energy
        const canSpawn = spawn.spawning == null && spawn.store.getUsedCapacity(RESOURCE_ENERGY) >= 300;
        
        // Auto-spawn harvesters if we have less than 2
        if (harvesters.length < 2 && canSpawn) {
            const newName = 'Harvester' + Game.time;
            const result = spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: {role: 'harvester'}
            });
            if (result == OK) {
                console.log(spawn.name + ': Spawning new harvester: ' + newName);
            }
        }
        // Auto-spawn upgraders if we have less than 1
        else if (upgraders.length < 1 && canSpawn) {
            const newName = 'Upgrader' + Game.time;
            const result = spawn.spawnCreep([WORK, CARRY, MOVE], newName, {
                memory: {role: 'upgrader'}
            });
            if (result == OK) {
                console.log(spawn.name + ': Spawning new upgrader: ' + newName);
            }
        }
    }
    
    // Run harvester logic for each harvester
    for (let name in harvesters) {
        const creep = harvesters[name];
        roleHarvester.run(creep);
    }
    
    // Run upgrader logic for each upgrader
    for (let name in upgraders) {
        const creep = upgraders[name];
        roleUpgrader.run(creep);
    }
}