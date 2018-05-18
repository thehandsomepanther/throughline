// @flow

import React, { Component } from 'react';

import LeftSidebar from '../../components/LeftSidebar';
import CanvasView from '../../components/CanvasView';
import RightSidebar from '../../components/RightSidebar';
import { calcShapeValues } from '../../util/shapes';
import type { OrderStateType } from '../../types/order';
import type { ShapesStateType } from '../../types/shapes';
import type { EditorStateType } from '../../types/editor';
import type { SetShapeValuesType } from '../../actions/shapeValues';

import { HomeDiv } from './styles';

type PropsType = {
  order: OrderStateType,
  shapes: ShapesStateType,
  editor: EditorStateType,
  setShapeValues: SetShapeValuesType,
};

export default class Home extends Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.initShapeValues();
  }

  initShapeValues = () => {
    const { order, shapes, editor, setShapeValues } = this.props;

    Promise.all(
      order.map((key: string): Promise<{
        [key: string]: Array<number>,
      }> => calcShapeValues(shapes[key], editor.numFrames, () => {})),
    )
      .then((shapePropValues: Array<{ [key: string]: Array<number> }>) => {
        const newShapeValues = shapePropValues.reduce(
          (
            acc: { [key: string]: Array<number> },
            curr: { [key: string]: Array<number> },
            i: number,
          ): { [key: string]: Array<number> } => ({
            ...acc,
            [order[i]]: curr,
          }),
          {},
        );

        setShapeValues(newShapeValues);
      })
      .catch(() => {});
  };

  render(): ?React$Element<any> {
    return (
      <HomeDiv>
        <LeftSidebar />
        <CanvasView />
        <RightSidebar />
      </HomeDiv>
    );
  }
}
