import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { Scheduler } from './Scheduler';

// Initialize Express app and Scheduler instance
const app = express();
const scheduler = new Scheduler();

// Define an interface for the expected request body
interface EventRequestBody {
    startTime: number;
    endTime: number;
}

// Use bodyParser middleware to parse JSON request bodies
app.use(express.json());

// POST /events - Add a new event
app.post('/events', (req: Request, res: Response) => {
    // Type assertion for req.body
    const { startTime, endTime } = req.body as EventRequestBody;


    // Validate request body
    if (typeof startTime !== 'number' || typeof endTime !== 'number') {
        return res.status(400).json({ error: 'Invalid input: startTime and endTime should be numbers' });
    }

    // Try to add the event
    if (scheduler.addEvent(startTime, endTime)) {
        return res.status(201).json({ message: 'Event added successfully' });
    } else {
        return res.status(409).json({ error: 'Event overlaps with an existing event or has invalid times' });
    }
});


// GET /events - Retrieve all events
app.get('/events', (req: Request, res: Response) => {
    const events = scheduler.getEvents();
    res.status(200).json(events);
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
