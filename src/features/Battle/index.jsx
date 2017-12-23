import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchBattle,
  declareBattle,
  fetchUserBattleList
} from './actions/index';

class Battle extends PureComponent {
  static propTypes = {
    fetchBattle: PropTypes.func,
    declareBattle: PropTypes.func,
    fetchUserBattleList: PropTypes.func,
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
    const { battle: { currentBattle, userBattleList } } = this.props;
    if (!currentBattle)
      return (
        <div>
          <BattleList list={userBattleList} />
        </div>
      );
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

class BattleList extends PureComponent {
  constructor(props) {
    super(props);
    this.renderListItems = this.renderListItems.bind(this);
  }

  renderListItems() {
    const { list = [] } = this.props;
    return list.map(item => (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.wins}</td>
        <td>{item.losses}</td>
        <td>{(item.wins / (item.wins + item.losses) || 0).toFixed(2)}</td>
      </tr>
    ));
  }

  render() {
    return (
      <table>
        <tbody>{this.renderListItems()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  battle: state.battle
});

export default connect(mapStateToProps, {
  fetchBattle,
  declareBattle,
  fetchUserBattleList
})(Battle);
