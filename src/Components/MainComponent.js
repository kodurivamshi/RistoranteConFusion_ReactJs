import React from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import DishDetail from './DishDetailCompoent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import '../App.css';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import About from './AboutUsComponent';
import { connect } from 'react-redux';
import { addComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreaters';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments : state.comments,
      promotions: state.promotions,
      leaders : state.leaders
    }
}

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: ()=>{dispatch(fetchDishes())},
  resetFeedbackForm: ()=>{ dispatch(actions.reset('feedback')) },
  fetchComments: ()=>{dispatch(fetchComments())},
  fetchPromos: ()=>{dispatch(fetchPromos())},
  fetchLeaders: ()=>{dispatch(fetchLeaders())}
});

class Main extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render(){

    const HomePage = () => {
      console.log('items-leaders  main  : ',this.props.leaders);
      return(
        <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishesErrMess={this.props.dishes.errMEss}
        promotion ={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
        promosLoading = { this.props.promotions.isLoading}
        promosErrMess = {this.props.promotions.errMess}
        leader = {this.props.leaders.leaders.filter((leader)=>leader.featured)[0]}/>
      )
    }

    const DishWithId = ({match}) => {
      return(
        <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}    
        comment={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
        errMess={this.props.comments.errMess}
        addComment={this.props.addComment}/>
      )
    }

  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/home' component={HomePage} />
        <Route exact path='/menu' component={()=><Menu dishes={this.props.dishes}/>} />
        <Route exact path='/contactus' component={()=><Contact resetFeedbackForm={this.resetFeedbackForm}/>}/>
        <Route path='/menu/:dishId' component={DishWithId}/>
        <Route exact path='/aboutus' component={()=> <About leaders={this.props.leaders}/>}/>
        <Redirect to='/home'/>
      </Switch>
      <Footer/>
    </div>
  );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
