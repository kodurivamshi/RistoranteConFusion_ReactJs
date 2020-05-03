import React from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS }  from '../shared/leaders';
import  { PROMOTION, PROMOTIONS } from '../shared/promotions';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import DishDetail from './DishDetailCompoent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import '../App.css';
import { Switch, Route, Redirect} from 'react-router-dom';
import About from './AboutUsComponent';

class Main extends React.Component {

  constructor(props){
    super(props)

    this.state = { 
        dishes : DISHES,
        leaders : LEADERS,
        promotions : PROMOTIONS,
        comments : COMMENTS
    }
  }

 

  render(){


    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
        promotion ={this.state.promotions.filter((promo)=>promo.featured)[0]}
        leader = {this.state.leaders.filter((leader)=>leader.featured)[0]}/>
      )
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comment={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
      )
    }

  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes={this.state.dishes}/>} />
        <Route exact path='/contactus' component={Contact}/>
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Route exact path='/aboutus' component={()=> <About leaders={this.state.leaders}/>}/>
        <Redirect to='/home'/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default Main;
