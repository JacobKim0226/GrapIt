import { Row } from 'react-bootstrap';
import TwoDGraphInput from './TwoDGraphInput';
import { EquationHandBoard } from '../../routes/equationBoard/EquationHandBoard';
import TwoCardBox from './TwoCardBox';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GraphColorPicker from '../common/GraphColorPicker';

export default function TwoDimensionSideBar({
  viewPointX,
  viewPointY,
  sendObjectInfo,
}) {
  const inputColor = useSelector(state => state.TwoDInput.color);
  const [seeInput, setSeeInput] = useState(false);

  const isTouchDevice =
    navigator.maxTouchPoints || 'ontouchstart' in document.documentElement;

  const sidebarTopStyle = {
    height: isTouchDevice ? '45vh' : '30vh',
    justifyContent: 'center',
    margin: '0px',
    marginTop: '2.35%',
    padding: '10px',
    border: '1px solid #afafaf',
    borderWidth: '1px 1px 1px 1px',
    boxShadow: '0px 0px 5px 0px #afafaf',
    borderRadius: '10px',
  };

  const sidebarBottomStyle = {
    height: isTouchDevice ? '40vh' : '55vh',
    backgroundColor: '#eeeeee',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: '0px',
    padding: '0px',
  };

  // const is
  return (
    <Row
      style={{
        flexDirection: 'column',
        margin: '0px',
        paddingRight: '10%',
        paddingLeft: '10%',
      }}
    >
      <Row style={sidebarTopStyle}>
        {isTouchDevice && !seeInput ? (
          <div className="pt-3">
            <EquationHandBoard
              graphColor={inputColor}
              sendObjectInfo={sendObjectInfo}
            />
            <GraphColorPicker color={inputColor} type={'2D'} />
            <div className="flex justify-content-center">
              <mark
                onClick={() => {
                  setSeeInput(true);
                }}
              >
                👉입력이 잘 안되시나요?👈
              </mark>
            </div>
          </div>
        ) : (
          <TwoDGraphInput sendObjectInfo={sendObjectInfo} />
        )}
      </Row>
      <Row style={sidebarBottomStyle}>
        <TwoCardBox sendObjectInfo={sendObjectInfo} />
      </Row>
    </Row>
  );
}
