import { useEffect, useState, ReactDOM, useRef, useLayoutEffect } from 'react';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../css/Rtcchat.css';
import '../css/Canvas.css';
import Canvas from '../components/Canvas';
import { TwoDGraph } from './graph/TwoDGraph';
import SockJs from 'sockjs-client';
import { useOthers, useUpdateMyPresence } from '../config/liveblocks.config';
import Cursor from '../components/Cursor';
import Vidu from './vidu/Vidu';
import ThreeDimensionCanvas from '../components/ThreeDimensionCanvas';
import CoordTypeSelector from '../components/CoordTypeSelector';
import ThreeDimensionSideBar from '../components/ThreeDimensionSideBar';
import TwoDimensionSideBar from '../components/2D/TwoDimensionSideBar';

var stompClient = null;

function RtcChat({ chat }) {
  const [ratio, setRatio] = useState(1);

  const [graphColor, setGraphColor] = useState('#ffffff');
  const [graphType, setGraphType] = useState('Line');

  // todo 변수명 변경
  const [formulaFirst, setFormulaFirst] = useState('');
  const [formulaSecond, setFormulaSecond] = useState('');
  const [formulaThird, setFormulaThird] = useState('');

  // viewPoint 초기값
  const [viewPointX, setViewPointX] = useState([-7, 7]);
  const [viewPointY, setViewPointY] = useState([-7, 7]);

  // graphInfo : 그래프 정보(graphColor, graphType, ...)를 담는 배열
  // graphList : graphInfo를 담는 배열
  const [graphInfo, setGraphInfo] = useState([]);
  const [graphList, setGraphList] = useState([]);

  const [drawInfo, setDrawInfo] = useState();

  const [coordType, setCoordType] = useState('2D');

  const dispatch = useDispatch();
  const isWhiteBoard = useSelector(state => state.isWhiteBoard);

  const commonCanvasStyle = {
    height: '100%',
    width: '100%',
    position: 'absolute',
  };

  const graphStyle = {
    ...commonCanvasStyle,
    pointerEvents: isWhiteBoard.isSelected ? 'none' : 'auto',
    zIndex: 10,
  };
  console.log(graphStyle);

  const whiteBoardStyle = {
    ...commonCanvasStyle,
    // pointerEvents: isWhiteBoard.isSelected ? 'auto' : 'none',
  };

  const mainParent = useRef();
  const [childWidth, setChildWidth] = useState();
  const [childHeight, setChildHeight] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setChildWidth(mainParent.current.clientWidth);
    setChildHeight(mainParent.current.clientHeight);
    setIsLoaded(true);
    // canvasParent.current.appendChild(canvas);
  }, []);

  const tempRef = useRef();
  const [containerInfo, setContainerInfo] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  const updateMyPresence = useUpdateMyPresence();
  const userOther = useOthers();

  const user = useSelector(state => state.user);

  // window.addEventListener('resize', () => {
  //   setContainerInfo([window.innerWidth, window.innerHeight]);
  //   // setChildWidth(mainParent.current.clientWidth);
  //   // setChildHeight(mainParent.current.clientHeight);
  // });
  window.addEventListener('orientationchange', () => {
    setContainerInfo([window.innerWidth, window.innerHeight]);
  });

  // 동기화 소켓 통신
  const Stomp = require('stompjs/lib/stomp.js').Stomp;

  useEffect(() => {
    const sock = new SockJs('/sock/ws-stomp');
    console.log('☠️');
    stompClient = Stomp.over(sock);
    stompClient.debug = null;
    stompClient.connect({}, () => {
      stompClient.subscribe(
        '/sock/sub/chat/room/' + chat.roomId,
        rerenderGraph,
      );
    });
  }, []);

  // const camera = useSelector(state => state.camera.camera);
  // console.log(camera.camera)
  // console.log('!')

  function sendObjectInfo(objectType, object) {
    if (stompClient) {
      stompClient.debug = null;
      stompClient.send(
        '/sock/pub/chat/sendMessage',
        {},
        JSON.stringify({
          roomId: chat.roomId,
          sender: user.nickName,
          message: object,
          type: objectType,
        }),
      );
    }
  }

  // sendGraphInfo()
  function rerenderGraph(payload) {
    const newMessage = JSON.parse(payload.body);

    if (newMessage.sender !== user.nickName) {
      if (newMessage.type === 'RATIO') {
        setRatio(Number(newMessage.message));
      } else if (newMessage.type === 'PAINT') {
        console.log('🖌🖌🖌🖌🖌🖌🖌🖌');
        console.log(JSON.parse(newMessage.message));
        setDrawInfo(JSON.parse(newMessage.message));
      } else if (newMessage.type === 'GRAPH') {
        const receivedGraphInfo = JSON.parse(newMessage.message);

        if (receivedGraphInfo.length === 0) {
          setGraphList([]);
        }
        if (newMessage.message !== JSON.stringify(graphList)) {
          setGraphList(receivedGraphInfo);
        }
      }
    }
  }

  //=====================================================

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      // Do something when the Enter key is pressed
    }
  };

  const handler = event => {
    event.preventDefault();
  };

  const scrollHandler = event => {
    event.preventDefault();
    console.log('스크롤링 ');
    console.log(event);
  };

  return (
    <>
      <Container
        fluid
        style={{ height: '100%' }}
        // ref={tempRef}
        onPointerMove={e => {
          updateMyPresence({
            cursor: { x: e.clientX, y: e.clientY },
            screenInfo: { width: containerInfo[0], height: containerInfo[1] },
          });
        }}
        onPointerLeave={() =>
          updateMyPresence({ cursor: null, screenInfo: null })
        }
      >
        {userOther.map(
          // todo 함수 분리
          ({ connectionId, presence }) =>
            presence.cursor ? (
              <Cursor
                key={connectionId}
                name={presence.userInfo.name}
                color={presence.userInfo.color}
                x={
                  presence.cursor.x *
                  (window.innerWidth / presence.screenInfo.width)
                }
                y={
                  presence.cursor.y *
                  (window.innerHeight / presence.screenInfo.height)
                }
              />
            ) : null,
        )}
        <Row style={{ height: '100%' }}>
          <Col xs={9} className="">
            <div
              ref={mainParent}
              style={{ height: '100%', width: '100%', position: 'relative' }}
            >
              <div
                style={{ position: 'absolute', bottom: '0px', zIndex: '995' }}
              ></div>

              {coordType === '2D' ? (
                <div style={graphStyle}>
                  {isLoaded ? (
                    <TwoDGraph
                      graphList={graphList}
                      viewPointX={viewPointX}
                      viewPointY={viewPointY}
                      ratio={ratio}
                      setRatio={setRatio}
                      sendObjectInfo={sendObjectInfo}
                      childWidth={childWidth}
                      childHeight={childHeight}
                    />
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                <div style={graphStyle}>
                  <ThreeDimensionCanvas />
                  {/*<DataPusher />*/}
                </div>
              )}

              <div style={whiteBoardStyle}>
                {isLoaded ? (
                  <Canvas
                    childWidth={childWidth}
                    childHeight={childHeight}
                    sendPaintInfo={sendObjectInfo}
                    drawInfo={drawInfo}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col xs={3} style={{ background: '' }} className="">
            <CoordTypeSelector
              coordType={coordType}
              setCoordType={setCoordType}
            />

            <Row>
              {coordType === '2D' ? (
                <TwoDimensionSideBar
                  graphType={graphType}
                  setGraphType={setGraphType}
                  setGraphColor={setGraphColor}
                  graphColor={graphColor}
                  formulaFirst={formulaFirst}
                  setFormulaFirst={setFormulaFirst}
                  formulaSecond={formulaSecond}
                  setFormulaSecond={setFormulaSecond}
                  formulaThird={formulaThird}
                  setFormulaThird={setFormulaThird}
                  graphInfo={graphInfo}
                  setGraphInfo={setGraphInfo}
                  graphList={graphList}
                  setGraphList={setGraphList}
                  viewPointX={viewPointX}
                  setViewPointX={setViewPointX}
                  viewPointY={viewPointY}
                  setViewPointY={setViewPointY}
                  sendObjectInfo={sendObjectInfo}
                />
              ) : (
                <ThreeDimensionSideBar />
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      {/* <Vidu user={user} chat={chat} /> */}
    </>
  );
}

export default RtcChat;
