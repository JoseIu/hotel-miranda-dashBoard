import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ContainerSection, Row, TableActions, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { getAllContacts } from '../features/contactSlice/contactThunk';

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

  const handleDelete = (id: string) => {
    console.log(id);
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

      <Wrapper>
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
                  <Link to={`/admin/rooms-form/${message._id}`}>
                    <EditIcon className="edit" />
                  </Link>
                  <button onClick={() => handleDelete(message._id)}>
                    <DeleteIcon className="delete" />
                  </button>
                </TableActions>
              </td>
            </Row>
          ))}
        </Table>
      </Wrapper>
    </ContainerSection>
  );
};

export default ContactPage;

const MessageCard = styled.article`
  background: var(--bg-gradient);
  box-shadow: var(--box-shadow);
  height: 8rem;
  padding: 1rem 2rem;
  border-radius: 0.3rem;

  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  h2 {
    font-size: 0.9em;
    font-weight: 600;
  }
  p {
    font-size: 0.8em;
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
  row-gap: 2rem;

  h2 {
    font-size: 1.25em;
  }
`;
