import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
// import styled from 'styled-components';
import {
  fetchTokenOwnerRequest,
  fetchUserRequest,
  getIsFetching,
  getUserData
} from 'ducks/users';
import Followers from '../Followers';
import Spinner from 'react-svg-spinner';
import './User.css';

class UserPage extends PureComponent {
  componentDidMount() {
    const {
      fetchTokenOwnerRequest,
      fetchUserRequest,
      match: {
        params: { name }
      },
      userData
    } = this.props;

    if (!name) fetchTokenOwnerRequest();
    if (name && !userData) fetchUserRequest();
  }

  componentDidUpdate(prevProps) {
    const {
      fetchTokenOwnerRequest,
      fetchUserRequest,
      match: {
        params: { name }
      }
    } = this.props;

    if (name !== prevProps.match.params.name) {
      if (!name) {
        fetchTokenOwnerRequest();
      } else {
        fetchUserRequest(name);
      }
    }
  }

  render() {
    const { isFetching, userData } = this.props;

    if (isFetching) {
      return (
        <Spinner className="spinner" size="64px" color="fuchsia" gap={5} />
      );
    }

    if (!isFetching && !userData) {
      return (
        <div className="user__notfound">Такой пользователь отсутствует</div>
      );
    }

    const { avatar_url, login, followers, public_repos } = userData;

    return (
      <div>
        <div className="user-wrapper">
          <div className="user-info">
            <div className="user-avatar">
              <img className="user__image" src={avatar_url} alt={login} />
            </div>
            <div className="user-desription">
              <h3>{login}</h3>
              <p>Followers: {followers}</p>
              <p>Public repos: {public_repos}</p>
            </div>
          </div>
        </div>
        <Followers login={login} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getIsFetching(state),
  userData: getUserData(state)
});

const mapDispatchToProps = {
  fetchUserRequest,
  fetchTokenOwnerRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
