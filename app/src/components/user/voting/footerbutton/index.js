/**
 * Created by Pororo on 17/5/14.
 */
import React, { Component } from 'react'
import { Col, Row, Button, Alert, message, Modal } from 'antd'
import './index.less'
import Share from '../../share'
function confirm () {
  message.info('Click on Yes.')
}

class FooterButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      is_vote: 0,
      visibleShare: false,
      visibleSubmit: false
    }
  }

  showSubmitModal = () => {
    this.setState({
      visibleSubmit: true,
    })
  }

  handleSubmitOk = (e) => {
    console.log(e)
    this.setState({
      visibleSubmit: false,
    })
  }
  handleSubmitCancel = (e) => {
    console.log(e)
    this.setState({
      visibleSubmit: false,
    })
  }

  showShareModal = () => {
    this.setState({
      visibleShare: true,
    })
  }

  handleShareOk = (e) => {
    console.log(e)
    this.setState({
      visibleShare: false,
    })
  }
  handleShareCancel = (e) => {
    console.log(e)
    this.setState({
      visibleShare: false,
    })
  }

  componentDidMount () {
    let vote = window.localStorage.getItem('is_vote') || '0'
    this.setState({
      is_vote: vote
    })
  }

  render () {
    return (
      <div className="footer-buttons">
        <div>
          <Row>
            <Col span={24}>
              <Alert message="您已选择" type="warning" />
            </Col>
          </Row>
          <Row >
            <Col span={12}>
              <Button size="large" style={{width: '95%'}} onClick={this.showSubmitModal}>确认投票</Button>
              <Modal
                title="确认提交"
                wrapClassName="vertical-center-modal"
                visible={this.state.visibleSubmit}
                onOk={this.handleSubmitOk}
                onCancel={this.handleSubmitCancel}
              />
            </Col>
            <Col span={12}>
              <Button size="large" style={{width: '95%'}} onClick={this.showShareModal}>
                分享
              </Button>
              <Modal
                title="分享"
                wrapClassName="vertical-center-modal"
                visibleShare={this.state.visibleShare}
                onOk={this.handleShareOk}
                onCancel={this.handleShareCancel}
              >
                <Share />
              </Modal>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={22} offset={1}>
            <Button size="large" style={{width: '100%'}}>
              返回查看更多投票
            </Button>
          </Col>
        </Row>
      </div>
    )
  }
}

export default FooterButton