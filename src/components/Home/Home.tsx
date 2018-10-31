import React, { Component } from 'react';

import LeftSidebar from '../LeftSidebar';
import CanvasView from '../CanvasView';
import RightSidebar from '../RightSidebar';
import { calcShapeValues } from '../../util/shapes';
import { OrderState } from '../../types/order';
import { ShapesState } from '../../types/shapes';
import { EditorState } from '../../types/editor';

import { HomeDiv } from './styles';

type HomeProps = {
  order: OrderState,
  shapes: ShapesState,
  editor: EditorState,
  // TODO: refactor props to just pass in dispatch
  resetShapeValues: any,
};

export default class Home extends Component<HomeProps> {
  constructor(props: HomeProps) {
    super(props);
    this.initShapeValues();
  }

  initShapeValues = () => {
    const { order, shapes, editor, resetShapeValues } = this.props;

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

        resetShapeValues(newShapeValues);
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
