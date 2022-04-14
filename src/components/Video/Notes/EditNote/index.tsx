import React from 'react';
import {
    NoteEditContainer,
    NoteEditor,
    ButtonsContainer,
    CancelBtn,
    SaveBtn,
    EditorContainer,
} from './style';
import { TimestampBtn } from '../style';

interface EditNoteProps {
    showTimestamp?: boolean;
    value: string;
    currTimestamp: string;
    onChangeNote: (e: React.ChangeEvent) => void;
    onSubmitNote: () => void;
    onCancelNote: () => void;
}

const EditNote: React.FC<EditNoteProps> = ({
    showTimestamp = false,
    value,
    currTimestamp,
    onChangeNote,
    onSubmitNote,
    onCancelNote,
}): JSX.Element => {

    return (
        <NoteEditContainer>
            {showTimestamp && <TimestampBtn>{currTimestamp}</TimestampBtn>}
            <EditorContainer>
                <NoteEditor value={value} onChange={onChangeNote} />
                <ButtonsContainer>
                    <CancelBtn onClick={onCancelNote}>Cancel</CancelBtn>
                    <SaveBtn onClick={onSubmitNote}>Save</SaveBtn>
                </ButtonsContainer>
            </EditorContainer>
        </NoteEditContainer>
    );
};

export default EditNote;
