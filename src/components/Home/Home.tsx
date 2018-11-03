import * as React from 'react';

import { EditorState } from '../../types/editor';
import { OrderState } from '../../types/order';
import { ShapesState } from '../../types/shapes';
import { calcShapeValues } from '../../util/shapes';
import CanvasView from '../CanvasView';
import LeftSidebar from '../LeftSidebar';
import RightSidebar from '../RightSidebar';

import { Dispatch } from '../../actions';
import { setShapeValues } from '../../actions/shapes';
import { HomeDiv } from './styles';

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

  public render() {
    return (
      <HomeDiv>
        <LeftSidebar />
        <CanvasView />
        <RightSidebar />
      </HomeDiv>
    );
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
}
