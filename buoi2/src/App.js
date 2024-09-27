import logo from './logo.svg';
import './App.css';

// React buổi 1
import Information from './containers/auth/Information';
import Menu from './containers/routes/Menu';

// React buổi 2
import Hello from './demo/Hello';
import Car from './demo/Car';
import Login from './demo/Login';

// Buổi 1
// function App() {
//   const user = "Trương Chí Khanh";
//   const isLogin = true;

//   return (
//     <div>
//       <Information user={user} />
//       <Menu />
//       <button>Click me</button>
//       {!isLogin && <p>Chưa đăng nhập</p>}
//     </div>
//   );
// };

// Buổi 2
function App() {
  return (
    <div className="App">
      <Hello />
      <Car />
      <Login />
    </div>
  );
}
export default App;
