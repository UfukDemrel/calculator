import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      firstOperand: null,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      firstOperand: null,
    });
  };

  performOperation = (nextOperator) => {
    const { displayValue, operator, firstOperand } = this.state;
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      this.setState({
        firstOperand: inputValue,
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const newValue = this.calculate(currentValue, inputValue, operator);

      this.setState({
        displayValue: String(newValue),
        waitingForOperand: true,
        firstOperand: newValue,
        operator: nextOperator,
      });
    }
  };

  calculate = (leftOperand, rightOperand, operator) => {
    switch (operator) {
      case '+':
        return leftOperand + rightOperand;
      case '-':
        return leftOperand - rightOperand;
      case '×':
        return leftOperand * rightOperand;
      case '÷':
        return leftOperand / rightOperand;
      default:
        return rightOperand;
    }
  };

  render() {
    const { displayValue } = this.state;

    return (
      <section className="calculadora">
        <input type="text" className="pantalla" value={displayValue} readOnly />
        <button className="tecla especial" onClick={this.clearDisplay}>AC</button>
        <button className="tecla especial">+/-</button>
        <button className="tecla especial">&#37;</button>
        <button className="tecla signo" onClick={() => this.performOperation('÷')}>&#247;</button>
        <button className="tecla numero" onClick={() => this.inputDigit(7)}>7</button>
        <button className="tecla numero" onClick={() => this.inputDigit(8)}>8</button>
        <button className="tecla numero" onClick={() => this.inputDigit(9)}>9</button>
        <button className="tecla signo" onClick={() => this.performOperation('×')}>&#215;</button>
        <button className="tecla numero" onClick={() => this.inputDigit(4)}>4</button>
        <button className="tecla numero" onClick={() => this.inputDigit(5)}>5</button>
        <button className="tecla numero" onClick={() => this.inputDigit(6)}>6</button>
        <button className="tecla signo" onClick={() => this.performOperation('-')}>&#8722;</button>
        <button className="tecla numero" onClick={() => this.inputDigit(1)}>1</button>
        <button className="tecla numero" onClick={() => this.inputDigit(2)}>2</button>
        <button className="tecla numero" onClick={() => this.inputDigit(3)}>3</button>
        <button className="tecla signo" onClick={() => this.performOperation('+')}>&#43;</button>
        <button className="tecla cero" onClick={() => this.inputDigit(0)}>0</button>
        <button className="tecla numero" onClick={this.inputDecimal}>,</button>
        <button className="tecla signo" onClick={() => this.performOperation('=')}>&#61;</button>
      </section>
    );
  }
}

export default Calculator;
