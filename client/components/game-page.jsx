import React from 'react'
import { render, constructor, componentDidMount, getInitialState } from 'react-dom'
import { connect } from 'react-redux';
import { Link } from 'react-router'
import { requestGame } from '../db_actions/actions'
import { requestKittens } from '../db_actions/actions'
import { getGamePls } from '../db_actions/actions'

export default class GamePage extends React.Component {
  constructor(props) {
    super(props);
    console.log('GamePage#Constructor.gameID: '+this.props.params.gameID);
  }
  componentWillMount() {
    this.setState({data: null});
    this.serverRequest = $.get('/api/games/'+this.props.params.gameID, function (result) {
      this.setState({
        data: result
      });
    }.bind(this));

  }
  componentWillUnmount() {
    this.serverRequest.abort();
  }
  render() {
    if (this.state.data === null) {
      return (<div><h1>Loading data</h1></div>)
    }
    else {
      let game = this.state.data[0];
      return (
        <div className="fluid-container">
          <div className="game-stats">
            <h2>Title: {game.name}</h2>
            <h2>Genre: {game.genres[0]}</h2>
            <h2>Console: {game.platforms[0]}</h2>
            <h2>Developer: <Link to="companies/"></Link></h2>
            <h2>Rating: {game.rating}</h2>
            <h2>Release: <Link to={"years/"+game.year}>{game.year ? game.year : 'N/A'}</Link></h2>
          </div>
        </div>
      );
    }
  }
}
//function mapStateToProps(state) {
//  return {
//    data: state.nah
//  };
//}
//function mapDispatchToProps(dispatch) {
//  return {
//    stuff: function(game_id) {
//      return dispatch(getGamePls(game_id))
//    }
//  }
//}

//export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
