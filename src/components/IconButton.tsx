import * as React from 'react';
import styled from 'react-emotion';
import { mixins } from '../styles';

interface IconButtonProps {
  svg: string;
  onClick?: () => void;
};

const Icon = styled('input')`
  ${mixins.resetInput}
  width: 24px;
  height: 24px;
  cursor: pointer;
  background: url(${(props: IconButtonProps): string => props.svg});
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 3px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export class IconButton extends React.PureComponent<IconButtonProps> {
  public render() {
    return (
      <Icon type="button" onClick={this.props.onClick} svg={this.props.svg} />
    );
  }
}
