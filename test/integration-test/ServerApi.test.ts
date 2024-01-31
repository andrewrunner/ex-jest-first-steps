import { Account } from '../../src/model/AuthModel';
import { Reservation } from '../../src/model/ReservationModel';
import { HTTP_CODES, HTTP_METHODS } from '../../src/model/ServerModel';
import { Server } from './../../src/server/Server';
import { makeAwesomeRequest } from './utils/http-client';



describe("Server integration test", () => {

    let server: Server;

    beforeAll(() => {
        server = new Server();
        server.startServer();
    })

    afterAll(() => {
        server.stopServer();
    })


    const someUser: Account = {
        id: '',
        userName: 'Name',
        password: 'pass',
    }

    const someReservation:Reservation = {
        id: '',
        endDate: 'enddate',
        startDate: 'startdate',
        room: 'someroom',
        user: 'username'
    }


    it("Should register new User", async () => {

        const response = await fetch('http://localhost:8080/register', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser),
        })

        const body = await response.json();

        expect(response.status).toBe(HTTP_CODES.CREATED);
        expect(body.userId).toBeDefined();
    });

    it("Should register new User with awesomeRequest", async () => {

        const response = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method:  HTTP_METHODS.POST,
            path: '/register',
        }, someUser)
        
        expect(response.statusCode).toBe(HTTP_CODES.CREATED);
        expect(response.body.userId).toBeDefined();
    });


    let token:string;

    it("Should login a registered User", async () => {

        const response = await fetch('http://localhost:8080/login', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someUser),
        })

        const body = await response.json();

        expect(response.status).toBe(HTTP_CODES.CREATED);
        expect(body.token).toBeDefined();
        token = body.token;
    });


    let createdReservationId:string;
    
    it("Should create reservation if authorized", async () => {

        const response = await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })

        const body = await response.json();

        expect(response.status).toBe(HTTP_CODES.CREATED);
        expect(body.reservationId).toBeDefined();
        createdReservationId = body.reservationId;
    });


    it("Should get reservation if authorized", async () => {

        const response = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        const body = await response.json();


        const expectedReservation = structuredClone(someReservation)
        expectedReservation.id = createdReservationId;

        expect(response.status).toBe(HTTP_CODES.OK);
        expect(body).toEqual(expectedReservation);
    });



    it("Should create and retreve multiple reservations if authorized", async () => {

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })
        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })
        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        })





        const response = await fetch(`http://localhost:8080/reservation/all`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        })

        

        const body = await response.json();

        expect(response.status).toBe(HTTP_CODES.OK);
        expect(body).toHaveLength(4);
    });



    it('should update reservation if authorized', async ()=>{
        const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.PUT,
            body: JSON.stringify({
                startDate: 'otherStartDate'
            }),
            headers: {
                authorization: token
            }
        });

        expect(updateResult.status).toBe(HTTP_CODES.OK);

        const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });
        const getRequestBody: Reservation = await getResult.json();
        expect(getRequestBody.startDate).toBe('otherStartDate');
    });

    it('should delete reservation if authorized', async ()=>{
        const deleteResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.DELETE,
            headers: {
                authorization: token
            }
        });

        expect(deleteResult.status).toBe(HTTP_CODES.OK);

        const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method:HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });
        expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
    });





})