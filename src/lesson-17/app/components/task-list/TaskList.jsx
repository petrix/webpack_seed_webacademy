import * as React from 'react';
import { TaskListHeader } from './TaskListHeader.jsx';
import { TaskListContent } from './TaskListContent.jsx';
export class TaskList extends React.Component{
    constructor(){
        super();
        this.state = {
            tasks: []
        }
    }
    componentDidMount(){
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:4001/list');
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.status === 200) {
                    console.log(xhr.response);
                    this.setState({
                        tasks: JSON.parse(xhr.response)
                    });
                } else {
                    console.log(xhr.error);
                }
            }
        }
    }

    addTask(task){
        this.setState({
            tasks: this.state.tasks.concat([task])
        });
    }
    render(){
        return <div className="task-list">
            <TaskListHeader onSuccessSubmit={this.addTask.bind(this)} />
            <TaskListContent tasks={this.state.tasks} />
            <div className="task-list__footer"></div>
            </div>
    }
}