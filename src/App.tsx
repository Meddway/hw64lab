import Toolbar from './components/Toolbar/Toolbar';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import {Route, Routes} from 'react-router-dom';
import Home from './containers/Home/Home';
import PostForm from './components/FormForPost/FormForPost';
import ReadPost from './containers/ReadPost/ReadPost';
import Add from './containers/Add/Add';

const App = () => (
  <>
    <header>
      <Toolbar/>
    </header>
    <main className="container-fluid">
      <Routes>
        <Route path="/" element={(<Home/>)}/>
        <Route path="/posts" element={(<Home/>)}/>
        <Route path="/new-post" element={<Add/>} />
        <Route path="/new-post" element={(<PostForm/>)}/>
        <Route path="/about" element={(<About/>)}/>
        <Route path="/contacts" element={(<Contacts/>)}/>
        <Route path="/posts/:id" element={(<ReadPost/>)} />
        <Route path="*" element={(<h1>Not Found!</h1>)}/>
      </Routes>
    </main>
  </>
);

export default App;
