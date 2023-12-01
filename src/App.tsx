import Toolbar from './components/Toolbar/Toolbar';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
// import Add from './containers/Add/Add';
import PostForm from './components/FormForPost/FormForPost';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <main className="container-fluid">
      <Routes>
        <Route path="/" element={(<Home/>)}/>
        <Route path="/posts" element={(<Home/>)}/>
        <Route path="/new-post" element={(<PostForm/>)}/>
        <Route path="/about" element={(<About/>)}/>
        <Route path="/contacts" element={(<Contacts/>)}/>
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
    </main>
  </>
);

export default App;
