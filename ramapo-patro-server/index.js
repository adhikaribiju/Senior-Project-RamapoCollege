

const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cloudinary = require('cloudinary');
const port = process.env.PORT || 5001;
require('dotenv').config()

//middleware here
app.use(express.json());
app.use(cors())


cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});


const uri = process.env.URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/*
NAME
    run - Initializes the MongoDB client and configures the API routes.

SYNOPSIS
    This function sets up a connection to the MongoDB database and configures API routes for creating, retrieving, updating, and deleting events and user data. 
    The function includes the integration of Cloudinary for image storage and uses Express middleware for handling CORS and JSON payloads. 
    Routes include endpoints for managing event registrations and user class schedules.

DESCRIPTION
    - Establishes a connection with MongoDB using the URI from environment variables.
    - Creates collections for events ("events2") and user data ("userdata2").
    - Adds an index for event sorting, enabling the display of the latest events first.

ROUTES
    POST /post-event
        - Creates a new event.
        - Logs the request body for debugging.
        - Inserts the event data into the "events2" collection.
        - Does not require authentication.

    POST /class-schedule
        - Adds a class schedule and interest tags for a user.
        - Logs the request body for debugging.
        - Inserts the user data into the "userdata2" collection.
        - Does not require authentication.

    GET /userdata/:email
        - Retrieves user data by email.
        - Logs the email for debugging.
        - Returns the latest user data matching the provided email.
        - Does not require authentication.

    PATCH /update-userdata/:email
        - Updates the user data by email.
        - Updates or inserts user interest tags and class schedule.
        - Uses the "email" parameter to find and update the document.
        - Does not require authentication.

    GET /all-events
        - Retrieves all events.
        - Returns all events from the "events2" collection sorted by creation date.
        - Does not require authentication.

    GET /all-events/:id
        - Retrieves a single event by its ID.
        - Uses the "id" parameter to find the event in the "events2" collection.
        - Does not require authentication.

    GET /myEvents/:email
        - Retrieves events posted by a specific user.
        - Uses the "email" parameter to filter events based on the "postedBy" field.
        - Does not require authentication.

    POST /register/:id
        - Registers a user for an event.
        - Adds the user's email to the "regEmails" array for the event.
        - Requires the "id" parameter to identify the event.
        - Does not require authentication.

    POST /unregister/:id
        - Deregisters a user from an event.
        - Removes the user's email from the "regEmails" array for the event.
        - Requires the "id" parameter to identify the event.
        - Does not require authentication.

    DELETE /event/:id
        - Deletes an event by its ID.
        - Uses the "id" parameter to identify the event in the "events2" collection.
        - Does not require authentication.

    PATCH /update-event/:id
        - Updates an event by its ID.
        - Modifies the event data in the "events2" collection.
        - Uses the "id" parameter to identify the event.
        - Does not require authentication.

MIDDLEWARE:
    - `express.json()`: Parses incoming JSON requests and makes the payload available in `req.body`.
    - `cors()`: Enables Cross-Origin Resource Sharing (CORS) to allow requests from different domains.

CLOUDINARY CONFIGURATION:
   Cloudinary is configured with API keys stored in environment variables for secure image storage and retrieval:
    - cloud_name
    - api_key
    - api_secret
    Cloudinary uses the `.v2.config` method to securely set up its cloud credentials.

 DATABASE (MongoDB):
    - MongoDB is connected using the `MongoClient`, with options for server API versioning and strict mode enabled to catch deprecation errors.
    - Collections used:
    - `events2`: Stores event data.
    - `userdata2`: Stores user information such as class schedules and interest tags.

*/

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("RamapoPatro");
    const jobsCollection = db.collection("events2");
    const userData = db.collection("userdata2"); // interest tags and class schedules

    // Creating index for event sorting last event posted will show first
    const indexKeys = { title: 1, category: 1 }; 
    const indexOptions = { name: "titleCategory" }; 
    const result = await jobsCollection.createIndex(indexKeys, indexOptions);
    
    // post a event
    app.post("/post-event", async (req, res) => {
        const body = req.body;
        //body.postedBy = "TEST";
        body.createdAt = new Date();
        body.regEmails = []; // to track registrations
        const result = await jobsCollection.insertOne(body);
        if (result?.insertedId) {
          return res.status(200).send(result);
        } else {
          return res.status(404).send({
            message: "can not insert try again leter",
            status: false,
          });
        }
      });
      // post the class schedule
      app.post("/class-schedule", async (req, res) => {
        try {
          const body = req.body;
          body.createdAt = new Date();
          delete body.starttime;
          delete body.endtime;
          console.log("Look");
          console.log(body);
          const result = await userData.insertOne(body);
          if (result?.insertedId) {
            return res.status(200).send({
              message: "User data saved successfully",
              status: true,
              result: result
            });
          } else {
            return res.status(404).send({
              message: "Failed to save user data. Please try again later",
              status: false,
            });
          }
        } catch (error) {
          console.error("Error saving user data:", error);
          return res.status(500).send({
            message: "Internal Server Error",
            status: false,
          });
        }
      });

      // Fetch user data by email
      app.get("/userdata/:email", async (req, res) => {
        const userEmail = req.params.email;
        console.log("Calendar");
        console.log(userEmail);
        try {
          const alluserData = await userData.find({}).toArray();
          alluserData.sort(alluserData.createdAt);
          console.log(alluserData);
          // Sort the array by createdAt in descending order // SORT GAREKO eutai email ko duita banera
          alluserData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          console.log(alluserData);
          const cuserData = alluserData.find(user => user.userEmail === userEmail);
          //console.log("HERE");
          console.log(cuserData);
          if (cuserData) {
            //cuserData.createdAt = new Date();
            res.send(cuserData);
          } else {
            res.status(404).send("User not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          res.status(500).send("Internal Server Error");
        }
      });

      
      // Update user data
    app.patch("/update-userdata/:email", async (req, res) => {
      const userEmail = req.body.userEmail;
      const alluserData = req.body;
      console.log("HEREEEEE");
      console.log(alluserData);
      alluserData.createdAt = new Date();

      const filter = { email: userEmail };
      const updateDoc = {
        $set: {
         // interestTags: alluserData.interestTags,
          //classSchedule: alluserData.classSchedule,
            ...alluserData
        },
      };
      
      try {
        const options = { upsert: true };
        const result = await userData.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).send("Internal Server Error");
      }
    });




      // get all events 
    app.get("/all-events", async (req, res) => {
      const events = await jobsCollection
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
      res.send(events);
    });

    //delete this later
    app.get("/all-userData", async (req, res) => {
      const events = await userData
        .find({})
        .toArray();
      res.send(events);
    });

    // get single event using id
    app.get("/all-events/:id", async (req, res) => {
      // console.log(req.params.id);
      console.log(jobsCollection);
      const events = await jobsCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(events);
    });

    // get events based on email for my event listing 
    app.get("/myEvents/:email", async (req, res) => {
      // console.log("email---", req.params.email);
      const events = await jobsCollection
        .find({
          postedBy: req.params.email,
        })
        .toArray();
      res.send(events);
    });

        // get events registered on email for my event listing 
        app.get("/regEvents/:email", async (req, res) => {
          // console.log("email---", req.params.email);
          const events = await jobsCollection
            .find({
              postedBy: req.params.email,
            })
            .toArray();
          res.send(events);
        });

    //registration
    app.post("/register/:id", async (req, res) => {
      const { id } = req.params;
      const { email } = req.body;
    
      try {
        const result = await jobsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $addToSet: { regEmails: email } } // Ensure email is not duplicated
        );
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).json({ success: false, message: "Registration failed" });
      }
    });

  // Unregister endpoint
  app.post("/unregister/:id", async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    try {
      const result = await jobsCollection.updateOne(
        { _id: new ObjectId(id) },
        { $pull: { regEmails: email } } // Remove email from regEmails array
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Unregistration failed:", error);
      res.status(500).json({ success: false, message: "Unregistration failed" });
    }
  });

    // delete a event
    app.delete("/event/:id", async(req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(filter);
      res.send(result);
    })

    // update an event
    app.patch("/update-event/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      //console.log("TEST"+body);
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
            ...jobData
        },
      };
      const options = { upsert: true };
      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})