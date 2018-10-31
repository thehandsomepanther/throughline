import * as React from 'react';
import { shapeTypeToProperties } from '../../types/shapes';

type NewShapeEditorProps = {
  addNewShape: (type: string, name: string) => void,
};
type NewShapeEditorState = {
  shouldShowNewShapeInfoForm: boolean,
  newShapeType: string,
  newShapeName: string,
};

const initialState = {
  shouldShowNewShapeInfoForm: false,
  newShapeType: Object.keys(shapeTypeToProperties)[0],
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

  private handleNewShapeClick = () => {
    this.setState({ shouldShowNewShapeInfoForm: true });
  };

  private handleNewShapeTypeChange = (value: string) => {
    this.setState({ newShapeType: value });
  };

  private handleNewShapeNameChange = (value: string) => {
    this.setState({ newShapeName: value });
  };

  private handleNewShapeInfoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { addNewShape } = this.props;
    const { newShapeName, newShapeType } = this.state;
    e.preventDefault();
    addNewShape(newShapeType, newShapeName);
    this.setState({ ...initialState });
  };

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
                this.handleNewShapeTypeChange(e.target.value);
              }}
            >
              {Object.keys(shapeTypeToProperties).map(
                (shapeType: string) => (
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
}
