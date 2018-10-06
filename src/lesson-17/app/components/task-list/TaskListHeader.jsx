import * as React from 'react';

export class TaskListHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ''
    }
  }
  submitHandler(e) {
    e.preventDefault();
    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:4001/list');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(this.state));
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          this.setState({title: ''});
          this.props.onSuccessSubmit(JSON.parse(xhr.response));
        }
      }
    }
  }

  changeHandler(e) {
    const value = e.target.value;
    this.setState({
      title: value
    })
  }

  render() {
    return <form className="task-list__header" onSubmit={this.submitHandler.bind(this)}>
      <h1 className="task-list__title">TASKS</h1>
      <div className="task-list__input">
        <input type="text"
         value={this.state.title} 
         className="task-list__native-input" 
         onChange={this.changeHandler.bind(this)}/>
      </div>
    </form>
  }
}