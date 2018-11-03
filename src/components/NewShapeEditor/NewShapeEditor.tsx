import * as React from 'react';
import { Dispatch } from '../../actions';
import { addNewShape } from '../../actions/shapes';
import { ShapeType, shapeTypeToProperties } from '../../types/shapes';

interface NewShapeEditorProps {
  dispatch: Dispatch;
}
interface NewShapeEditorState {
  shouldShowNewShapeInfoForm: boolean;
  newShapeType: ShapeType;
  newShapeName: string;
}

const initialState: NewShapeEditorState = {
  shouldShowNewShapeInfoForm: false,
  newShapeType: ShapeType.Rect,
  newShapeName: '',
};

export default class NewShapeEditor extends React.Component<
  NewShapeEditorProps,
  NewShapeEditorState
  > {
  constructor(props: NewShapeEditorProps) {
    super(props);
    this.state = initialState;
  }

  public render() {
    const {
      shouldShowNewShapeInfoForm,
      newShapeName,
      newShapeType,
    } = this.state;

    return (
      <div>
        {shouldShowNewShapeInfoForm ? (
          <form onSubmit={this.handleNewShapeInfoFormSubmit}>
            <select
              value={newShapeType}
              onChange={(e) => {
                this.handleNewShapeTypeChange(e.target.value as ShapeType);
              }}
            >
              {Object.keys(shapeTypeToProperties).map(
                (shapeType: ShapeType) => (
                  <option value={shapeType} key={shapeType}>
                    {shapeType}
                  </option>
                ),
              )}
            </select>
            <input
              type="text"
              value={newShapeName}
              placeholder="shape name"
              onChange={(e) => {
                this.handleNewShapeNameChange(e.target.value);
              }}
            />
            <input
              type="submit"
              value="create shape"
              disabled={!newShapeName.length}
            />
          </form>
        ) : (
            <input
              type="button"
              value="new shape"
              onClick={this.handleNewShapeClick}
            />
          )}
      </div>
    );
  }

  private handleNewShapeClick = () => {
    this.setState({ shouldShowNewShapeInfoForm: true });
  };

  private handleNewShapeTypeChange = (value: ShapeType) => {
    this.setState({ newShapeType: value });
  };

  private handleNewShapeNameChange = (value: string) => {
    this.setState({ newShapeName: value });
  };

  private handleNewShapeInfoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { newShapeName, newShapeType } = this.state;
    e.preventDefault();
    this.props.dispatch(addNewShape(newShapeType, newShapeName));
    this.setState({ ...initialState });
  };
}
