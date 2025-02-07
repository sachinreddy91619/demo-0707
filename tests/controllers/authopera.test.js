


import fastify from 'fastify';

import mongoose from 'mongoose';

import app from '../../app.js';

import request from 'supertest';


jest.mock('../../models/Users.js',()=>{
    return{
        findOne:jest.fn(),
        prototype:{
            save:jest.fn()
        }
    };
});

import Users from '../../models/Users.js';

// Mock mongoose Types
jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        // ...actualMongoose,
        // Types: {
        //     ...actualMongoose.Types,
        //     ObjectId: jest.fn().mockReturnValue('mocked-object-id'), // Mocking ObjectId
        // },

        ...actualMongoose,
        connection: {
            close: jest.fn(), // Mocking the `close` method of the connection
        },
    };
});

describe('POST /register',()=>{

    let server;

    beforeAll(async()=>{
        server =await app.listen(3021);
        await new Promise(resolve => setTimeout(resolve, 500));  // 500ms delay
    });

    afterAll(async ()=>{
        await app.close();
        await mongoose.connection.close();
    });


    beforeEach(()=>{
        jest.clearAllMocks();
    });


    it('should register a new user successfully with valid data',async()=>{

        Users.findOne=jest.fn().mockResolvedValue(null);

        Users.prototype.save=jest.fn().mockResolvedValue({

            _id:'mocked-user-id',
            username:'Testuser',
            email:'Testuser@gmail.com',
            role:'user'
        });

        const response=await request(app.server)
        .post('/auth/register')
        .send({
            username:'Testuser',
            email:'Testuser@gmail.com',
            password:'Password@123',
            role:'user'
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('user created successfully');
        expect(Users.findOne).toHaveBeenCalledWith({username:'Testuser'});
        expect(Users.prototype.save).toHaveBeenCalled();
    })
})


// ==============================================================================================================

// import fastify from 'fastify';


// const h=fastify({
//     logger:true
// });

// import app from '../../app.js'; // Your Fastify app
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import Users from '../../models/Users.js'; // Users model
// const mockSave=Users.save;
// import request from 'supertest';




// //jest.mock('../../models/Users.js'); // Mock Users model
// // import app from '../../app.js'; // Import your Fastify app instance
// // import request from 'supertest';
// // import Users from '../../models/Users.js'; // Users model

// let server;

// beforeAll(async () => {
//   server = await app.listen(3021);  // Start the Fastify server before tests
// });

// afterAll(async () => {
//   await app.close();  // Close the server after tests are done
// });

// jest.mock('../../models/Users.js', () => ({
//   save: jest.fn(),
// }));

// describe('POST /register', () => {
//   it('should register a new user successfully with valid data', async () => {
//     // Mock the save function
//     Users.save.mockResolvedValue({
//         _id: 'mocked-user-id',
//         username: 'Testuser',
//         email: 'Testuser@gmail.com',
//         role: 'user'
//     });

//     const response = await request(server)  // Use the running Fastify server
//     .post('/auth/register')  
//       .send({
//         username: 'Testuser',
//         email: 'Testuser@gmail.com',
//         password: 'Password@123',
//         role: 'user',
//       });
       
    

//     expect(response.status).toBe(201);  // Check if the status is 201
//     expect(response.body.message).toBe('user created successfully');  // Check the response message

//     expect(Users.save).toHaveBeenCalledTimes(1);

//   });
// });

// =================================================================================================================================

//   it('should return a 400 error if username is missing', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({
//         email: 'testuser@example.com',
//         password: 'Password123',
//         role: 'user'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Missing required fields');
//   });

//   it('should return a 400 error if email is invalid', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({
//         username: 'testuser',
//         email: 'invalid-email',
//         password: 'Password123',
//         role: 'user'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Invalid email address');
//   });

//   it('should return a 400 error if password does not meet criteria', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'short',
//         role: 'user'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number');
//   });

//   it('should return a 400 error if the role is invalid', async () => {
//     const response = await request(app)
//       .post('/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'Password123',
//         role: 'invalidRole'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Role must be either user or admin');
//   });

//   it('should return a 400 error if the username already exists', async () => {
//     // Mock the User model findOne function to simulate an existing user
//     const mockFindOne = require('./models/User').findOne;
//     mockFindOne.mockResolvedValue({ username: 'testuser' });

//     const response = await request(app)
//       .post('/register')
//       .send({
//         username: 'testuser',
//         email: 'newuser@example.com',
//         password: 'Password123',
//         role: 'user'
//       });

//     expect(response.status).toBe(400);
//     expect(response.body.error).toBe('Username already exists. Try with another username');
//   });

//   it('should return a 500 error if there is a server/database issue', async () => {
//     // Mock the save function to simulate a server/database error
//     const mockSave = require('./models/User').save;
//     mockSave.mockRejectedValue(new Error('Database error'));

//     const response = await request(app)
//       .post('/register')
//       .send({
//         username: 'testuser',
//         email: 'testuser@example.com',
//         password: 'Password123',
//         role: 'user'
//       });

//     expect(response.status).toBe(500);
//     expect(response.body.error).toBe('error creating the user');
//   });
//});




































































































































































































































































































































































































































































































































































































































































































































































// ===================================================================================
// =================================================================================================================

// beforeAll(async () => {
//     await app.listen(3021); // Ensure the Fastify app is running on port 3021
//   });
  
//   afterAll(async () => {
//     await app.close(); // Close the app after tests
   
//   });

// // test-case-1:  Testing if the user already exists
// describe("testing the registration of user", () => {
//     test("should respond with 400 status code", async () => {
//         // Mock findOne to return a user with the username 'testname'
//         Users.findOne.mockResolvedValue({ username: 'testname' });

//         const response = await app.inject({
//             method: 'POST',
//             url: '/auth/register',
//             payload: { username: 'testname', password: 'testpassword', email: 'testemail', role: 'testrole' }
//         });

//         expect(response.statusCode).toBe(400);
//         expect(JSON.parse(response.body)).toEqual({ error: 'Username already exists. Try with another username' });

//         //expect(response.body).toBe('Username already exists. Try with another username');
//     });
// });

// // test-case -2: Testing the /register for all success cases
// describe("testing the /registering the user", () => {
//     test("should respond with a 201 status code", async () => {
//         Users.findOne.mockResolvedValue(null);

//         const mockSave = jest.fn().mockResolvedValue({});
//         Users.prototype.save = mockSave;

//         const response = await app.inject({
//             method: 'POST',
//             url: '/auth/register',
//             payload: {
//                 username: "username",
//                 password: "password",
//                 email: "email",
//                 role: "role"
//             }
//         });

//         expect(response.statusCode).toBe(201);
//         expect(mockSave).toHaveBeenCalledTimes(1);
//     });

//     test("should specify json in the content-type header", async () => {

//        Users.findOne.mockResolvedValue(null);

//         const mockSave = jest.fn().mockResolvedValue({});
//         Users.prototype.save = mockSave;

//         const response = await app.inject({
//             method: 'POST',
//             url: '/auth/register',
//             payload: {
//                 username: "username",
//                 password: "password",
//                 email: "email",
//                 role: "role"
//             }
//         });

//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         expect(mockSave).toHaveBeenCalledTimes(1);
//     });

//     test("should return the user object", async () => {

//        Users.findOne.mockResolvedValue(null);

//         const mockSave = jest.fn().mockResolvedValue({});
//         Users.prototype.save = mockSave;

//         const response = await app.inject({
//             method: 'POST',
//             url: '/auth/register',
//             payload: {
//                 username: "username",
//                 password: "password",
//                 email: "email",
//                 role: "role"
//             }
//         });

//         expect(JSON.parse(response.body)).toEqual({message:'user created successfully'});
        
//         expect(mockSave).toHaveBeenCalledTimes(1);
//     });
// });


// // test-case -3 : testing the misssing any content :
// describe("testing when username or password or email or role is missing", () => {
//     test("should respond with a status code of 500 if any field is missing", async () => {
//       // Mock the findOne method to return null (no existing user)
//       Users.findOne.mockResolvedValue(null);
  
//       // Mock the save method to simulate success (this won't be called if fields are missing)
//     //   const mockSave = jest.fn().mockResolvedValue({});
//     //   Users.prototype.save = mockSave;
  
//       // Test data with various missing fields
//       const bodydata = [
//         { username: "username", password: "password", email: "email" },  // Missing role
//         { username: "username", password: "password", role: "role" },     // Missing email
//         { username: "username", email: "email", role: "role" },            // Missing password
//         { password: "password", email: "email", role: "role" },            // Missing username
//         { username: "username", password: "password" },                    // Missing email, role
//         { username: "username", email: "email" },                          // Missing password, role
//         { username: "username", role: "role" },                            // Missing password, email
//         { email: "email", role: "role" },                                  // Missing username, password
//         { password: "password", email: "email" },                          // Missing username, role
//         { password: "password", role: "role" },                            // Missing username, email
//         { username: "username", password: "password", email: "email", role: "role" },  // All fields present
//         { username: "username" },                                          // Missing password, email, role
//         { password: "password" },                                          // Missing username, email, role
//         { email: "email" },                                                // Missing username, password, role
//         { role: "role" },                                                  // Missing username, password, email
//         {}                                                                 // Missing all fields
//       ];
  
//       for (let i = 0; i < bodydata.length; i++) {
//         const mockSave = jest.fn().mockResolvedValue({});
//         Users.prototype.save = mockSave;
//         const response = await app.inject({
//           method: 'POST',
//           url: '/auth/register',
//           payload: bodydata[i]
//         });
  
     
//           // When any field is missing, save should not be called
//           expect(response.statusCode).toBe(400);  // Missing fields should return 400
//           expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         //   expect(JSON.parse(response.body)).toEqual({
//         //     error: 'Missing required fields (username, password, email, role)'
//         //   });
//           expect(mockSave).toHaveBeenCalledTimes(0);  // Ensure save is not called when fields are missing
        
//       }
//     });
//   });
  



//   // Test Case 4: Internal server error  catch block 
// describe ("testing when an error occurs during user creation catch block",()=>{

//     test("should respond with a status code of 500",async()=>{

//                 Users.findOne.mockResolvedValue(null);

//                 const mockSave=jest.fn().mockRejectedValue(new Error('Database error'));

//                 Users.prototype.save=mockSave;
//                 const bodydata={
//                     username:"username",
//                     password:"password",
//                     email:"email",
//                     role:"role"
//                 }

//                 const response=await app.inject({
//                     method:'POST',
//                     url:'/auth/register',
//                     payload:bodydata
//                 });

//         expect(response.statusCode).toBe(500);
//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         expect(JSON.parse(response.body)).toEqual({
//             error:"error creating the user"
//         })
//         expect(mockSave).toHaveBeenCalledTimes(1);
//         })
//     })




























































































// // ++++++++++++++++++++++++++++++++++++++++++++ TEST CASES FOR THE LOGIN FUNCTIONALITY +++++++++++++++++++++++++++++++++++++++++++++++++++++++



// // Test Case 1: User not found (Invalid username)
// describe("testing the login functionality",()=>{

//     test("testing when user name not found",async()=>{
//         Users.findOne.mockResolvedValue(null);
        
//         const response=await app.inject({
//             method:'POST',
//             url:'/auth/login',
//             payload:{username:"username",password:"password"}
//         });

//         expect(response.statusCode).toBe(400);
//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         expect(JSON.parse(response.body)).toEqual({
//             error:"user not found"
//         })
//     })
// })


//  // Test Case 2: Invalid credentials (password doesn't match)

//  describe("testing the login functionality",()=>{

//     //import bcrypt from 'bcryptjs';
//     test('should respond with a status code of 400 for invalid credentials', async () => {
 
//         Users.findOne.mockResolvedValue({
//             _id:'1',
//             username:'username',
//             password:'hashedpassword',
//             role:'user'
//         })

//       //  bcrypt.compare=jest.fn().mockResolvedValue(false);
//     //   jest.mock('bcrypt', () => ({
//     //     compare: jest.fn().mockResolvedValue(false),
//     //   }));
      
//       bcrypt.compare = jest.fn().mockResolvedValue(false);

//         const bodydata={username:"username",password:"password"};

//         const response=await app.inject({
//             method:'POST',
//             url:'/auth/login',
//             payload:bodydata
//         })

//         expect(response.statusCode).toBe(400);
//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         expect(JSON.parse(response.body)).toEqual({
//             error:'invalid credentials'
            
//         })
//  })
//  })


//  // // Test Case 3: Successful login (correct username and password)

//  describe("testing the login functionality",()=>{
//     test('should respond with a status code of 200 for successfully logged in user',async ()=>{

//         Users.findOne.mockResolvedValue({
//             _id:'1',
//             username:'username',
//             password:'hasedpassword',
//             role:'user'
//         });

//         bcrypt.compare=jest.fn().mockResolvedValue(true);

//         jest.mock('jsonwebtoken'); // Mocking the entire jsonwebtoken module

//         jwt.sign = jest.fn().mockReturnValue('mockedToken');

//         const bodydata={username:'username',password:'password'};

//         const response=await app.inject({
//             method:'POST',
//             url:'/auth/login',
//             payload:bodydata
//         })

//         expect(response.statusCode).toBe(200);
//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'))
//         expect(JSON.parse(response.body)).toEqual({
//             token:'mockedToken'
//         })

//     })
//  })


//  // Test Case 4: Internal server error (bcrypt.compare throws error) catch block 

// describe("testing when an error occurs during login",()=>{

//     test("should respond with a status code of 500",async()=>{
//         Users.findOne.mockResolvedValue({
//             _id: '1',
//       username: 'username',
//       password: 'hashedPassword',
//       role: 'user',

//         });

//         bcrypt.compare=jest.fn().mockRejectedValue(new Error('Database error'));

//         const bodydata={
//             username:"username",
//             password:"password"
//         }

//         const response=await app.inject({
//             method:'POST',
//             url:'/auth/login',
//             payload:bodydata
//         });
//         expect(response.statusCode).toBe(500);
//         //console.log('Expected:', expected);
// //console.log('Received:', received);

//         expect(response.headers['content-type']).toEqual(expect.stringContaining('application/json'));
//         expect(JSON.parse(response.body)).toEqual({
//             error:'error while login in the user'
//         })
//        // expect(mockSave).toHaveBeenCalledTimes(0);
//         })

//     })
    

//     // ++++++++++++++++++++++++++++++++++++++++++++ TEST CASES FOR THE LOGOUT FUNCTIONALITY +++++++++++++++++++++++++++++++++++++++++++++++++++++++
