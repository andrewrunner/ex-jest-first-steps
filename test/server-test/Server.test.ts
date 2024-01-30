import { Authorizer } from "../../src/auth/Authorizer";
import { ReservationsDataAccess } from "../../src/data/ReservationsDataAccess";
import { LoginHandler } from "../../src/handlers/LoginHandler";
import { RegisterHandler } from "../../src/handlers/RegisterHandler";
import { ReservationsHandler } from "../../src/handlers/ReservationsHandler";
import { HTTP_CODES } from "../../src/model/ServerModel";
import { Server } from "../../src/server/Server"


jest.mock('../../src/auth/Authorizer');
jest.mock('../../src/data/ReservationsDataAccess');
jest.mock('../../src/handlers/LoginHandler');
jest.mock('../../src/handlers/RegisterHandler');
jest.mock('../../src/handlers/ReservationsHandler');




const requestMock = {
    url: "",
    headers: {
        'user-agent': 'jest-test'
    }
}
const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn(),
}
const serverMock = {
    listen: jest.fn(),
    close: jest.fn(),
}

jest.mock('http', () => ({
    createServer: (cd:Function) => {
        cd(requestMock, responseMock);
        return serverMock;
    }
}))


describe("Server test suite", () => {

    let sut: Server;

    beforeEach(() => {
        sut = new Server();
        expect(Authorizer).toHaveBeenCalledTimes(1);
        expect(ReservationsDataAccess).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it("should start server", async () => {
        await sut.startServer();
        
        expect(serverMock.listen).toHaveBeenCalledWith(8080);
        expect(responseMock.end).toHaveBeenCalled();
    })


    // Use prototype spies 
    it("should handle register request", async () => {

        requestMock.url = 'localhost:8080/register';
        const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest')

        await sut.startServer();
        
        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer)); // test constructor have been called with params...
    })

    it("should handle login request", async () => {

        requestMock.url = 'localhost:8080/login';
        const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest')

        await sut.startServer();
        
        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer)); // test constructor have been called with params...
    })

    it("should handle reservation request", async () => {

        requestMock.url = 'localhost:8080/reservation';
        const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')

        await sut.startServer();
        
        expect(handleRequestSpy).toHaveBeenCalledTimes(1);
        expect(ReservationsHandler).toHaveBeenCalledWith(
            requestMock, 
            responseMock, 
            expect.any(Authorizer),
            expect.any(ReservationsDataAccess)
            ); // test constructor have been called with params...
    })

    it("should do nothing for not exists route ", async () => {

        requestMock.url = 'localhost:8080/someRoute123';
        const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken')

        await sut.startServer();

        expect(validateTokenSpy).not.toHaveBeenCalled();
    })


    it("should handle errors in service requests", async () => {

        requestMock.url = 'localhost:8080/reservation';
        const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')
        handleRequestSpy.mockRejectedValueOnce(
            new Error('Some Error')
        );

        await sut.startServer();
        
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.INTERNAL_SERVER_ERROR, 
            JSON.stringify(`Internal server error: Some Error`)
        );
    })


    it("should stop server after started", async () => {

        await sut.startServer();
        await sut.stopServer();
        
        expect(serverMock.close).toHaveBeenCalledTimes(1);
    })


})