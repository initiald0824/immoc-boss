import React from 'react';
import { connect } from 'react-redux';
import { addWeapon, removeWeapon, addWeaponAsync } from "./index.redux";

const mapStateToProps = (state) => {
  return {
    num: state.counter
  }
};
const mapActionToProps = {addWeapon, removeWeapon, addWeaponAsync};


@connect(mapStateToProps, mapActionToProps)
class App extends React.Component {
  render() {
    return (
      <div>
        <h1>现在有机枪{this.props.num}把</h1>
        <button onClick={this.props.addWeapon}>申请武器</button>
        <button onClick={this.props.removeWeapon}>回收武器</button>
        <button onClick={this.props.addWeaponAsync}>拖两天再给</button>
      </div>
    )
  }
}

export default App;
