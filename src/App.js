import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import Category from './pages/category';
import ProductDescription from './pages/productDescription'
import Header from './components/Header';
import NotFound from './pages/notFound';
import { Provider } from 'react-redux';
import './App.css';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import configureStore  from './store/configureStore';
import Cart from './pages/cart';


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
                <Header/>
                <Switch>
                  <Route exact path="/product/:id" component={ProductDescription}/>
                  <Route exact path="/categories/:category" component={Category}/>
                  <Route exact path="/cart" component={Cart}/>
                  <Route path="/not-found" component={NotFound}/>
                  <Redirect exact from='/' to="/categories/all"/>
                  <Redirect to="/not-found"/>
                </Switch>
              </Router>
            </ApolloProvider>         
          </Provider>
        </div>
  
    );
  }
}
 
export default App;

