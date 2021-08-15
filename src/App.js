import React from 'react';
import ProjectList from './components/project-list/project-list';
import './sass/style.scss';

const projectsList = [
  {
    title: 'project1',
    id: 1,
    tasks: [
      {
        id: 't1',
        title: 'task11',
      },
      {
        id: 't2',
        title: 'task12',
      },
    ],
  },
  {
    title: 'project2',
    id: 2,
    tasks: [
      {
        id: 't3',
        title: 'task21',
      },
    ],
  },
  {
    title: 'project3',
    id: 3,
    tasks: [],
  },
]


class App extends React.Component {
  _isStorageSupport = true;

  constructor(props) {
    super(props);

    this.state = {
      currentProject: null,
      projects: projectsList,
    };

    this.updateCurrentProject = this.updateCurrentProject.bind(this);
    this.updateProjects = this.updateProjects.bind(this);
  }

  updateCurrentProject(value) {
    this.setState({ currentProject: value })
  }

  updateProjects(value) {
    this.setState({ projects: value }, () => {
      localStorage.setItem('projects', JSON.stringify(this.state.projects));
    })
  }

  componentDidMount() {
    let storageProjects;

    try {
      storageProjects = localStorage.getItem('projects');
      storageProjects = JSON.parse(storageProjects);
    } catch {
      this._isStorageSupport = false;
    }

    this._isStorageSupport && storageProjects && this.setState({ projects: storageProjects })
  }

  render() {
    const {
      projects
    } = this.state;

    return (
      <div className='page'>
        <ProjectList
          projects={projects}
          currentProject={this.state.currentProject}
          updateCurrentProject={this.updateCurrentProject}
          updateProjects={this.updateProjects}
        />
      </div>
    )
  }
};

export default App;