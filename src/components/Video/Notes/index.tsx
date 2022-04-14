import React, { useState } from 'react';
import { Note, Timestamp } from '..';
import {
  NotesContainer,
  NoteTextDisplay,
  NoteItem,
  NoteActions,
  CreateNoteBtn,
  TimestampBtn,
} from './style';
import { HiPlusCircle } from 'react-icons/hi';
import { FaTrash } from 'react-icons/fa';
import { PlayerSdk } from '@api.video/player-sdk';
import EditNote from './EditNote';
import { IconBtn } from '../style';

interface NotesProps {
  playerSdk: PlayerSdk;
  currTimestamp: Timestamp;
  notesList: Note
  setNotesList: (notes: Note) => void
  createNoteMode: boolean
  setCreateNoteMode: (bool: boolean) => void
}


const Notes: React.FC<NotesProps> = ({
  playerSdk,
  currTimestamp,
  notesList,
  setNotesList,
  createNoteMode,
  setCreateNoteMode
}): JSX.Element => {
  const [note, setNote] = useState<string>('');

  const handleChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleSubmitNote = () => {
    setNotesList({
      ...notesList,
      [currTimestamp.minutesFormat]: {
        note,
        seconds: currTimestamp.seconds,
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

  const handleCreateNote = () => {
    setCreateNoteMode(true)
    playerSdk.pause()
  }

  return (
    <>
      {createNoteMode ? (
        <EditNote
          showTimestamp
          value={note}
          onChangeNote={handleChangeNote}
          currTimestamp={currTimestamp.minutesFormat}
          onSubmitNote={handleSubmitNote}
          onCancelNote={() => setCreateNoteMode(false)}
        />
      ) : (
          <>
            <CreateNoteBtn onClick={handleCreateNote}>
              {`Create a new note at ${currTimestamp.minutesFormat}`}
              <HiPlusCircle color={'#000'} size={'2rem'} />
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

                      <NoteTextDisplay>
                        <NoteActions>
                          <IconBtn
                            onClick={() => {
                              handleDeleteNote(key);
                            }}
                            value={key}
                          >
                            <FaTrash size={'1.5rem'} />
                          </IconBtn>
                        </NoteActions>
                        {notesList[key].note}
                      </NoteTextDisplay>
                    </NoteItem>
                  );
                })}
              </NotesContainer>
            )}
          </>
        )}
    </>
  );
};

export default Notes;
