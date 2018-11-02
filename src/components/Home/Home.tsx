import * as React from 'react';

import LeftSidebar from '../LeftSidebar';
import CanvasView from '../CanvasView';
import RightSidebar from '../RightSidebar';
import { calcShapeValues } from '../../util/shapes';
import { OrderState } from '../../types/order';
import { ShapesState } from '../../types/shapes';
import { EditorState } from '../../types/editor';

import { HomeDiv } from './styles';
import { Dispatch } from '../../actions';
import { setShapeValues } from '../../actions/shapes';

interface HomeProps {
  order: OrderState;
  shapes: ShapesState;
  editor: EditorState;
  dispatch: Dispatch;
}

export default class Home extends React.Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
    this.initShapeValues();
  }

  private initShapeValues = () => {
    const { order, shapes, editor } = this.props;
    const promises = order.map(
      (shapeID: string): Promise<{ [key: string]: number[] }> =>
        calcShapeValues(shapes[shapeID], editor.numFrames, () => {})
    );
    Promise.all(promises)
      .then((shapePropValues: Array<{ [key: string]: number[] }>) => {
        for (let i = 0; i < shapePropValues.length; i++) {
          this.props.dispatch(setShapeValues(order[i], shapePropValues[i]));
        }
      });
  };

  public render() {
    return (
      <HomeDiv>
        <LeftSidebar />
        <CanvasView />
        <RightSidebar />
      </HomeDiv>
    );
  }
}
