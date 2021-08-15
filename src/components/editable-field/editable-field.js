import Button from "../button/button";
import React from "react";
import Edit from '../../icons/edit.svg'
import Delete from '../../icons/delete.svg'
import Cancel from '../../icons/x-mark.svg'
import Save from '../../icons/save.svg'

class EditableField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProject: null,
      editable: false,
      item: null,
      projects: null
    }

    this.EditableSpan = React.createRef();

    this.onCLickEditField = this.onCLickEditField.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onClickCancel = this.onClickCancel.bind(this);
    this.onClickSaveTask = this.onClickSaveTask.bind(this);
  }

  onCLickShowTasks(id) {
    if (!isNaN(this.props.item.id)) {
      const isID = item => item.id === id;
      const newCurrentProject = this.props.projects.filter(isID);
      this.setState({ currentProject: newCurrentProject[0] }, () => {
        this.props.updateCurrentProject(this.state.currentProject);
      });
    }
  };

  onClickDelete() {
    const isNotId = item => item.id !== this.props.item.id;

    if (isNaN(this.props.item.id)) {
      const updatedTasks = this.props.currentProject.tasks.filter(isNotId);


      let newCurrentProject = Object.assign({}, this.props.currentProject);
      newCurrentProject.tasks = updatedTasks;
      this.setState({ currentProject: newCurrentProject }, () => {
        this.props.updateCurrentProject(this.state.currentProject);
      })

      let newIndex = this.props.projects.findIndex(some => some.id === newCurrentProject.id);
      let tmpProjects = this.props.projects;
      tmpProjects.splice(newIndex, 1, newCurrentProject);
      this.props.updateProjects(tmpProjects)
    } else {
      const updatedProjects = this.props.projects.filter(isNotId);

      if (this.props.currentProject && this.props.item.id === this.props.currentProject.id) {
        this.setState({ currentProject: null }, () => {
          this.props.updateCurrentProject(this.state.currentProject);
        })
      }

      this.setState({ projects: updatedProjects }, () => {
        this.props.updateProjects(updatedProjects)
      });
    }
  }

  onClickCancel() {
    this.setState({ editable: false });
    this.EditableSpan.current.textContent = this.props.item.title;
  }

  onCLickEditField() {
    this.setState({ editable: true }, () => {
      this.EditableSpan.current.focus();
    });
  }

  onClickSave() {
    this.setState({ editable: false });
    let newTitle = { title: this.EditableSpan.current.textContent };
    this.setState({
      item: {
        ...this.props.item, ...newTitle
      }
    }, () => {
      let newIndex = this.props.projects.findIndex(some => some.id === this.state.item.id);
      let tmpProjects = this.props.projects;
      tmpProjects.splice(newIndex, 1, this.state.item);
      this.props.updateProjects(tmpProjects)
      if (this.props.currentProject && this.props.currentProject.id === this.state.item.id) {
        this.props.updateCurrentProject(this.state.item)
      }
    });
  }

  onClickSaveTask() {
    this.setState({ editable: false });
    let newTitle = { title: this.EditableSpan.current.textContent };
    this.setState({
      item: {
        ...this.props.item, ...newTitle
      }
    }, () => {
      let newIndexTask = this.props.currentProject.tasks.findIndex(some => some.id === this.state.item.id);
      let tmpTasks = this.props.currentProject.tasks;
      tmpTasks.splice(newIndexTask, 1, this.state.item);

      const newCurrentProject = this.props.currentProject;
      newCurrentProject.tasks = tmpTasks;
      console.log(newCurrentProject);
      this.props.updateCurrentProject(newCurrentProject);

      let newIndex = this.props.projects.findIndex(some => some.id === this.props.currentProject.id);
      let tmpProjects = this.props.projects;
      tmpProjects.splice(newIndex, 1, newCurrentProject);
      this.props.updateProjects(tmpProjects)
    });
  }

  render() {
    const {
      item,
    } = this.props;

    return (
      <div
        key={item.id}
        className='editable-field'
      >
        {
          this.props.isTask
            ? <span
              contentEditable={this.state.editable}
              className='editable-field__name editable-field__name--no-pointer'
              suppressContentEditableWarning={true}
              ref={this.EditableSpan}
            >
              {item.title}
            </span>
            : <span
              contentEditable={this.state.editable}
              className='editable-field__name'
              suppressContentEditableWarning={true}
              onClick={() => this.onCLickShowTasks(item.id)}
              ref={this.EditableSpan}
            >
              {item.title}
            </span>
        }
        {
          this.state.editable ? (
            <>
              {
                this.props.isTask
                  ? <Button
                    onClick={this.onClickSaveTask}
                    editable={this.state.editable}
                  >
                    <img src={Save} width='20' height='20'></img>
                  </Button>
                  : <Button
                    onClick={this.onClickSave}
                    editable={this.state.editable}
                  >
                    <img src={Save} width='20' height='20'></img>
                  </Button>
              }
              <Button
                onClick={this.onClickCancel}
              >
                <img src={Cancel} width='20' height='20'></img>
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={this.onCLickEditField}
                editable={this.state.editable}
              >
                <img src={Edit} width='20' height='20'></img>
              </Button>
              <Button
                onClick={this.onClickDelete}
              >
                <img src={Delete} width='20' height='20'></img>
              </Button>
            </>
          )
        }
      </div >
    )
  }
}

export default EditableField;
