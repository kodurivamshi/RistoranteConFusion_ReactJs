import React from 'react';
import { DISHES } from '../shared/dishes';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import DishDetails from './DishDetailCompoent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import '../App.css';
import { Switch, Route, Redirect} from 'react-router-dom';

class Main extends React.Component {

  constructor(props){
    super(props)

    this.state = { 
        dishes : DISHES
    }
  }

 

  render(){


    const HomePage = () => {
      return(
        <Home/>
      )
    }


  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes={this.state.dishes}/>} />
        <Redirect to='/home'/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default Main;
