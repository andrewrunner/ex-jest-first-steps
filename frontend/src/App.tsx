import LoginComponent from "./Login/LoginComponent";
import LoginService from "./Login/LoginService";

function App() {

  const loginService = new LoginService();
  const setToken = (token:string) => {
    console.log(token);
  }

  return (
    <div>
      <LoginComponent 
        loginService={loginService}
        setToken={setToken}/>
    </div>
  );
}

export default App;
