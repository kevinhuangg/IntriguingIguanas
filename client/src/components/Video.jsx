import React from 'react'
import webrtc from 'webrtc-adapter'
import io from 'socket.io-client'

const videoOptions = {
  height: { ideal: 250 },
  width: { ideal: 300 }
}

class VideoChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      constraints: {
        audio: false,
        video: videoOptions
      },
      err: null,
      peerStream: null,
      myVideo: null,
      displayVideo: false
    }
    this.startVideoCall = this.startVideoCall.bind(this)
    this.startMyStream = this.startMyStream.bind(this)
    this.sendMyStream = this.sendMyStream.bind(this)
    this.receiveRemoteStream = this.receiveRemoteStream.bind(this)

    this.props.socket.on('initiate-peer-video', stream => {
      this.receiveRemoteStream(stream)
    })
  }

  componentDidMount() {
  }


  startMyStream(stream) {
    // return navigator.mediaDevices.getUserMedia(this.state.constrants)
    //   .then(this.sendMyStream)
    //   .catch(err => {
    //     this.setState({err: err})
    //   })
    this.setState({
      myVideo: window.URL.createObjectURL(stream)
    })
  }

  sendMyStream(stream) {
    this.props.socket.emit('start-video-chat', this.state.myVideo)
  }

  receiveRemoteStream(stream) {
    this.setState({
      peerStream: stream,
    })
  }

  startVideoCall() {
    return navigator.mediaDevices.getUserMedia(this.state.constraints)
      .then(this.startMyStream)
      .then(this.sendMyStream)
      .catch(err => {
        this.setState({err: err})
      })
  }

  render() {
    return (
      <div>
        {this.state.myVideo &&
        <video id='myVideo' src={ this.state.myVideo } autoPlay></video> }
        { this.state.peerStream &&
        <video id='peerVideo' src={ this.state.peerStream } autoPlay></video> }
        <button onClick={ this.startVideoCall }>
          Call Team
        </button>
      </div>
    )
  }
}

export default VideoChat