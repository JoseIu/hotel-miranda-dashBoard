import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import { ContainerSection, Row, TableActions, Wrapper2 } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { deleteContact, getAllContacts } from '../features/contactSlice/contactThunk';

const columns = [
  { label: 'Date', key: 'date ' },
  { label: 'Customer', key: 'customer' },
  { label: 'Subject ', key: 'subject ' },
  { label: 'Actions ', key: 'actions ' },
];
const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const { contacts } = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async (id: string) => {
    await dispatch(deleteContact(id));
    console.log(id);
    toast.success('Contact deleted');
  };

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
      <Header title={'Contact'} />
      <LastMessages>
        <LastMessagesTitle>Last messages</LastMessagesTitle>
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

      <Wrapper2>
        <Table columns={columns}>
          {contacts.slice(0, 10).map((message) => (
            <Row key={message._id}>
              <td>
                <Link to={`/admin/rooms/${message._id}`}>
                  <TableGuest startDate={message.date.slice(0, 10)} id={message.messageID} />
                </Link>
              </td>
              <td>
                <TableGuest
                  name={message.customer.name}
                  lastName={message.customer.phone}
                  id={message.customer.email}
                />
              </td>
              <td>{message.subject}</td>
              <td>
                <TableActions>
                  <button onClick={() => handleDelete(message._id)}>
                    <DeleteIcon className="delete" />
                  </button>
                </TableActions>
              </td>
            </Row>
          ))}
        </Table>
      </Wrapper2>
    </ContainerSection>
  );
};

export default ContactPage;

const MessageCard = styled.article`
  padding: 1rem;
  border-radius: 0.3rem;
  aspect-ratio: 16/9;
  background: var(--bg-gradient);
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
    color: var(--zinc-400);
  }
`;

const SwipertSyled = styled(Swiper)`
  max-width: 100%;
`;

const LastMessages = styled.section`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;

  padding: 1em 2rem;
  border-radius: 0.5rem;
  color: #e8f2ef;

  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;
const LastMessagesTitle = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
`;
