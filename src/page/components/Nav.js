import React, { Component } from 'react';
import PropTypes from "prop-types";
import { getUser } from "../../service/getUser"
import { Layout, Menu, Icon, Button, Dropdown, message } from "antd";
import { Link } from "react-router-dom";
import "../../css/appnav.css"
const {Header}=Layout;
const { Item, SubMenu, MenuItemGroup }=Menu;

const theme ="dark"
const headerStyle={
  "dark": {background: "#101010", color: "#fff"},
  "light": {background: "#fff",color: "#212121"}
}

class AppNav extends Component {
  static headerStyle={
    username: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
  }
  state={
    current: "home"
  }
  handleClick(e){
    this.setState({
      current: e.key
    });
    }
  handleLogout(){
    this.props.actions.navLogout();
    window.location.href="/";
  }

  
  render() {
    const menu=(
        <Menu style={{textAlign: "center"}}>
          <Menu.Item key="user">
          <Link to="/user">用户中心</Link>
          </Menu.Item>
          <Menu.Item key="manage">
           <Link to="/manage">
            管理中心
           </Link>
           </Menu.Item>
           <Menu.Item key="order">
           <Link to="/order">
            个人订单
           </Link>
           </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="logout">
          <Button onClick={this.handleLogout.bind(this)}>退出登录</Button>
          </Menu.Item>

        </Menu>
      )
    return (
      <Layout className="appnav">
        <Header className="header" style={headerStyle[theme]}>
          <div className="logo">
            知秋
          </div>
        <Menu onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]} mode="horizontal"
        style={{ lineHeight: '63px', height: '63px', border: 'none'}}
        theme={theme}
        >
          <Item key="home">
            <Link to="/">
            <Icon type="home" />首页
            </Link>
          </Item>
          <Item key="productions">
            <Icon type="appstore" />产品列表
          </Item>
          <SubMenu key={"sport"} title={<span>运动装<Icon type="down" /></span>}>
            <Item key="male:Latest activities">最新活动</Item>
            <Item key="male:footwear">鞋类</Item>
            <Item key="male:clothes">服饰类</Item>
            <Item key="male:Annex class">附件类</Item>
          </SubMenu>

        </Menu>
        {
          this.props.username?
          <Dropdown overlay={menu}>
            <Button icon="user" className="user-btn">
              <span>{this.props.username}</span>
            </Button>
          </Dropdown>
          

          
            
          
          :
          <div className="user">
            <Link to="/login">
              <Button className="login-btn">登录</Button>
            </Link>
            <Link to="/signup">
              <Button ghost className="signup-btn" type="primary">注册</Button>
            </Link>
          </div>

        }
        
        </Header>
      </Layout>
    
    );
  }
}

export default AppNav;
