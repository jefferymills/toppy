import React, { PureComponent } from 'react';
import { fetchBattle, declareBattle } from './actions/index';
import { connect } from 'react-redux';

class Battle extends PureComponent {
  constructor(props) {
    super(props);
    this._handleContestantClick = this._handleContestantClick.bind(this);
  }
  componentDidMount() {
    this.props.fetchBattle(1);
  }
  _handleContestantClick(index, oppIndex) {
    const {
      battle: { currentBattle },
      declareBattle,
      fetchBattle
    } = this.props;
    declareBattle(1, currentBattle[index].id, currentBattle[oppIndex].id).then(
      () => fetchBattle(1)
    );
  }
  render() {
    const { battle: { currentBattle } } = this.props;
    if (!currentBattle) return null;
    return (
      <div>
        <Contestant
          name={currentBattle[0].name}
          index={0}
          oppIndex={1}
          onClick={this._handleContestantClick}
        />
        <Contestant
          name={currentBattle[1].name}
          index={1}
          oppIndex={0}
          onClick={this._handleContestantClick}
        />
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
  declareBattle
})(Battle);
