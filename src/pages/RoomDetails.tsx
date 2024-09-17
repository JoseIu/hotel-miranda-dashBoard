import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import { ContainerSection } from '../components/shared/StyledComponets';
import { getRomById } from '../features/roomsSlice/roomsThunk';
import { AmenitiesList, BookingRow, RoomData, RoomInfo } from './BookingDetails';

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { room } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getRoomByID = async () => {
      if (!id) return;
      await dispatch(getRomById(id));
      setLoading(false);
    };
    getRoomByID();
  }, [dispatch, id]);

  console.log(room);

  if (loading) return <span>Loading...</span>;
  return (
    <ContainerSection>
      <Header title={'Room Details'} />
      <RoomInfo>
        <RoomData>
          <BookingRow>
            <span>Room Info</span>
            <h2>
              {room?.roomType} - {room?.roomNumber}
            </h2>
          </BookingRow>
          <BookingRow>
            <span>Price</span>
            <h2>
              $ {room?.price} <span>/night</span>
            </h2>
          </BookingRow>
        </RoomData>

        <p>{room?.description}</p>

        <BookingRow>
          <span>Facilities</span>
          <AmenitiesList>
            {room?.amenities.map((amenity) => (
              <li key={amenity}>{amenity}</li>
            ))}
          </AmenitiesList>
        </BookingRow>
      </RoomInfo>
    </ContainerSection>
  );
};

export default RoomDetails;
