import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setFigure } from '../store/figureSlice';
import { translate } from './translate';
import * as Icon from 'react-bootstrap-icons';

export default function ThreeCardBox() {
  const figureStore = useSelector(state => state.figure.figures);

  const dispatch = useDispatch();

  return (
    <Stack
      gap={2}
      style={{
        backgroundColor: 'whitesmoke',
        height: '45vh',
        overflowY: 'scroll',
      }}
    >
      {figureStore.map(x => [x, dispatch]).map(makeCard)}
    </Stack>
  );
}

function makeCard([figure, dispatch], i) {
  const headerColor = '#' + figure.color.toString(16);

  const onCardClick = () => {
    dispatch(setFigure.transparentFigure(figure.figureId));
  };

  const onCardMouseDown = () => {
    dispatch(setFigure.emphasizeFigure(figure.figureId));
  };

  const onCardMouseUp = () => {
    dispatch(setFigure.deemphasizeFigure(figure.figureId));
  };

  const onDelBtnClick = () => {
    dispatch(setFigure.removeFigure(figure.figureId));
  };

  return (
    <Card key={i}>
      <Card.Header
        className="d-flex justify-content-between"
        style={{
          fontWeight: 'bold',
          backgroundColor: headerColor,
          color: contrastColor(headerColor),
        }}
      >
        {translate(figure.type)}
        <Icon.X
          lg={2}
          color={contrastColor(headerColor)}
          size="25px"
          onClick={onDelBtnClick}
        />
      </Card.Header>
      <Card.Body className="pl-1 pr-1">
        <Row className="d-flex justify-content-between">
          <Col onMouseDown={onCardMouseDown} onMouseUp={onCardMouseUp}>
            {resolveInfo(figure)}
          </Col>
          {figure.type !== 'twoPointedLine' && (
            <Col lg={2} className="d-flex align-items-center">
              <Icon.EyeFill
                color={figure.transparent ? 'lightgray' : 'black'}
                size="30px"
                onClick={onCardClick}
              />
            </Col>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}

function resolveInfo(figure) {
  let info;
  if (figure.type === 'sphere') {
    info = SphereCardInfo(figure);
  } else if (figure.type === 'twoPointedLine') {
    info = TwoPointedLineCardInfo(figure);
  } else if (
    figure.type === 'tetrahedron' ||
    figure.type === 'cube' ||
    figure.type === 'octahedron' ||
    figure.type === 'dodecahedron' ||
    figure.type === 'icosahedron'
  ) {
    info = PlatonicSolidCardInfo(figure);
  }

  return <Card.Text>{info}</Card.Text>;
}

function contrastColor(colorText) {
  const color = parseInt(colorText.substring(1), 16); // convert rrggbb to decimal

  const r = (color >> 16) & 0xff;
  const g = (color >> 8) & 0xff;
  const b = color & 0xff;

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
}

function SphereCardInfo(figure) {
  const [x, y, z] = figure.position;

  return (
    <Card.Text>
      {`반지름 ${figure.radius}`}
      <br />
      {`중심 x: ${x} y: ${y} z: ${z}`}
    </Card.Text>
  );
}

function TwoPointedLineCardInfo(figure) {
  return (
    <Card.Text>
      {`점1: ${figure.point1}`}
      <br />
      {`점2: ${figure.point2}`}
    </Card.Text>
  );
}

function PlatonicSolidCardInfo(figure) {
  const [x, y, z] = figure.position;

  return (
    <Card.Text>
      {`모서리의 길이 ${figure.length}`}
      <br />
      {`중심 x: ${x} y: ${y} z: ${z}`}
    </Card.Text>
  );
}
