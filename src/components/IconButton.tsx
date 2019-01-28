import * as React from 'react';
import styled from 'react-emotion';
import { mixins } from '../styles';

interface IconButtonProps extends React.HTMLProps<HTMLInputElement> {
  svg: string;
  styles?: string;
};

const iconMixin = (svg: string) => `
  width: 24px;
  height: 24px;
  background: url(${svg});
  background-repeat: no-repeat;
  background-position: center center;
`;

export const Icon = styled('div')`
  ${(props: { svg: string }): string => iconMixin(props.svg)}
  display: inline-block;
`;

const IconInput = styled('input')`
  ${mixins.resetInput}
  ${(props: IconButtonProps): string => iconMixin(props.svg)}
  cursor: pointer;
  border-radius: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  ${(props: IconButtonProps): string | undefined => props.styles}
`;

export class IconButton extends React.PureComponent<IconButtonProps> {
  public render() {
    return (
      <IconInput type="button" onClick={this.props.onClick} svg={this.props.svg} styles={this.props.styles} />
    );
  }
}
