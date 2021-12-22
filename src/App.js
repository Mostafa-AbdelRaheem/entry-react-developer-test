import React from 'react';
import {categories,products} from './API/api'
import Home from './pages/Home';
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";
import './App.css';
import StoreContext from './context/storeContext';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import All from './pages/all';
import Clothes from './pages/clothes';
import Tech from './pages/tech';
import Header from './components/Header';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});

class App extends React.Component {
  state={
    sotreCategories:[],
    allProducts:[],
    clothProducts:[],
    techProducts:[]
  }

  async componentWillMount() {
    // const response1 =await client.query({query: categories})
    // let sotreCategories=[]
    // response1.data.categories.forEach(element => {
    //   sotreCategories.push(element.name)  
    // });


    // const response2 =await client.query({query: products});
    // let allProducts=[];
    // response2.data.categories[0].products.forEach(element => {
    //   allProducts.push(element)  
    // });

    // let clothProducts=[];
    // response2.data.categories[1].products.forEach(element => {
    //   clothProducts.push(element)  
    // });
    
    // let techProducts=[];
    // response2.data.categories[2].products.forEach(element => {
    //   techProducts.push(element)  
    // });


    // this.setState({sotreCategories,allProducts,clothProducts,techProducts})

  }
  
  render() { 
    // console.log("all prodcut length",client)

    return (
        <div className="appContainer">{
          // this.state.sotreCategories.length!==0?
          // <StoreContext.Provider value={this.state}>
          <StoreContext.Provider value={client}>
            <Router>
            {/* <Header/> */}
              <Switch>
                <Route path="/tech" component={Tech}/>
                <Route path="/clothes" component={Clothes}/>
                <Route path="/all" component={All}/>
                <Route path="/" component={Home}/>
              </Switch>
            </Router>
          </StoreContext.Provider>
          // :""
        }
        </div>
  
    );
  }
}
 
export default App;

