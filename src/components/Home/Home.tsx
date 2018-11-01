import * as React from 'react';

import LeftSidebar from '../LeftSidebar';
import CanvasView from '../CanvasView';
import RightSidebar from '../RightSidebar';
import { calcShapeValues } from '../../util/shapes';
import { OrderState } from '../../types/order';
import { ShapesState } from '../../types/shapes';
import { EditorState } from '../../types/editor';
import { resetShapeValues } from '../../actions/shapeValues';

import { HomeDiv } from './styles';
import { Dispatch } from '../../actions';

type HomeProps = {
  order: OrderState,
  shapes: ShapesState,
  editor: EditorState,
  dispatch: Dispatch,
};

export default class Home extends React.Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
    this.initShapeValues();
  }

  initShapeValues = () => {
    const { order, shapes, editor } = this.props;

    Promise.all(
      order.map(
        (
          key: string,
        ): Promise<{
          [key: string]: Array<number>,
        }> => calcShapeValues(shapes[key], editor.numFrames, () => {}),
      ),
    )
      .then((shapePropValues: Array<{ [key: string]: Array<number> }>) => {
        const newShapeValues = shapePropValues.reduce(
          (
            acc: { [key: string]: Array<number> },
            curr: { [key: string]: Array<number> },
            i: number,
          ): { [key: string]: Array<number> } => ({
            ...acc,
            [order[i]]: {
              type: shapes[order[i]].type,
              properties: curr,
            },
          }),
          {},
        );

        this.props.dispatch(resetShapeValues(newShapeValues));
      })
      .catch(() => {});
  };

  render() {
    return (
      <HomeDiv>
        <LeftSidebar />
        <CanvasView />
        <RightSidebar />
      </HomeDiv>
    );
  }
}
