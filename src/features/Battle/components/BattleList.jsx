import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class BattleList extends PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        wins: PropTypes.number,
        losses: PropTypes.number
      })
    )
  };

  static defaultProps = {
    list: []
  };

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

export default BattleList;
