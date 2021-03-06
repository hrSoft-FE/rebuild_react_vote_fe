import React from 'react'
import './index.less'
import { Form, Input, Row, Col, Button, message } from 'antd'
const FormItem = Form.Item
import * as Request from '../../../../utils/request'
import API from '../../../../api'
import goto from '../../../../utils/goto'
import Regx from '../../../../utils/regx'
import eventProxy from '../../../../utils/eventProxy'
class change extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  componentDidMount () {
    this.setValue()
  }

  setValue () {
    const form = this.props.form
    const oldMobile = form.setFieldsValue({oldMobile: window.localStorage.getItem('mobile') || ''})
  }

  async userCaptcha () {
    const form = this.props.form
    const mobile = form.getFieldValue('mobile')
    const CHANGE_MOBILE = 4
    const body = {
      mobile: mobile,
      type: CHANGE_MOBILE
    }
    try {
      let data = await Request.post(API.verify, body)
      message.success(`your Captcha is ${data.code}`)
    } catch (e) {
      message.error(e)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const {oldMobile, mobile, password, captcha} = values
        const body = {
          oldMobile: oldMobile,
          newMobile: mobile,
          password: password,
          code: captcha
        }
        try {
          await Request.uput(API.changeMobile, body)
          message.success('修改手机号成功')
          eventProxy.trigger('loginStatus', false)
          window.localStorage.clear()
          setTimeout(() => {
            goto('/users/login')
          }, 2000)
        } catch (e) {
          message.error('信息手机号失败')
        }
      }
    })
  }

  render () {
    const {getFieldDecorator} = this.props.form

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="旧手机号码"
        >
          {getFieldDecorator('oldMobile', {
            rules: [{required: true, message: 'Please input your mobile number!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新手机号码"
        >
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'Please input your mobile number!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true,
              message: '请输入密码'
            }, {
              pattern: Regx.password, message: '请输入6到20位字符'
            }],
          })(
            <Input type="password" placeholder="请输入不少于6位字符" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="验证码"
        >
          <Row gutter={8}>
            <Col span={12}>
              {getFieldDecorator('captcha', {
                rules: [{required: true, message: 'Please input the captcha you got!'}],
              })(
                <Input size="large" />
              )}
            </Col>
            <Col span={12}>
              <Button size="large" onClick={() => this.userCaptcha()}>获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...tailFormItemLayout} className="change-mobile-form-item">
          <Button type="primary" htmlType="submit" size="large">确认修改</Button>
        </FormItem>
      </Form>
    )
  }
}

const changeMobile = Form.create()(change)

export default changeMobile