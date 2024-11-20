import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import ArrowLeft from '../components/icons/ArrowLeft';
import { ButtonGoBack } from '../components/shared/GlobalStyle';
import { ContainerSection } from '../components/shared/StyledComponets';
import { getRomById } from '../features/roomsSlice/roomsThunk';
import { AmenitiesList, BookingRow, RoomData, RoomInfo } from './BookingDetails';

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const { room } = useSelector((state: RootState) => state.rooms);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const getRoomByID = async () => {
      if (!id) return;
      await dispatch(getRomById(id));
      setLoading(false);
    };
    getRoomByID();
  }, [dispatch, id]);

  if (loading) return <span>Loading...</span>;
  return (
    <ContainerSection>
      <Header title={'Room Details'} />

      <RoomContainer>
        <ButtonGoBack onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </ButtonGoBack>
        <RoomInfo>
          <RoomData>
            <BookingRow>
              <span>Room Info</span>
              <h2>
                {room?.roomType} - {room?.roomNumber}{' '}
                <RoomDeailStatus $status={room?.status}>
                  {room?.status ? 'Available' : 'Occupied'}
                </RoomDeailStatus>
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
      </RoomContainer>
    </ContainerSection>
  );
};

export default RoomDetails;

export const RoomContainer = styled.div`
  padding: 3em 4em 3em 4em;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RoomDeailStatus = styled.div<{ $status?: boolean }>`
  max-width: fit-content;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.75rem;
  border: 0.0625rem solid var(--text-dark);
  color: var(--white-color);
  background-color: ${(props) => (props.$status ? 'green' : 'red')};

  display: flex;
  align-items: center;
`;
