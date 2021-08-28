import Navbar from "./Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Blogs from "./Blogs";
import Home from "./Home";
import Notfound from "./Notfound";
import Blogdetail from "./Blogdetail";
import Addblog from "./Addblog";
import Editblog from "./Editblog";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Switch>
      <Route path='/blogdetail/:id'><Blogdetail/></Route>
      <Route path='/editblog/:id'><Editblog/></Route>
      <Route path='/blogs'><Blogs/></Route>
      <Route path='/addblog'><Addblog/></Route>
      <Route path="/" exact><Home/></Route>
      <Route path="*"><Notfound/></Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
