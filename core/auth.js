import history from './history';
import auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth0-variables';
import { browserHistory } from 'react-router';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: 'https://gww.auth0.com/api/v2/',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });
  login = () => {
    this.auth0.authorize();
  };
  handleAuthentication = () => {
    return new Promise((res, rej) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          return rej(err);
        }
        return res(authResult);
      });
    })
      .then(authResult => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          console.log(
            'authResult',
            authResult,
            authResult.accessToken,
            authResult.idToken
          );
          this.setSession(authResult);
          // this.getProfile(authResult.accessToken);
        }
      })
      .catch(err => {
        browserHistory.replace('/error');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      });
  };

  setSession = authResult => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    browserHistory.replace('/dashboard');
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    browserHistory.replace('/dashboard');
    // remove profile from component
    this.profile = null;
  };

  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };
  getAccessToken = () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  };
  getProfile = token => {
    let accessToken = token || this.getAccessToken();
    return new Promise((res, rej) => {
      this.auth0.client.userInfo(accessToken, (err, profile) => {
        if (profile) {
          res(profile);
        }
        rej(err);
      });
    });
  };
}
