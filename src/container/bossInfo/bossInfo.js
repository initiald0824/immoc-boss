import React from 'react';
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from '../../component/avatar-selector/avatar-selector';

class BossInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      avatar: ''
    }
  }
  handleChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  render() {
    return (
      <div>
        <NavBar mode='dark'>Boss 完善信息</NavBar>
        <AvatarSelector selectAvatar={(imgName) => {
          this.setState({
            avatar: imgName
          })
        }} />
        <InputItem onChange={v => this.handleChange('title', v)}>
          招聘职位
        </InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>
          公司名称</InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>
          职位薪资</InputItem>
        <TextareaItem onChange={v => this.handleChange('desc', v)}
                      rows={3} autoHeight title="职位要求" />

        <Button type='primary'>保存</Button>
      </div>
    )
  }
}

export default BossInfo;
