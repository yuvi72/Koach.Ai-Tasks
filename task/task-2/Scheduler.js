"use strict";
// Scheduler.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scheduler = void 0;
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.events = [];
    }
    /**
     * Adds a new event to the schedule, if it doesn't overlap with existing events.
     * @param startTime The start time of the event (0-23).
     * @param endTime The end time of the event (0-23).
     * @returns True if the event was added successfully, otherwise false.
     */
    Scheduler.prototype.addEvent = function (startTime, endTime) {
        // Validate time range
        if (startTime < 0 || endTime > 23 || startTime >= endTime) {
            console.error("Invalid time range");
            return false;
        }
        // Check for overlaps
        for (var _i = 0, _a = this.events; _i < _a.length; _i++) {
            var event_1 = _a[_i];
            if (startTime < event_1.endTime && endTime > event_1.startTime) {
                console.error("Event overlaps with an existing event");
                return false;
            }
        }
        // No overlap found, add the event
        this.events.push({ startTime: startTime, endTime: endTime });
        return true;
    };
    /**
     * Retrieves all scheduled events.
     * @returns Array of all scheduled events.
     */
    Scheduler.prototype.getEvents = function () {
        return this.events;
    };
    return Scheduler;
}());
exports.Scheduler = Scheduler;
