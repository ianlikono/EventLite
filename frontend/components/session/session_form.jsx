import React from 'react';
import { Redirect, Link } from 'react-router-dom';


class SessionForm extends React.Component {
  constructor(props){
    super(props);
    if(this.props.formType === 'Log In'){
      this.state = {email: '', password: '', first_name: '', last_name: ''}
    } else {
      this.state = {email: '',password: '' }
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.revertBackToOriginalState = this.revertBackToOriginalState.bind(this)
  }

  revertBackToOriginalState(){
    if (this.props.formType === 'Log In'){
      this.setState({ email: '', password: ''})
    } else {
      this.setState({email: '', password: '', first_name: '', last_name: ''})
    }
  }

  handleSubmit(e){
    let state = this.state;
    this.revertBackToOriginalState();
    this.props.processForm(state);
  }

  componentWillReceiveProps(nextProps){
    if (this.props.formType !== nextProps.formType){
      this.props.clearErrors();
      this.revertBackToOriginalState()
    }
  }



  handleChange(field){
    return (e) => {
      this.setState({[field]:e.target.value})
    }
  }


  render(){
    let form;
    let errors = this.props.errors.map((error, idx) =>{
      return <li key={idx}>{error}</li>
    })
    let path = this.props.match.path === '/login' ? '/signup' : '/login'
    let otherFormType = this.props.formType === 'Log In' ? 'Sign Up' : 'Log In';
    let link=<Link to={path}>{otherFormType}</Link>
    if (!this.props.loggedIn){

      if (this.props.match.path === '/login'){
        form = (
          <div>
            Log In
          <form onSubmit={this.handleSubmit}>
            <label>email
              <input type='text' onChange={this.handleChange('email')} value={this.state.email} />
            </label>
            <br/>
            <label>password
              <input type='text' onChange={this.handleChange('password')} value={this.state.password}/>
            </label>
            <button type='submit'>{this.props.formType}</button>
          </form>
          </div>
        )
      } else {
        form = (
          <div>
          Sign Up
            <form onSubmit={this.handleSubmit}>
              <label> email
                <input type='text' onChange={this.handleChange('email')} value={this.state.email}/>
              </label>
              <br/>
              <label> first name
                <input type='text' onChange={this.handleChange('first_name')} value={this.state.first_name} />
              </label>
              <br/>
              <label>last name
                <input type='text' onChange={this.handleChange('last_name')} value={this.state.last_name}/>
              </label>
              <br/>
              <label> password
                <input type='text' onChange={this.handleChange('password')} value={this.state.password}/>
              </label>
              <br/>
              <button type='submit'>{this.props.formType}</button>
          </form>
        </div>
        )
      }
  }
    return (
      <div>
        {link}
        {form}
      <ul>
        {errors}
      </ul>
    </div>
    )
  }
}

export default SessionForm;