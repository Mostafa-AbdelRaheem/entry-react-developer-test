import React from 'react';
import Home from './pages/Home';
import './App.css';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import All from './pages/all';
import Tech from './pages/tech';
import Category from './pages/category';
import ProductDescription from './pages/productDescription'
import Header from './components/Header';
import { Provider } from 'react-redux';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import configureStore  from './store/configureStore';


//apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

const store = configureStore();

class App extends React.Component {
  
  render() { 
    return (
        <div className="appContainer">
          <Provider store={store}>
            <ApolloProvider client={client}>
              <Router>
                {/* <Header/> */}
                <Switch>
                  <Route path="/tech" component={Tech}/>
                  <Route path="/all" component={All}/>
                  <Route path="/product/:id" component={ProductDescription}/>
                  <Route path="/category/:category" component={Category}/>
                  <Route path="/" component={Home}/>
                </Switch>
              </Router>
            </ApolloProvider>         
          </Provider>
        </div>
  
    );
  }
}
 
export default App;

