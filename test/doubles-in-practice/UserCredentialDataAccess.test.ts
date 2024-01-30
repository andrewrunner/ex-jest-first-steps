import { DataBase } from "../../src/data/DataBase";
import { UserCredentialsDataAccess } from "../../src/data/UserCredentialsDataAccess";
import { Account } from "../../src/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();


jest.mock("../../src/data/DataBase", () => {
    return {
        DataBase: jest.fn().mockImplementation(() => { // prevent ReferenceError: Cannot access 'insertMock' before initialization
            return {
                insert: insertMock,
                getBy: getByMock,
            }
        })
    }
})

describe("UserCredentialsDataAccess test suite", () => {

    let sut: UserCredentialsDataAccess;

    const someAccount: Account = {
        id: '',
        password: 'pass',
        userName: 'Mark Twain'
    }

    const someId = "12345";


    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1); // prevent multiple creating database (connections, if use real db)
    })
    afterEach(() => {
        jest.clearAllMocks();
    })
    

    it('should add user and return id', async () => {
        insertMock.mockResolvedValueOnce(someId);

        const actualId = await sut.addUser(someAccount);

        expect(actualId).toBe(someId);
        expect(insertMock).toHaveBeenCalledWith(someAccount);
    });

    it('should get user by id', async () => {
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserById(someId);

        expect(actualUser).toEqual(someAccount);
        expect(getByMock).toHaveBeenCalledWith('id', someId);
    });

    it('should get user by userName', async () => {
        getByMock.mockResolvedValueOnce(someAccount);

        const actualUser = await sut.getUserByUserName(someAccount.userName);

        expect(actualUser).toEqual(someAccount);
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
    });

})