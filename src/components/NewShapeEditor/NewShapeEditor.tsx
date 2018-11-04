import * as React from 'react';
import { Dispatch } from '../../actions';
import { addNewShape } from '../../actions/shapes';
import { ShapeType, shapeTypeToProperties } from '../../types/shapes';
import { NewShapeButton, NewShapeButtonContainer, NewShapeDropdownInput, NewShapeForm, NewShapeInputContainer, NewShapeNameInput, NewShapeSubmitInput } from './styles';

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

export default class NewShapeEditor extends React.Component<NewShapeEditorProps, NewShapeEditorState> {
  constructor(props: NewShapeEditorProps) {
    super(props);
    this.state = initialState;
  }

  private handleNewShapeClick = () => {
    this.setState({ shouldShowNewShapeInfoForm: true });
  };

  private handleNewShapeTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ newShapeType: e.target.value as ShapeType });
  };

  private handleNewShapeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newShapeName: e.target.value });
  };

  private handleNewShapeInfoFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const { newShapeName, newShapeType } = this.state;
    e.preventDefault();
    this.props.dispatch(addNewShape(newShapeType, newShapeName));
    this.setState({ ...initialState });
  };

  public render() {
    const {
      shouldShowNewShapeInfoForm,
      newShapeName,
      newShapeType,
    } = this.state;

    return (
      <NewShapeButtonContainer>
        {shouldShowNewShapeInfoForm ? (
          <NewShapeForm onSubmit={this.handleNewShapeInfoFormSubmit}>
            <NewShapeInputContainer>
              <NewShapeDropdownInput value={newShapeType} onChange={this.handleNewShapeTypeChange}>
                {Object.keys(shapeTypeToProperties).map(
                  (shapeType: ShapeType) => (
                    <option value={shapeType} key={shapeType}>
                      {shapeType}
                    </option>
                  ),
                )}
              </NewShapeDropdownInput>
              <NewShapeNameInput
                type="text"
                value={newShapeName}
                placeholder="Shape name"
                onChange={this.handleNewShapeNameChange}
              />
            </NewShapeInputContainer>
            <NewShapeSubmitInput
              type="submit"
              name={newShapeName}
              value={newShapeName ? "Create shape" : "Cancel"}
            />
          </NewShapeForm>
        ) : (
            <NewShapeButton
              type="button"
              value="+ New Shape"
              onClick={this.handleNewShapeClick}
            />
          )}
      </NewShapeButtonContainer>
    );
  }
}
