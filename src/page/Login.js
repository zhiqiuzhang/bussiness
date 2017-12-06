import React, {Component} from "react";
import { Link, Prompt } from "react-router-dom";
import { saveUser } from "../service/getUser";
import PropTypes from "prop-types";
import api from "../service/api";
import { Form, Icon, Input, Button, Spin, message, notification, Checkbox } from 'antd';
import "../css/login.css"
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  static propTypes={
    isFetching: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    error: PropTypes.bool,
    message: PropTypes.string,
  }
  state={
    captcha: "",
    formHasChanged: false
  }
 /* componentWillReceiveProps(nextProps){
    if(nextProps.user.username){
      this.props.histroy.push("/");

    }

  }*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       this.props.actions.loginChunk(values);

      }
    });
  }
  
getCaptcha() {
    api.captcha().then((data) => {
      console.log("cap", data);
      this.setState({
        captcha: data.captcha
      })
    })
  }
  componentDidMount(){
    this.getCaptcha();
  }
  render() {
    if(this.props.isFetching){
      return(
          <div className="loading">
            <Spin />
          </div>
        )

    }

    const {captcha, formHasChanged}=this.state;
    const { getFieldDecorator }=this.props.form;

    const capImg = (<img style={{height: 28, cursor: "pointer"}}
    onClick={() => this.getCaptcha()}
      src={ "data: image/jpg; base64," + captcha}
      alt="captcha"/>)
    
    return (
      <div className="login">
      <Prompt when={formHasChanged} message="Are you sure?"/>
      <Form onChange={()=>this.setState({formHasChanged: true})} 
      onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="姓名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
         <FormItem>
          {getFieldDecorator('captcha', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Input 
            addonBefore={<label>验证码</label>}
            addonAfter={capImg}
            placeholder="点击图片重新获取" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>请记住我</Checkbox>
          )}
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button" loading={this.props.isFetching}>
            登 录
          </Button>
          <a href="">
          <Link to="/signup">
          现在注册
          </Link>
          </a>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default Login;