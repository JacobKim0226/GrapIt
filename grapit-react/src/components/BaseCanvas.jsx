import { Col, Container, Row } from 'react-bootstrap';
import { DataPusher } from '../DataPusher';

import CardBox from './CardBox';
import FigureInput from './FigureInput';
import ThreeDimensionCanvas from './ThreeDimensionCanvas';

function BaseCanvas() {
  return (
    <Container fluid>
      <DataPusher />
      <Row>
        <Col className="" lg={9}>
          <ThreeDimensionCanvas />
        </Col>
        <Col
          className=""
          lg={3}
          style={{ backgroundColor: '#CCCCCC', height: '90vh' }}
        >
          <Row style={{ height: '40%' }}>
            <FigureInput />
          </Row>
          <Row style={{ height: '60%' }}>
            <CardBox />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default BaseCanvas;
