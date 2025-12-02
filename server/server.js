require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const User = require('./UserSchema');
const Schedule = require('./ScheduleSchema');
const Course = require('./CourseSchema');
app.use(express.json());
app.use(cors())
app.listen(9000, ()=> {
    console.log('Server Started at {9000}')
})

const mongoose = require('mongoose');
const mongoString = "mongodb+srv://ggduplan23:IbfP35dg8N2etsBm@cluster0.ycfq01g.mongodb.net/cluster0"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error))
database.once('connected', () => console.log('Databased Connected'))

app.post('/createUser', async (req, res) => {
    console.log(`SERVER: CREATE USER REQ BODY: ${req.body.username} ${req.body.firstName} ${req.body.lastName}`)
    const un = req.body.username
    try {
        User.exists({username: un}).then(result => {
            if(Object.is(result, null)) {
                const user = new User(req.body);
                user.save()
                console.log(`User created! ${user}`)
                res.send(user)
            }
            else {
                console.log("Username already exists")
                res.status(500).send("Username already exists")
            }
        })
    }
    catch (error){

        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    //console.log(`SERVER: GET USER REQ BODY: ${req.query}`)
    //console.log(req.query)
    console.log("SERVER: GET USER REQ BODY: %j", req.query)

    const username = req.query.username
    const password = req.query.password
    try {
        const user = await User.findOne({ username, password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

// Get all public plans from other users
app.get('/getPublicPlans', async (req, res) => {
    try {
        const publicPlans = await Schedule.find({ public: true })
            .populate('owner', 'firstName lastName username')
            .populate('courses', 'name semestersOffered')
            .sort({ modified: -1 });
        res.send(publicPlans);
    }
    catch (error) {
        console.error('Error getting public plans:', error);
        res.status(500).send(error);
    }
})

// Get all plans for a specific user
app.get('/getUserPlans', async (req, res) => {
    const userId = req.query.userId;
    if (!userId) {
        return res.status(400).send({ error: 'UserId is required' });
    }
    try {
        const userPlans = await Schedule.find({ owner: userId })
            .populate('courses', 'name semestersOffered')
            .sort({ modified: -1 });
        res.send(userPlans);
    }
    catch (error) {
        console.error('Error getting user plans:', error);
        res.status(500).send(error);
    }
})

// Create a new plan
app.post('/createPlan', async (req, res) => {
    try {
        const { owner, name, courses, public: isPublic } = req.body;
        if (!owner) {
            return res.status(400).send({ error: 'Owner is required' });
        }
        const plan = new Schedule({
            owner,
            name: name || 'My Plan',
            courses: courses || [],
            public: isPublic || false
        });
        const savedPlan = await plan.save();
        
        // Add plan to user's schedules array
        await User.findByIdAndUpdate(owner, {
            $push: { schedules: savedPlan._id }
        });
        
        const populatedPlan = await Schedule.findById(savedPlan._id)
            .populate('owner', 'firstName lastName username')
            .populate('courses', 'name semestersOffered');
        
        res.send(populatedPlan);
    }
    catch (error) {
        console.error('Error creating plan:', error);
        res.status(500).send(error);
    }
})

// Update plan visibility (publish/unpublish)
app.put('/updatePlanVisibility', async (req, res) => {
    try {
        const { planId, public: isPublic, userId } = req.body;
        if (!planId || isPublic === undefined) {
            return res.status(400).send({ error: 'PlanId and public status are required' });
        }
        
        // Verify the user owns this plan
        const plan = await Schedule.findById(planId);
        if (!plan) {
            return res.status(404).send({ error: 'Plan not found' });
        }
        if (userId && plan.owner.toString() !== userId) {
            return res.status(403).send({ error: 'You do not have permission to modify this plan' });
        }
        
        plan.public = isPublic;
        plan.modified = new Date();
        const updatedPlan = await plan.save();
        
        const populatedPlan = await Schedule.findById(updatedPlan._id)
            .populate('owner', 'firstName lastName username')
            .populate('courses', 'name semestersOffered');
        
        res.send(populatedPlan);
    }
    catch (error) {
        console.error('Error updating plan visibility:', error);
        res.status(500).send(error);
    }
})

// Get a specific plan with full details
app.get('/getPlan/:id', async (req, res) => {
    try {
        const plan = await Schedule.findById(req.params.id)
            .populate('owner', 'firstName lastName username')
            .populate('courses', 'name semestersOffered prereqs')
            .populate('advisors', 'firstName lastName')
            .populate('comments');
        if (!plan) {
            return res.status(404).send({ error: 'Plan not found' });
        }
        res.send(plan);
    }
    catch (error) {
        console.error('Error getting plan:', error);
        res.status(500).send(error);
    }
})

// Daevon's portion

const majorsRoutes = require('./RouteMajors');

const app = express();
app.use(cors());
app.use(express.json());

// other existing routes here...

app.use('/api', majorsRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
