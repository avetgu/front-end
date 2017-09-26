import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

var lock = new Auth0Lock('OIzT7gmLYcxbLZWGDz7LAsX6i2iCP2tc', 'gww.auth0.com', {
  auth: {
    redirect: false
  }
});

lock.on('authenticated', function(authResult) {
  lock.getProfile(authResult.idToken, function(error, profile) {
    if (error) {
      // Handle error
      return;
    }

    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});
