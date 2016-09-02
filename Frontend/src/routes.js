import React from 'react';
import { Route } from 'react-router';
import App from './components/app';
import Main from './containers/main';
import CreateSnap from './containers/create-snap.js';
import ShowSnap from './containers/show-snap.js';
import Settings from './containers/settings.js';
import Profile from './containers/profile.js';
import RequireAuth from './containers/require-auth';
import SignUp from './containers/sign-up';
import SignIn from './containers/sign-in';
import Friends from './containers/friends.js';
import fb from './containers/fb';


export default(
  <Route path="/" component={App}>
    <Route path="snaps" component={RequireAuth(Main)} />
    <Route path="snaps/new" component={RequireAuth(CreateSnap)} />
    <Route path="snaps/:id" component={RequireAuth(ShowSnap)} />
    <Route path="/settings" component={RequireAuth(Settings)} />
    <Route path="/profile" component={RequireAuth(Profile)} />
    <Route path="/friends" component={RequireAuth(Friends)} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/auth/facebook" component={fb} />
  </Route>
);
