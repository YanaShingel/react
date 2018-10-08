import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Spinner from 'react-svg-spinner';
import {
  fetchFollowersRequest,
  getFollowersData,
  getFollowersIsFetching
} from '../../ducks/followers';

const FollowersWrapper = styled.div`
  text-align: center;
`;

const FollowersUl = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const FollowerLi = styled.li`
  padding: 1rem 2rem;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
`;

const LinkFollowerDiv = styled.div`
  display: inline-block;
  padding-top: 1rem;
`;

const FollowerAvatarImg = styled.img`
  width: 7rem;
  height: 7rem;
`;

const AvatarWrapper = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: rgb(255, 255, 255);
`;

class Followers extends PureComponent {
  componentDidMount() {
    this.props.fetchFollowersRequest(this.props.login);
  }

  render() {
    const { isFetching, ids } = this.props;
    if (isFetching) {
      return <Spinner size="64px" color="fuchsia" gap={5} />;
    }
    return (
      <FollowersWrapper>
        <FollowersUl>
          {ids.map((follower, i) => (
            <FollowerLi key={follower.id}>
              <AvatarWrapper>
                <FollowerAvatarImg
                  className="follower-avatar"
                  src={follower.avatar_url}
                  alt={follower.login}
                />
              </AvatarWrapper>
              <LinkFollowerDiv>
                <Link to={`/users/${follower.login}`}>{follower.login}</Link>
              </LinkFollowerDiv>
            </FollowerLi>
          ))}
        </FollowersUl>
      </FollowersWrapper>
    );
  }
}

const mapStateToProps = state => ({
  isFetching: getFollowersIsFetching(state),
  ids: getFollowersData(state)
});

const mapDispatchToProps = { fetchFollowersRequest };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Followers);
