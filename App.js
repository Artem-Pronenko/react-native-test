import * as React from 'react';
import {Text, StyleSheet, View, Button, TouchableOpacity} from 'react-native';

const Square = ({onPress, value}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={style.square}>
      <Text style={style.textButton}>{value}</Text>
    </TouchableOpacity>
  );
};

const Board = ({squares, onPress}) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onPress={() => onPress(i)}/>;
  };

  return (
    <View>
      <Text>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </Text>
      <Text>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </Text>
      <Text>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Text>
    </View>
  );
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Перейти к ходу #' + move : 'К началу игры';
      return (
        <View key={move} style={style.buttonJump}>
          <Button onPress={() => this.jumpTo(move)} title={desc}/>
        </View>
      );
    });

    let status;
    if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <View style={style.game}>
        <View>
          <Board
            squares={current.squares}
            onPress={(i) => this.handleClick(i)}
          />
        </View>
        <View style={style.gameInfo}>
          <Text>{status}</Text>
          <View>{moves}</View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  game: {
    display: 'flex',
    flexDirection: 'row',
  },
  gameInfo: {
    marginLeft: 20,
  },
  square: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#999',
    lineHeight: 34,
    height: 34,
    marginRight: -1,
    marginTop: -1,
    padding: 0,
    width: 34,
  },
  textButton: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonJump: {
    marginBottom: 10,
  },
});

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
