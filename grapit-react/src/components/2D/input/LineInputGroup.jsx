import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from 'three/src/math/MathUtils';
import { useInput } from '../../../hooks';
import { setTwoDFigure } from '../../../store/TwoDfigureSlice';
import { MathComponent } from 'mathjax-react';

export default function LineInputGroup(props) {
  const [firstProps, resetFirstProps] = useInput('');
  const [secondProps, resetSecondProps] = useInput('');
  const [colorProps, resetColor] = useInput('#ffffff');

  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();

    dispatch(
      setTwoDFigure.addFigure({
        figureId: generateUUID(),
        type: 'Line',
        color: parseInt('0x' + colorProps.value.slice(1)),
        firstProps: Number(firstProps.value),
        secondProps: Number(secondProps.value),
      }),
    );
    resetFirstProps();
    resetSecondProps();
    resetColor();
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className="flex justify-content-between p-0">
        <div className="col-1">
          <MathComponent tex="y = " />
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control {...firstProps} type="number" placeholder="" />
          </FormGroup>
        </div>
        <div className="col-1">
          <MathComponent tex="x + " />
        </div>
        <div className="col-3">
          <FormGroup>
            <Form.Control {...secondProps} type="number" placeholder="" />
          </FormGroup>
        </div>
      </div>
      <FormGroup>
        <Form.Label>색상</Form.Label>
        <Form.Control {...colorProps} type="color" />
      </FormGroup>
      <Button variant="primary" type="submit">
        생성
      </Button>
    </Form>
  );
}
