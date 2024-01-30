import { IncomingMessage } from 'http';
import { getRequestBody } from "../../src/utils/Utils";


const requestMock = {
    on: jest.fn()
}
const someObject = {
    name: 'Sam',
    age:  25,
    city: 'New York'
}
const someObjectAsStr = JSON.stringify(someObject);


describe("getRequestBody test suite", () => {


    it("Should return object or valid json", async () => {

        requestMock.on.mockImplementation((eventName, callback) => {
            if(eventName == 'data') {
                callback(someObjectAsStr)
            } else {
                callback();
            }
        })

        const actual = await getRequestBody(
            requestMock as any as IncomingMessage
        )

        expect(actual).toEqual(someObject);

    });


    it("Should throw error for invalid json", async () => {

        requestMock.on.mockImplementation((eventName, callback) => {
            if(eventName == 'data') {
                callback("a" + someObjectAsStr)
            } else {
                callback();
            }
        })

        await expect(getRequestBody(
            requestMock as any
        ))
        .rejects
        .toThrow("Unexpected token 'a', \"a{\"name\":\"\"... is not valid JSON")

    });


    it("Should throw error forunexpected error", async () => {

        const someError = new Error('Something went wrong!');

        requestMock.on.mockImplementation((eventName, callback) => {
            if(eventName == 'error') {
                callback(someError)
            }
        })


        await expect(getRequestBody(
            requestMock as any
        ))
        .rejects
        .toThrow(someError.message)

    });

});