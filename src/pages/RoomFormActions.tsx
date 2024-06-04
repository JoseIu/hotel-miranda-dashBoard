import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import Header from '../components/Header';
import RoomForm from '../components/roomForm/RoomForm';
import { ContainerDiv } from '../components/shared/GlobalStyle';
import { ContainerSection } from '../components/shared/StyledComponets';
import { RoomInterface } from '../interfaces/room.interface';

const RoomFormActions = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const [roomToEdit, setRoomToEdit] = useState<RoomInterface | null>(null);
  const { rooms } = useSelector((state: RootState) => state.rooms);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const findRoom = rooms.find((room) => room._id === id);
      if (!findRoom) return;
      setRoomToEdit(findRoom);
    }
  }, [id, rooms]);
  return (
    <ContainerSection>
      <Header title="Room Form" />

      <ContainerDiv>{isEditing ? <RoomForm room={roomToEdit} /> : <RoomForm />}</ContainerDiv>
    </ContainerSection>
  );
};

export default RoomFormActions;
