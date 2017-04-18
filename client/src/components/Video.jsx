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
        audio: true,
        video: videoOptions
      },
      err: null,
      peerStream: false
    }
    this.requestVideoFeed = this.requestVideoFeed.bind(this)
    this.requestPeerVideo = this.requestPeerVideo.bind(this)
  }

  componentDidMount() {
    this.requestVideoFeed()
    this.requestPeerVideo()
  }

  requestPeerVideo() {
    let peerVideo = document.getElementById('peerVideo')
    this.props.socket.on('initiate-peer-video', (stream) => {
      console.log("reached initiate-peer-video")
      peerVideo.srcObject = stream
      this.setState({
        peerStream: true
      })
    })
  }

  requestVideoFeed() {
    var context = this;
    let myVideo = document.getElementById('myVideo')

    navigator.mediaDevices.getUserMedia(this.state.constraints)
    .then(stream => {
      console.log(stream.getTracks(), "CLIENT STREAM")
      if ("srcObject" in myVideo) {
        myVideo.srcObject = stream;
      } else {
        myVideo.src = window.URL.createObjectURL(stream);
      }
      // myVideo.onloadmetadata = function(e) {
      //   myVideo.play();
      // }
        context.props.socket.emit('start-video-chat', stream)
    })
    .catch(err => {
      this.setState({err: err})
    })
  }
  render() {
    return (
      <div>
        <video id='myVideo' autoPlay></video>
        { this.state.peerVideo &&
          <video id='peerVideo' autoPlay></video> }
      </div>
    )
  }
}

export default VideoChat