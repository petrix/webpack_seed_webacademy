import * as React from 'react';

export class TaskListContent extends React.Component{
   
    
    render(){
        const listItems = [];
        for (const item of this.props.tasks){
            const li = <li className="task-list__item" key={item.id}>{ item.title }</li>
            listItems.push(li);
        }
        console.log(listItems);
        return <ul className="ClassList__content">
            {listItems}
        </ul>
    }
}