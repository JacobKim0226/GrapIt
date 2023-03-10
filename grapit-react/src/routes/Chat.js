import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

import styled from 'styled-components';
import SockJs from 'sockjs-client';
import { useSelector } from 'react-redux';
import '../css/chat.css';
import { TwoDGraph } from './graph/TwoDGraph';

var Stomp = require('stompjs/lib/stomp.js').Stomp;

let ChatInput = styled(InputGroup)`
  //position: fixed;
  bottom: 0;
`;
var stompClient = null;
let canvasPoints = null;

function Chat({ chat }) {
  let [contents, setContents] = useState([]);
  let [messageInput, setMessageInput] = useState('');

  let user = useSelector(state => state.user);

  useEffect(() => {
    var sock = new SockJs('/sock/ws-stomp');
    console.log('new sockjs');
    console.log(sock);
    stompClient = Stomp.over(sock);
    console.log('new stompClient');
    console.log(stompClient);

    stompClient.connect({}, () => {
      stompClient.subscribe(
        '/sock/sub/chat/room/' + chat.roomId,
        onMessageReceived,
      );
    });

    console.log(stompClient.connected);
    // if(stompClient.connected) {
    //     console.log("stompClient connected!!!");
    //     stompClient.send("/pub/chat/enterUser", {},
    //         JSON.stringify({
    //             roomId: chat.roomId,
    //             sender: user.nickName,
    //             type: 'ENTER'
    //         })
    //     )
    // }
  }, []);

  function onMessageReceived(payload) {
    let newMessage = JSON.parse(payload.body);
    setContents(contents => [...contents, newMessage]);
  }

  function sendMessage() {
    if (stompClient) {
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: chat.roomId,
          sender: user.nickName,
          message: messageInput,
          type: 'TALK',
        }),
      );
    }
    setMessageInput('');
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Do something when the Enter key is pressed
      sendMessage();
    }
  };

  return (
    <Container style={{ height: '100vh' }}>
      <Row>
        <Col xs={4} style={{ height: 'auto' }} className="mt-5 div-shadow">
          <div>
            <Row xs={8} className="mt-3">
              <Col style={{ overflowX: 'auto' }} xs={8}>
                <h4>{chat.roomName} ??????</h4>
              </Col>
              <Col xs={4}>
                <Button>1:1 ??????</Button>
              </Col>
            </Row>
            <div style={{ height: '70vh', overflowY: 'auto' }}>
              {contents.map(message => (
                <Message message={message} />
              ))}
            </div>
            <ChatInput>
              <InputGroup className="mb-3">
                <Form.Control
                  onKeyDown={handleKeyDown}
                  onChange={function (e) {
                    setMessageInput(e.target.value);
                  }}
                  placeholder="???????????? ???????????????"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={messageInput}
                />
                <Button
                  onClick={() => sendMessage()}
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  ??????
                </Button>
              </InputGroup>
            </ChatInput>
          </div>
        </Col>
        <Col xs={8} className="mt-5">
          <div style={{ height: '70%', display: 'flex' }}>
            {
              // TwoDGraph(chat.roomId, stompClient, canvasPoints)
            }
          </div>
          <div
            style={{ height: '30%', overflow: 'auto' }}
            className="div-shadow"
          >
            <Button>??? ?????????</Button>
            <Button>?????? ?????????</Button>
            <Button>??? ?????????</Button>
            <Button>2?????? ????????? ?????????</Button>
            {/*<canvas ref={canvasRef}  width={400} height={400}></canvas>*/}
          </div>
        </Col>
      </Row>
    </Container>
  );

  //canvas
}

function Message({ message }) {
  let user = useSelector(state => state.user);

  if (user.nickName == message.sender) {
    return (
      <div className="mine messages">
        <div className="mine message">{message.message}</div>
      </div>
    );
  } else {
    return (
      <div className="yours messages">
        <div className="message">{message.message}</div>
      </div>
    );
  }
}

export default Chat;
