import { Row } from 'react-bootstrap';
import ThreeCardBox from './ThreeCardBox';
import FigureInput from './FigureInput';

export default function ThreeDimensionSideBar(props) {
  return (
    <Row>
      <Row style={{ height: '40vh', backgroundColor: '' }}>
        <FigureInput />
      </Row>
      <Row
        style={{
          height: '45vh',
          backgroundColor: '#eeeeee',
        }}
      >
        <ThreeCardBox />
      </Row>
    </Row>
  );
}