import { Authorizer } from "../../../src/auth/Authorizer";
import { RegisterHandler } from "../../../src/handlers/RegisterHandler";
import { IncomingMessage, ServerResponse } from "http";
import { HTTP_CODES, HTTP_METHODS } from "../../../src/model/ServerModel";


const getRequestBodyMock = jest.fn(); 

jest.mock("../../../src/utils/Utils", () => ({
    getRequestBody: () => getRequestBodyMock() 
}))


describe("RegisterHandler test suite", () => {

    let sut:RegisterHandler;

    const request = {
        method: undefined
    }
    const respoonseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn(),
    }
    const authorizeMock = {
        registerUser: jest.fn()
    }
    const someAccount = {
        id: '',
        password: 'some',
        userName: 'user'
    }
    const someId = '1234';

    
    beforeEach(() => {
        sut = new RegisterHandler(
            request as IncomingMessage,
            respoonseMock as any as ServerResponse,
            authorizeMock as any as Authorizer
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    })


    it('Should register valid accounts', async () => {

        request.method = HTTP_METHODS.POST,
        getRequestBodyMock.mockResolvedValueOnce(someAccount);
        authorizeMock.registerUser.mockResolvedValueOnce(someId);

        await sut.handleRequest();

        expect(respoonseMock.statusCode).toBe(HTTP_CODES.CREATED);
        expect(respoonseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.CREATED,
            { 'Content-Type': 'application/json' }
        )
        expect(respoonseMock.write).toHaveBeenCalledWith(
           JSON.stringify({
            userId: someId
           })
        )
    })



});