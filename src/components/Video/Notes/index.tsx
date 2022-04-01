import React, { useState } from 'react';
import { Timestamp } from '..';
import {
  NotesContainer,
  NoteTextDisplay,
  NoteItem,
  NoteActions,
  NoteBtn,
  CreateNoteBtn,
  TimestampBtn,
} from './style';
import { HiPlusCircle } from 'react-icons/hi';
import { FaPen, FaTrash } from 'react-icons/fa';
import { PlayerSdk } from '@api.video/player-sdk';
import EditNote from './EditNote';

interface NotesProps {
  playerSdk: PlayerSdk;
  currTimestamp: Timestamp;
}

interface Note {
  [key: string]: { note: string; seconds: number; edit: boolean };
}

const Notes: React.FC<NotesProps> = ({
  playerSdk,
  currTimestamp,
}): JSX.Element => {
  const [createNoteMode, setCreateNoteMode] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState<Note>(null);
  const [editableNotes, setEditableNotes] = useState<Note>(notesList)
  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleSubmitNote = () => {
    setNotesList({
      ...notesList,
      [currTimestamp.minutesFormat]: {
        note,
        seconds: currTimestamp.seconds,
        edit: false,
      },
    });
    setCreateNoteMode(false);
    setNote('');
  };

  const handleDeleteNote = (timestamp) => {
    const notesCopy = { ...notesList };
    delete notesCopy[timestamp];
    setNotesList(notesCopy);
  };

//   const handleEditNote = (timestamp) => {
//     setNotesList({
//       ...notesList,
//       [timestamp]: { ...notesList[timestamp], edit: true },
//     });
//     // setNote(notesList[timestamp].note);
//   };

  return (
    <>
      {!createNoteMode && (
        <>
          <CreateNoteBtn onClick={() => setCreateNoteMode(true)}>
            {`Create a new note at ${currTimestamp.minutesFormat}`}
            <HiPlusCircle color={'#000'} size={'1.3rem'} />
          </CreateNoteBtn>
          {notesList && (
            <NotesContainer>
              {Object.keys(notesList).map((key, i) => {
                return (
                  <NoteItem key={`note-${i}`}>
                    <TimestampBtn
                      onClick={() =>
                        playerSdk.setCurrentTime(notesList[key].seconds)
                      }
                    >
                      {key}
                    </TimestampBtn>

                    {notesList[key].edit ? (
                      'edit'
                    ) : (
                      <NoteTextDisplay>
                        <NoteActions>
                          <NoteBtn>
                            {/* <FaPen
                              onClick={() => handleEditNote(key)}
                              size={'1rem'}
                            /> */}
                          </NoteBtn>
                          <NoteBtn
                            onClick={() => {
                              handleDeleteNote(key);
                            }}
                            value={key}
                          >
                            <FaTrash size={'1rem'} />
                          </NoteBtn>
                        </NoteActions>
                        {notesList[key].note}
                      </NoteTextDisplay>
                    )}
                  </NoteItem>
                );
              })}
            </NotesContainer>
          )}
        </>
      )}

      {createNoteMode && (
        <EditNote
        showTimestamp
          value={note}
          onChangeNote={handleChangeNote}
          currTimestamp={currTimestamp.minutesFormat}
          onSubmitNote={handleSubmitNote}
          onCancelNote={() => setCreateNoteMode(false)}
        />
      )}
    </>
  );
};

export default Notes;
