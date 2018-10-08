import React, { PureComponent } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';
import UserPage from '../UserPage';
import { getIsAuthorized, logout } from '../../ducks/auth';
import { getIsNetworkErrorPresent, getIsError } from '../../ducks/network';
import { getIsFetching } from '../../ducks/users';

const AppWrapper = styled.div`
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonLogout = styled.button`
  cursor: pointer;
  transition: 0.5s;
  margin-bottom: 3rem;

  &:hover {
    filter: brightness(80%);
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

class AppRouter extends PureComponent {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const {
      isAuthorized,
      isError,
      errorNetworkMessage,
      isFetching
    } = this.props;

    return (
      <AppWrapper className="app">
        {isError ? (
          <ErrorMessage className="error-message">
            {errorNetworkMessage}
          </ErrorMessage>
        ) : null}
        {isAuthorized &&
          !isFetching && (
            <ButtonLogout onClick={this.handleLogout}>Logout</ButtonLogout>
          )}
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/users/me" component={UserPage} />
          <PrivateRoute path="/users/:name" component={UserPage} />
          <Redirect to="/users/me" />
        </Switch>
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isAuthorized: getIsAuthorized(state),
  isError: getIsError(state),
  errorNetworkMessage: getIsNetworkErrorPresent(state),
  isFetching: getIsFetching(state)
});

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AppRouter)
);
