import React from 'react';
import DashboardNav from '../../components/DashboardNav/index';
import s from './styles.css';
import DashboardProfile from '../../components/DashboardProfile/index';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { profile: null, section: null };
  }
  login = () => {
    this.props.auth.login();
  };
  logout = () => {
    this.props.auth.logout();
  };
  //this might not be nessary
  // componentWillMount() {
  //   this.showProfile();
  // }
  // showProfile = () => {
  //   if (this.props.auth.isAuthenticated()) {
  //     this.props.auth.getProfile().then(profile => {
  //       this.setState({ profile });
  //     });
  //   }
  // };
  setSection = section => {
    this.setState({ section });
  };
  showContent = () => {
    switch (this.state.section) {
      case 'profile':
        return <DashboardProfile />;
      case 'subscriptions':
        return <div>Subscriptions Coming soon ... </div>;
      case 'forum':
        return <div>Forum Coming soon ... </div>;
      default:
        return <DashboardProfile profile={this.state.profile} />;
    }
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const loggedIn = isAuthenticated();
    return (
      <div className="styles_blurb_3jf">
        {loggedIn && (
          <div className={s['dashboard-nav']}>
            <div className={s.section}>
              <DashboardNav setSection={this.setSection} logOut={this.logout} />
            </div>
            <div className={s.content}>{this.showContent()}</div>
          </div>
        )}
        {!loggedIn && (
          <h4 style={{ textAlign: 'center' }}>
            Please{' '}
            <a style={{ cursor: 'pointer' }} onClick={this.login}>
              Log In{' '}
            </a>
            to view your dashboard.
          </h4>
        )}
      </div>
    );
  }
}

export default Dashboard;
