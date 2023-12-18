import { DataBase } from "../../src/data/DataBase"
import * as IdGenerator from "../../src/data/IdGenerator"



type TypeWithId = {
    id:string,
    name:string,
    color:string,
}

describe("Database test suite", () => {

    let sut: DataBase<TypeWithId>;

    const fakeId = "1234";
    const someObject1 = {
        id: '',
        name: 'someName',
        color: 'orange',
    }
    const someObject2 = {
        id: '',
        name: 'someEnotherName',
        color: 'orange',
    }



    beforeEach(() => {
        sut = new DataBase<TypeWithId>();
        jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId); // generateRandomId will return only fakeId
    })


    it("Should return id after insert", async () => {
        const actual = await sut.insert({
            id: '',
            name: '',
            color: ''
        });

        expect(actual).toBe(fakeId);
    });

    it("Should get element after insert", async () => {
        const id = await sut.insert(someObject1);
        const actual = await sut.getBy('id', id);

        expect(actual).toBe(someObject1);
    });

    it("Should find all elements with same property", async () => {
        await sut.insert(someObject1);
        await sut.insert(someObject2);

        const expected = [someObject1, someObject2];
        const actual = await sut.findAllBy('color', 'orange');

        expect(actual).toEqual(expected);
    });



    it("Should change color on object", async () => {
        const id = await sut.insert(someObject1);
        const expectedColor = 'red';

        await sut.update(id, 'color', expectedColor);
        const object = await sut.getBy('id', id);
        const actualColor = object.color;

        expect(actualColor).toBe(expectedColor);
    });


    it("Should delete object", async () => {
        const id = await sut.insert(someObject1);
        await sut.delete(id);

        const actual = await sut.getBy('id', id);

        expect(actual).toBeUndefined();
    });




})