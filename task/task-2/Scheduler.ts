// Scheduler.ts

interface Event {
    startTime: number;
    endTime: number;
}

export class Scheduler {
    private events: Event[] = [];

    /**
     * Adds a new event to the schedule, if it doesn't overlap with existing events.
     * @param startTime The start time of the event (0-23).
     * @param endTime The end time of the event (0-23).
     * @returns True if the event was added successfully, otherwise false.
     */
    addEvent(startTime: number, endTime: number): boolean {
        // Validate time range
        if (startTime < 0 || endTime > 23 || startTime >= endTime) {
            console.error("Invalid time range");
            return false;
        }

        // Check for overlaps
        for (let event of this.events) {
            if (startTime < event.endTime && endTime > event.startTime) {
                console.error("Event overlaps with an existing event");
                return false;
            }
        }

        // No overlap found, add the event
        this.events.push({ startTime, endTime });
        return true;
    }

    /**
     * Retrieves all scheduled events.
     * @returns Array of all scheduled events.
     */
    getEvents(): Event[] {
        return this.events;
    }
}
