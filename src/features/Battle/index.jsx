import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BattleList from './components/BattleList';
import {
  fetchBattle,
  declareBattle,
  fetchUserBattleList
} from './actions/index';

class Battle extends PureComponent {
  static propTypes = {
    fetchBattle: PropTypes.func.isRequired,
    declareBattle: PropTypes.func.isRequired,
    fetchUserBattleList: PropTypes.func.isRequired,
    battle: PropTypes.shape({
      currentBattle: PropTypes.array
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.handleContestantClick = this.handleContestantClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchBattle(1).then(() => this.props.fetchUserBattleList(1));
  }
  handleContestantClick(index, oppIndex) {
    const {
      battle: { currentBattle },
      declareBattle,
      fetchBattle,
      fetchUserBattleList
    } = this.props;

    declareBattle(1, currentBattle[index].id, currentBattle[oppIndex].id)
      .then(() => fetchBattle(1))
      .then(() => fetchUserBattleList(1));
  }
  render() {
    const {
      battle: { currentBattle, userBattleList }
    } = this.props;
    if (!currentBattle) {
      return (
        <div>
          <BattleList list={userBattleList} />
        </div>
      );
    }
    return (
      <div>
        <Contestant
          name={currentBattle[0].name}
          index={0}
          oppIndex={1}
          onClick={this.handleContestantClick}
        />
        <Contestant
          name={currentBattle[1].name}
          index={1}
          oppIndex={0}
          onClick={this.handleContestantClick}
        />
        <BattleList list={userBattleList} />
      </div>
    );
  }
}

const Contestant = ({ name, index, oppIndex, onClick }) => {
  const handleClick = () => onClick(index, oppIndex);
  return (
    <div style={{ cursor: 'pointer', color: 'blue' }} onClick={handleClick}>
      {name}
    </div>
  );
};

const mapStateToProps = state => ({
  battle: state.battle
});

export default connect(mapStateToProps, {
  fetchBattle,
  declareBattle,
  fetchUserBattleList
})(Battle);
