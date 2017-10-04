import React from 'react';
import { Button } from 'react-bootstrap';
import s from './styles.css';

class DashboardProfileView extends React.Component {
  render() {
    return (
      <div>
        <h2>Hi {this.props.nickname}</h2>
        <div>
          <img className={s.imagepreview} src={this.props.image} />
        </div>
        <Button className="btn btn-primary" onClick={this.props.setEditView}>
          Edit
        </Button>
      </div>
    );
  }
}
export default DashboardProfileView;
