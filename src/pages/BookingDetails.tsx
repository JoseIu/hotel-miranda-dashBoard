import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import ArrowLeft from '../components/icons/ArrowLeft';
import { ButtonGoBack } from '../components/shared/GlobalStyle';
import { ContainerSection } from '../components/shared/StyledComponets';
import { getBooking } from '../features/bookinsSlice/bookinsThunk';
import { getRomById } from '../features/roomsSlice/roomsThunk';

const BookingDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { bookin } = useSelector((state: RootState) => state.bookings);
  const { room } = useSelector((state: RootState) => state.rooms);

  const { id } = useParams<{ id: string }>();
  const distpatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    const getBookingByID = async () => {
      await distpatch(getBooking(id!));
      setIsLoading(false);
    };
    getBookingByID();
  }, [id, distpatch]);

  useEffect(() => {
    const getRoomByID = async () => {
      if (bookin?.roomID) {
        await distpatch(getRomById(bookin?.roomID));
      }
    };
    getRoomByID();
  }, [bookin?.roomID, distpatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <ContainerSection>
      <Header title={'Bookings Details'} />
      <BookingContainer>
        <ButtonGoBack onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </ButtonGoBack>
        <BookingDetail>
          <BookingInfo>
            <UserInfo>
              <UseData>
                <img src={bookin?.guest.img} alt={bookin?.guest.name} />

                <h2>
                  {bookin?.guest.name} <span>ID: {bookin?.guest.reservationID}</span>
                </h2>
              </UseData>
              <Check>
                <BookingRow>
                  Check In
                  <span>
                    {bookin?.checkin.date.slice(0, 10)} | {bookin?.checkin.time}
                  </span>
                </BookingRow>
                <BookingRow>
                  Check Out
                  <span>
                    {bookin?.checkOut.date.slice(0, 10)} | {bookin?.checkOut.time}
                  </span>
                </BookingRow>
              </Check>
            </UserInfo>
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
          </BookingInfo>

          <RoomImages>
            <img src="/images/room.webp" alt="" />
          </RoomImages>
        </BookingDetail>
      </BookingContainer>
    </ContainerSection>
  );
};

export default BookingDetails;
const BookingContainer = styled.div`
  padding: 3em 4em 3em 4em;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const BookingDetail = styled.article`
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--white-color);
  border: 0.0625rem solid var(--text-dark);

  box-shadow: var(--box-shadow);
  display: grid;
  gap: 4rem;
  grid-template-columns: repeat(2, 1fr);
`;
const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const UserInfo = styled.div`
  padding: 0 0 1.5rem 0;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  border-bottom: 1px solid #ccc;
`;
const UseData = styled.div`
  display: flex;
  gap: 3rem;
  img {
    border-radius: 0.5rem;
    max-width: 10rem;
    border: 0.0625rem solid var(--text-dark);
    box-shadow: var(--box-shadow);
  }
  h2 {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    span {
      color: green;
      font-size: 0.8em;
    }
  }
`;

const Check = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    display: flex;
    flex-direction: column;
    row-gap: 0.5em;
    span {
      font-weight: 600;
    }
  }
`;

export const RoomInfo = styled.div`
  align-self: center;
  min-width: 40rem;
  padding: 1.5rem;
  border: 0.0625rem solid var(--text-dark);
  border-radius: 0.3rem;
  background-color: var(--white-color);
  box-shadow: var(--box-shadow);

  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;

export const RoomData = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 0.9em;
  }
  h2 {
    font-size: 1.3em;
    font-weight: 600;
    span {
      color: green;
      font-size: 0.7em;
    }
  }
`;
export const BookingRow = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  color: var(--text-dark);
  span {
    font-size: 1.25em;
    font-weight: 600;
  }
  h2 {
    display: flex;
    gap: 0.5rem;
    font-size: 1.5rem;
  }
`;
export const AmenitiesList = styled.ul`
  display: flex;
  gap: 1rem;
  li {
    padding: 0.2rem 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.9em;
    background-color: var(--white-color);
    background-color: var(--hover-color);
    border: 0.0625rem solid var(--text-dark);
  }
`;

const RoomImages = styled.div`
  align-self: flex-end;
  img {
    aspect-ratio: 16/11;
    border-radius: 0.3em;
    border: 0.0625rem solid var(--text-dark);
    box-shadow: var(--box-shadow);
  }
`;
