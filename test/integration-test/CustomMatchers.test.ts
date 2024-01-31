import { Reservation } from "../../src/model/ReservationModel"


expect.extend({
    toBeValidReservation(reservation:Reservation) {

        const validId = (reservation.id.length > 5) ? true : false;
        const validUser = (reservation.user.length > 5) ? true : false;

        return {
            pass: validId && validUser,
            message: () => 'Expected Reservation to have valid id and user' 
        }
    },

    toHaveUser(reservation:Reservation, user: string) {
        const hasRightUser = user == reservation.user;

        return {
            pass: hasRightUser,
            message: () => `expected reservation have user ${user}, but received ${reservation.user}` 
        }
    }
})

interface CustomMatchers<R> {
    toBeValidReservation(): R,
    toHaveUser(user:string),
}

// add types for typescript 
declare global {
    namespace jest {
        interface Matchers<R> extends CustomMatchers<R> {}
    }
}


const someReservation:Reservation = {
    id: '231456',
    startDate: 'startdate',
    endDate: 'enddate',
    room: 'room',
    user: 'user12',
}

describe("Custom matchers test", () => {

    it('check for valid reservation', () => {
        expect(someReservation).toBeValidReservation();
        expect(someReservation).toHaveUser('user12')
    })


})