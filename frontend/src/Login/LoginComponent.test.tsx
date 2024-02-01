/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-node-access */
import { act, fireEvent, render, screen } from "@testing-library/react";
import LoginComponent from "./LoginComponent";
import userEvent from "@testing-library/user-event";


describe('Login component test suite', () => {

    const setTokenMock = jest.fn();
    const loginServiceMock = {
        login: jest.fn()
    }

    let container:HTMLElement;

    function setup() {
        container = render(<LoginComponent 
            loginService={loginServiceMock}
            setToken={setTokenMock}
        />).container;
    }



    beforeEach(() => {
        setup(); // use wrpaaer function to awoid eslint error
    })
   

    it('Should render correctly', () => {

        // const container = render(<LoginComponent 
        //     loginService={loginServiceMock}
        //     setToken={setTokenMock}
        // />)
        // .container;

        // console.log(container.innerHTML)

        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();

        // get by attribute 'data-testid'. Example: data-testid='resultLabel'
        expect(screen.queryByTestId('resultLabel')).not.toBeInTheDocument();
    });



    it('Should render correctly - query by test id', () => {
        const inputs = screen.queryAllByTestId('input');

        expect(inputs).toHaveLength(3);
        
        expect(inputs[0].getAttribute('value')).toBe('');
        expect(inputs[1].getAttribute('value')).toBe('');
        expect(inputs[2].getAttribute('value')).toBe('Login'); // button
    });


    it('Should render correctly - query by document query', () => {
        const inputs = container.querySelectorAll('input'); 

        expect(inputs).toHaveLength(3);
        
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');
        expect(inputs[2].value).toBe('Login'); // button
    });




    it('Click login button with incomplete credentials - should show required message', () => {
        const inputs = screen.queryAllByTestId('input');
        const loginButton = inputs[2];

        fireEvent.click(loginButton);

        const resultLabel = screen.queryByTestId('resultLabel');
        expect(resultLabel?.textContent).toBe('UserName and password required!');
    });

    //enother way how to fire event 
    it('Click login button with incomplete credentials - should show required message - with user click', () => {
        const inputs = screen.queryAllByTestId('input');
        const loginButton = inputs[2];

        // fireEvent.click already has act wrapper
        act(() => {
            userEvent.click(loginButton)
        })

        const resultLabel = screen.queryByTestId('resultLabel');
        expect(resultLabel?.textContent).toBe('UserName and password required!');
    });


    it('Write credentials - successful login', async () => {

        loginServiceMock.login.mockResolvedValueOnce('1234');

        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton   = inputs[2];
    
        fireEvent.change(userNameInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePassword'}});
        fireEvent.click(loginButton);

        expect(loginServiceMock.login).toBeCalledWith('someUser', 'somePassword')

        const resultLabel = await screen.findByTestId('resultLabel'); // !!! findByTestId - is async 
        expect(resultLabel?.textContent).toBe('successful login');
    });

    it('Write credentials - successful login - with user calls', async () => {

        loginServiceMock.login.mockResolvedValueOnce('1234');

        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton   = inputs[2];
    

        act(() => {
            userEvent.click(userNameInput);
            userEvent.keyboard('someUser');

            userEvent.click(passwordInput);
            userEvent.keyboard('somePassword');

            userEvent.click(loginButton);
        })

        expect(loginServiceMock.login).toBeCalledWith('someUser', 'somePassword')

        const resultLabel = await screen.findByTestId('resultLabel'); // !!! findByTestId - is async 
        expect(resultLabel?.textContent).toBe('successful login');
    });




    it('Write credentials - unsuccessful login', async () => {

        loginServiceMock.login.mockResolvedValueOnce(undefined);

        const inputs = screen.queryAllByTestId('input');
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton   = inputs[2];
    
        fireEvent.change(userNameInput, {target:{value: 'someUser'}});
        fireEvent.change(passwordInput, {target:{value: 'somePassword'}});
        fireEvent.click(loginButton);

        expect(loginServiceMock.login).toBeCalledWith('someUser', 'somePassword')

        const resultLabel = await screen.findByTestId('resultLabel'); // !!! findByTestId - is async 
        expect(resultLabel?.textContent).toBe('invalid credentials');
    });


})