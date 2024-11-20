import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookingSummary from '../components/BookingSummary';
import Header from '../components/Header';
import ArrowBoxLeft from '../components/icons/ArrowBoxLeft';
import ArrowBoxRight from '../components/icons/ArrowBoxRight';
import BedIcon from '../components/icons/BedIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import { ContainerSection } from '../components/shared/StyledComponets';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AppDispatch, RootState } from '../app/store';
import { MessageSkeleton } from '../components/shared/skeleton/MessageSkeleton';
import { getAllContacts } from '../features/contactSlice/contactThunk';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const getContactsMessage = async () => {
      await dispatch(getAllContacts()).unwrap();
      setLoading(false);
    };
    getContactsMessage();
  }, [dispatch]);

  return (
    <ContainerSection>
      <Header title={'Dashboard'} />

      <BookingSummaryContainer>
        <BookingSummary Icon={BedIcon} number={150} title={'Reservations Received'} />
        <BookingSummary Icon={CalendarIcon} number={50} title={'Occupation'} />
        <BookingSummary Icon={ArrowBoxLeft} number={80} title={'Check-ins'} />
        <BookingSummary Icon={ArrowBoxRight} number={70} title={'Check-outs'} />
      </BookingSummaryContainer>

      <LastMessages>
        <LastMessagesTitle>Last messages</LastMessagesTitle>

        {loading ? (
          <MessageSkeleton />
        ) : (
          <SwipertSyled slidesPerView={4} spaceBetween={30} navigation={true} modules={[Navigation]}>
            {contacts.map((message) => (
              <SwiperSlide key={message._id}>
                <MessageCard>
                  <h2>
                    {message.customer.name} {message.customer.name}
                  </h2>
                  <p>{message.comment}</p>
                </MessageCard>
              </SwiperSlide>
            ))}
          </SwipertSyled>
        )}
      </LastMessages>
    </ContainerSection>
  );
};

export default DashboardPage;

const BookingSummaryContainer = styled.div`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5rem;
  padding: 1.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
`;
const MessageCard = styled.article`
  padding: 1rem;
  border-radius: 0.3rem;
  aspect-ratio: 16/9;
  background-color: var(--white-color);

  border: 0.0625rem solid var(--text-dark);
  box-shadow: var(--box-shadow);

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  h2 {
    font-size: 1.1em;
    font-weight: 600;
  }
  p {
    font-size: 0.8em;
  }
`;

const SwipertSyled = styled(Swiper)`
  max-width: 100%;
  padding: 1rem;
`;

const LastMessages = styled.section`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;

  padding: 1em 2rem;
  border-radius: 0.5rem;
  color: var(--text-dark);

  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;
const LastMessagesTitle = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
`;
