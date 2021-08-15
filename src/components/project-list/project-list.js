import Button from "../button/button";
import TaskList from "../task-list/task-list";
import React from "react";
import EditableField from "../editable-field/editable-field";
import Plus from '../../icons/plus.svg';

class ProjectList extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: null
    };

    this.addProject = this.addProject.bind(this);
  }

  addProject() {
    let newProject = Object.assign({}, this.props.projects[0]);

    let maxID = 0;

    this.props.projects.forEach(item => {
      if (item.id > maxID) {
        maxID = item.id;
      }
    });

    newProject.id = maxID + 1;
    newProject.title = 'Новый проект';
    newProject.tasks = [];

    let newProjectList = this.props.projects

    newProjectList.push(newProject);

    this.setState({ projects: newProjectList }, () => {
      console.log(this.state.projects);
      this.props.updateProjects(this.state.projects);
    })
  }

  render() {
    const {
      currentProject,
      projects,
    } = this.props;

    return (
      <section className='project-list'>
        <div className='project-list__header'>
          <h1 className='project-list__title'>Список проектов</h1>
        </div>
        <div className='project-list__list'>
          <div className="project-list__wrapper">
            {
              projects.map(item =>
                <EditableField
                  item={item}
                  key={item.id}
                  projects={projects}
                  currentProject={currentProject}
                  updateCurrentProject={this.props.updateCurrentProject}
                  updateProjects={this.props.updateProjects}
                />
              )}
          </div>
          <Button
            className="project-list__add-btn"
            onClick={this.addProject}
          >
            <img src={Plus} width='30' height='30'></img>
          </Button>
        </div>
        <div className="project-list__tasks">
          {currentProject
            ? <TaskList
              list={currentProject}
              projects={projects}
              updateCurrentProject={this.props.updateCurrentProject}
              updateProjects={this.props.updateProjects}
            />
            : <p>Создайте или выберите проект</p>
          }
        </div>
      </section>
    )
  }
}


export default ProjectList;