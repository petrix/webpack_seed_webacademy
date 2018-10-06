import * as React from 'react';

import { TaskList } from './components/task-list/TaskList.jsx';

export class  App extends React.Component {
  render() {
    return <div className="page">
      <header>HHere will be header</header>
      <section className="page__content">
        <TaskList />
      </section>
    </div>
  }
}