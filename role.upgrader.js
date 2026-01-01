/// <reference types="screeps" />

/**
 * Upgrader Role Module
 * Upgrades the room controller to prevent room decay
 */

module.exports = {
    /**
     * Run upgrader logic for a creep
     * @param {Creep} creep The creep to run upgrader logic for
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
            // Creep is full, upgrade the room controller
            const controller = creep.room.controller;
            
            // Make sure controller exists before trying to upgrade
            if (controller) {
                // Try to upgrade, move if not in range
                if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    console.log(creep.name + ': Moving to upgrade controller');
                    creep.moveTo(controller, {
                        visualizePathStyle: {stroke: '#00ff00'} // Green path when upgrading
                    });
                } else {
                    console.log(creep.name + ': Upgrading controller');
                }
            }
        }
    }
};

