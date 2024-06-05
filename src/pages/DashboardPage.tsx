import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import BookingSummary from '../components/BookingSummary';
import Header from '../components/Header';
import ArrowBoxLeft from '../components/icons/ArrowBoxLeft';
import ArrowBoxRight from '../components/icons/ArrowBoxRight';
import BedIcon from '../components/icons/BedIcon';
import CalendarIcon from '../components/icons/CalendarIcon';
import { ContainerSection, Wrapper } from '../components/shared/StyledComponets';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AppDispatch, RootState } from '../app/store';
import { getAllContacts } from '../features/contactSlice/contactThunk';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();
  console.log(contacts);

  useEffect(() => {
    const getContactsMessage = async () => {
      await dispatch(getAllContacts()).unwrap();
      setLoading(false);
    };
    getContactsMessage();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <ContainerSection>
      <Header title={'Dashboard'} />
      <Wrapper>
        <BookingSummaryContainer>
          <BookingSummary Icon={BedIcon} number={150} title={'Reservations Received'} />
          <BookingSummary Icon={CalendarIcon} number={50} title={'Occupation'} />
          <BookingSummary Icon={ArrowBoxLeft} number={80} title={'Check-ins'} />
          <BookingSummary Icon={ArrowBoxRight} number={70} title={'Check-outs'} />
        </BookingSummaryContainer>

        <div>CALENMDARIOS</div>

        <LastMessages>
          <h2>Latest Messages by Customers</h2>
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
        </LastMessages>
      </Wrapper>
    </ContainerSection>
  );
};

export default DashboardPage;

const BookingSummaryContainer = styled.div`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;
  padding-top: 1.5rem;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.2rem;
`;
const MessageCard = styled.article`
  min-height: 8rem;
  padding: 2rem;
  border-radius: 0.3rem;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  background-color: #202020;
  border: 0.0625rem solid #3d3d3d;
`;

const SwipertSyled = styled(Swiper)`
  max-width: 100%;
`;

const LastMessages = styled.section`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;

  padding: 2em;
  border-radius: 0.5rem;
  background: #202020;
  color: #e8f2ef;

  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  h2 {
    font-size: 1.25em;
  }
`;
