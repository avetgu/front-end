import React from 'react';
import s from './styles.css';
import moment from 'moment';
class DashboardProfile extends React.Component {
  render() {
    return (
      <div className={s.profileWrapper}>
        hello! you will be able to change password, email or upload profile
        picture here
        <p>change password comming soon...</p>
        <p>change email coming soon...</p>
        <p>upload profile photo coming soon...</p>
      </div>
    );
  }
}
export default DashboardProfile;
