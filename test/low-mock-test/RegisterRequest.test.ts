import { DataBase } from "../../src/data/DataBase";
import { HTTP_CODES, HTTP_METHODS } from "../../src/model/ServerModel";
import { Server } from "../../src/server/Server";
import { RequestTestWrapper } from "./RequestTestWrapper";
import { ResponseTestWrapper } from "./ResponseTestWrapper";

//jest.mock("../../src/data/DataBase");

const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
    listen: jest.fn(),
    close: jest.fn(),
}

jest.mock('http', () => ({
    createServer: (cb:Function) => {
        cb(requestWrapper, responseWrapper);
        return fakeServer;
    } 
}))


describe("Register test suite", () => {

    afterEach(() => {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
    })


    it('Should register new users', async () => {

        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {
            userName: 'name',
            password: 'pass'
        }
        requestWrapper.url = 'localhost:8080/register';
        jest.spyOn(DataBase.prototype, 'insert').mockResolvedValueOnce('1234');

        await new Server().startServer()

        await new Promise(process.nextTick) // solve timing problem (outer async/await dosen`t help)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseWrapper.body).toEqual(expect.objectContaining({
            userId: expect.any(String)
        }))

    });


    it('Should reject request without name and password', async () => {

        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {}
        requestWrapper.url = 'localhost:8080/register';

        await new Server().startServer()

        await new Promise(process.nextTick) // solve timing problem (outer async/await dosen`t help)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseWrapper.body).toEqual('userName and password required')

    });


    it('Should rdo nothing on not supported method', async () => {

        requestWrapper.method = HTTP_METHODS.DELETE;
        requestWrapper.body = {}
        requestWrapper.url = 'localhost:8080/register';

        await new Server().startServer()

        await new Promise(process.nextTick) // solve timing problem (outer async/await dosen`t help)

        expect(responseWrapper.statusCode).toBeUndefined();
        expect(responseWrapper.body).toBeUndefined()

    });



})