import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
const URL = "http://localhost:3000/pizzas"

class App extends Component {

  state={
    currentPizza: {
      id: -1,
      topping: "",
      size: "Small",
      vegetarian: false
    },
    pizzas: []
  }

  // On form field change
  handleFormUpdate =(key, value)=>{
    this.setState({
      currentPizza: {
        ...this.state.currentPizza,
        [key]: value
      }
    })
  }
  
  // On Form Submit
  updatePizza = () => {
    let id = this.state.currentPizza.id
    fetch(`${URL}/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({...this.state.currentPizza})

    }).then(resp=> resp.json())
      .then(data => {
        let oldIndex = this.state.pizzas.findIndex(piz => piz.id === id)
        let newPizzas = [...this.state.pizzas]
        newPizzas[oldIndex] = {...data}
        this.setState({
          pizzas: [...newPizzas],
          currentPizza: data
        })
      })
   }

   // set current pizza based on click
  fillForm = (pizza) => {
    console.log("Setting current pizza to ", pizza)
    this.setState({
      currentPizza: {...pizza}
    })
  }

  //fetch original data
  componentDidMount(){
    fetch(URL)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pizzas: data
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizza={this.state.currentPizza} updatePizza={this.updatePizza} handleFormUpdate={this.handleFormUpdate}/>
        <PizzaList pizzas={this.state.pizzas} fillForm={this.fillForm}/>
      </Fragment>
    );
  }
}

export default App;
