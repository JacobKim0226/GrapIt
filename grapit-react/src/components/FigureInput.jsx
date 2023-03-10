import { useState } from 'react';
import { Form } from 'react-bootstrap';
import LineInputGroup from './inputs/LineInputGroup';
import PlaneInputGroup from './inputs/PlaneInputGroup';
import PlatonicSolidInputGroup from './inputs/PlatonicSolidInputGroup';
import SphereInputGroup from './inputs/SphereInputGroup';
import { translate } from './translate';

function FigureInput(props) {
  // TODO Redux
  const handleSelect = e => {
    props.setFigureType(e.target.value);
  };

  return (
    <div style={{ padding: '0px' }}>
      <Form>
        <Form.Group>
          <Form.Select
            className="mb-2"
            as="select"
            style={{ height: '2.8rem', fontSize: '1.2rem', fontWeight: 'bold' }}
            onChange={handleSelect}
          >
            {['twoPointedLine', 'plane']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['cylinder', 'cone', 'truncatedCone']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['prism', 'pyramid', 'frustum']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
            <option disabled style={{ fontWeight: 'bold' }}>
              --------------------
            </option>
            {['sphere', 'platonicSolid']
              .map(x => [x, x === props.figureType])
              .map(ResolveOptionRow)}
          </Form.Select>
        </Form.Group>
      </Form>
      <ResolveInputGroup
        figureType={props.figureType}
        sendObjectInfo={props.sendObjectInfo}
      />
    </div>
  );
}

function ResolveOptionRow([type, selected], i) {
  return (
    <option
      key={i}
      style={{ fontWeight: 'bold' }}
      value={type}
      selected={selected}
    >
      {translate(type)}
    </option>
  );
}

function ResolveInputGroup({ figureType, sendObjectInfo }) {
  switch (figureType) {
    case 'twoPointedLine':
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
    case 'sphere':
      return <SphereInputGroup sendObjectInfo={sendObjectInfo} />;
    case 'platonicSolid':
      return <PlatonicSolidInputGroup sendObjectInfo={sendObjectInfo} />;
    case 'plane':
      return <PlaneInputGroup sendObjectInfo={sendObjectInfo} />;
    default:
      return <LineInputGroup sendObjectInfo={sendObjectInfo} />;
  }
}

export default FigureInput;
