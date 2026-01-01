/// <reference types="screeps" />

/**
 * Harvester Role Module
 * Simple harvester that collects energy and brings it to spawn
 */

module.exports = {
    /**
     * Run harvester logic for a creep
     * @param {Creep} creep The creep to run harvester logic for
     */
    run: function(creep) {
        // Check if creep has room for more energy
        if (creep.store.getFreeCapacity() > 0) {
            // Find the closest energy source
            const source = creep.pos.findClosestByPath(FIND_SOURCES);
            
            // Make sure we found a source before trying to harvest
            if (source) {
                // Try to harvest, move if not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    console.log(creep.name + ': Moving to harvest energy');
                    creep.moveTo(source, {
                        visualizePathStyle: {stroke: '#ffaa00'} // Orange path when harvesting
                    });
                } else {
                    console.log(creep.name + ': Harvesting energy');
                }
            }
        } else {
            // Creep is full, find spawn or extension that needs energy
            const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    // Look for spawns or extensions that need energy
                    return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_EXTENSION) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            
            // Make sure we found a target before trying to transfer
            if (target) {
                // Try to transfer energy, move if not in range
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    console.log(creep.name + ': Moving to deliver energy to ' + target.structureType);
                    creep.moveTo(target, {
                        visualizePathStyle: {stroke: '#ffffff'} // White path when delivering
                    });
                } else {
                    console.log(creep.name + ': Delivering energy to ' + target.structureType);
                }
            }
        }
    }
};
