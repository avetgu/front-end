import React from 'react';
import s from './styles.css';
import DashboardProfileView from '../DashboardProfileView/index';
import DashboardProfileEditView from '../DashboardProfileEditView/index';
import moment from 'moment';
import local from '../../actions/axiosConfigInitial';
import { Button } from 'react-bootstrap';

class DashboardProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      user_metadata: {
        imagePreviewUrl: this.props.profile.imagePreviewUrl || '',
        nickname: this.props.profile.nickname || ''
      }
    };
  }
  handleEdit = () => {
    this.setState({ edit: true });
  };
  handleChangeUserMetaData = (field, e) => {
    let value;
    if (!e.target.value) {
      value = this.props.profile.nickname;
    } else {
      value = e.target.value;
    }
    this.setState({
      user_metadata: { ...this.state.user_metadata, [field]: value }
    });
  };
  _handleSubmit = e => {
    e.preventDefault();
    this.props.updateUser(this.state.user_metadata, this.props.profile.sub);
    this.props.updateLocalProfile(
      this.state.user_metadata.nickname,
      this.state.user_metadata.imagePreviewUrl
    );
    this.setState({ edit: false }, () => {
      swal('Profile saved!', null, 'success');
    });
  };
  _handleImageChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        user_metadata: {
          ...this.state.user_metadata,
          imagePreviewUrl: reader.result
        }
      });
    };

    reader.readAsDataURL(file);
  };

  render() {
    const { profile } = this.props;
    return (
      <div className={s.profileWrapper}>
        {!this.state.edit && (
          <DashboardProfileView
            nickname={profile.nickname}
            image={profile.imagePreviewUrl}
            setEditView={this.handleEdit}
          />
        )}
        {this.state.edit && (
          <DashboardProfileEditView
            handleSubmit={this._handleSubmit}
            handleChangeUserMetaData={this.handleChangeUserMetaData}
            handleImageChange={this._handleImageChange}
            imagePreviewUrl={this.state.user_metadata.imagePreviewUrl}
          />
        )}
        <div className={s.resetpassword}>
          <a onClick={() => this.props.resetPassword(this.props.profile.email)}>
            Change your password
          </a>
        </div>
      </div>
    );
  }
}
export default DashboardProfile;
