/*import React from 'react';
import ReactDOM from 'react-dom';*/

var PLAYERS = [
  {
    name: 'Jim Hawkins',
    score: 31,
    id: 1,
  },
  {
    name: 'Andrew Chalkley',
    score: 35,
    id: 2,
  },
  {
    name: 'Alicia Cumputon',
    score: 42,
    id: 3,
  },
];
var nextId = 4;

var Stopwatch = React.createClass({
  getInitialState: function() {
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },
  
  componentDidMount: function() {
    this.interval = setInterval(this.onTick, 100);
  },
  
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  
  onTick: function() {
    if (this.state.running) {
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
    console.log('onTick');
  },
  
  onStart: function() {
    this.setState({ 
      running: true,
      previousTime: Date.now(),
    });
  },
  
  onStop: function() {
    this.setState({ running: false });
  },
  
  onReset: function() {
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    });
  },
  
  render: function() {
    var seconds = Math.floor(this.state.elapsedTime / 1000);
    return (
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        { this.state.running ? 
          <button onClick={this.onStop}>Stop</button> 
          : 
          <button onClick={this.onStart}>Start</button>
        } 
        <button onClick={this.onReset}>Reset</button>
      </div>
    );
  }
});
  
var AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  
  getInitialState: function() {
    return {
      name: "",
    };
  },
  
  onNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  
  onSubmit: function(e) {
    e.preventDefault();
  
    this.props.onAdd(this.state.name);
    this.setState({name: ""});
  },
  
  
  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.name} onChange={this.onNameChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    ); 
  }
});
  
function Stats(props) {
  var totalPlayers = props.players.length;
  var totalPoints = props.players.reduce(function(total, player){
    return total + player.score;
  }, 0);
  
  return (
    <table className="stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )  
}
  
Stats.propTypes = {
  players: React.PropTypes.array.isRequired,
};


function Header(props) {
  return (
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  );
}

Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

var Counter = React.createClass({
  propTypes: {},
  
  /*getInitialState method is what React looks for to set state*/
  getInitialState: function() {
    return {
      score: this.props.initialScore,
    }
  },

  incrementScore: function(e) {
    //call this.setState so react knows to rerender.
    this.setState({
      score: (this.state.score + 1)
    })
  },
  
  decrementScore: function(e) {
    this.setState({
      score: (this.state.score - 1)
    })
  },

  render: function() {
    return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {this.state.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
  }
});

/**
 * a stateless component for handling score
 * @param {[type]} props [description]
 */
function Counter(props) {
  return (
      <div className="counter">
        <button className="counter-action decrement" onClick={this.decrementScore}> - </button>
        <div className="counter-score"> {props.score} </div>
        <button className="counter-action increment" onClick={this.incrementScore}> + </button>
      </div>
    );
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired
}


function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        {props.name}
      </div>
      <div className="player-score">
        {/*in this case, player was passed in as props*/}
        <Counter initialScore={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
};

function Application(props) {
  return (
    <div className="scoreboard">
      <Header title={props.title} />
    
      <div className="players">
        {props.players.map(function(player) {
          return <Player name={player.name} score={player.score} key={player.id} />
        })}
      </div>
    </div>
  );
}

Application.propTypes = {
  title: React.PropTypes.string,
  players: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string.isRequired,
    score: React.PropTypes.number.isRequired,
    id: React.PropTypes.number.isRequired,
  })).isRequired,
};

Application.defaultProps = {
  title: 'Scoreboard',
}

ReactDOM.render(<Application players={PLAYERS}/>, document.getElementById('container'));