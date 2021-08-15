import React from "react";
import EditableField from "../editable-field/editable-field";
import Button from "../button/button";
import Plus from '../../icons/plus.svg';

class TaskList extends React.Component {
  constructor() {
    super();

    this.addTask = this.addTask.bind(this);
  }

  addTask() {
    let newTask = Object.assign({}, this.props.list.tasks[0]);

    let maxID = 0;

    this.props.list.tasks.length > 0 &&
      this.props.list.tasks.forEach(item => {
        if (Number(item.id.split('t').pop()) > maxID) {
          maxID = Number(item.id.split('t').pop());
        }
      });

    newTask.id = 't' + (maxID + 1);
    newTask.title = 'Новая задача';

    let newTaskList = this.props.list.tasks

    newTaskList.push(newTask);
    console.log(newTaskList);

    const newCurrentProject = this.props.list;
    newCurrentProject.tasks = newTaskList;
    console.log(newCurrentProject);
    this.props.updateCurrentProject(newCurrentProject);

    let newIndex = this.props.projects.findIndex(some => some.id === this.props.list.id);
    let tmpProjects = this.props.projects;
    tmpProjects.splice(newIndex, 1, newCurrentProject);
    this.props.updateProjects(tmpProjects)
  }

  render() {
    const {
      list,
      projects
    } = this.props;

    return (
      <div className="task-list">
        <h2 className="task-list__title">Задачи по проекту - {list.title}</h2>
        {list.tasks.map(item =>
          <EditableField
            item={item}
            key={item.id}
            currentProject={list}
            projects={projects}
            updateCurrentProject={this.props.updateCurrentProject}
            updateProjects={this.props.updateProjects}
            isTask={true}
          />
        )}
        <Button
          className="task-list__add-btn"
          onClick={this.addTask}
        >
          <img src={Plus} width='30' height='30'></img>
        </Button>
      </div>
    )
  }
}

export default TaskList;