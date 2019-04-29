import React from 'react';
import { NavBar, InputItem, Button, TextareaItem } from 'antd-mobile';
import { Redirect } from 'react-router-dom';
import { connect }  from 'react-redux';
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { update } from '../../redux/user.redux';

@connect(state=>state.user, {update})
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
    };
  }

  handleChange (key, value) {
    this.setState({
      [key]: value
    });
  }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect  &&  redirect !== path ? <Redirect to={redirect} /> : null }
        <NavBar mode='dark'>牛人完善信息</NavBar>
        <AvatarSelector selectAvatar={(imgName) => {
          this.setState({
            avatar: imgName
          })
        }}
        />
        <InputItem onChange={v=>this.handleChange('title', v)}>求职岗位</InputItem>
        <TextareaItem onChange={v=>this.handleChange('desc', v)}
        row={3}
        autoHeight
        title='个人简介' />
        <Button type='primary' onClick={()=>this.props.update(this.state)}>保存</Button>
      </div>
    )
  }
}

export default GeniusInfo;
