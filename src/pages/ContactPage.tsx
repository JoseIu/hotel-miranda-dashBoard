import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppDispatch, RootState } from '../app/store';
import { PaginationTable } from '../components';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import { ModalDelete } from '../components/modal/ModalDelete';
import { ContainerSection, Row, TableActions } from '../components/shared/StyledComponets';
import { MessageSkeleton } from '../components/shared/skeleton/MessageSkeleton';
import { TableSkeleton } from '../components/shared/skeleton/TableSkeleton';
import TableGuest from '../components/table/TableGuest';
import { deleteContact, getAllContacts } from '../features/contactSlice/contactThunk';
import { paginationTable } from '../helpers';
import { useTablePagination } from '../hooks';
import { useModal } from '../hooks/useModal';

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
  const { modal, setModal } = useModal();

  const { page, setPage, itemsPerPage } = useTablePagination({ page: 1, itemsPerPage: 5 });
  const toalPages = Math.ceil(contacts.length / itemsPerPage);

  const contactsPageinated = paginationTable(contacts, page, itemsPerPage);

  const handleDelete = async () => {
    await dispatch(deleteContact(modal.id));
    toast.success('Contact deleted successfully');
    setModal({ isOpen: false, id: '' });
  };

  useEffect(() => {
    const getContactsMessage = async () => {
      await dispatch(getAllContacts()).unwrap();
      setLoading(false);
    };
    getContactsMessage();
  }, [dispatch]);

  return (
    <ContainerSection>
      <Header title={'Contact'} />
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

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <>
          <Table columns={columns}>
            {contactsPageinated.slice(0, 10).map((message) => (
              <Row key={message._id}>
                <td>
                  <TableGuest startDate={message.date.slice(0, 10)} id={message.messageID} />
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
                    <button onClick={() => setModal({ isOpen: true, id: message._id })}>
                      <DeleteIcon className="delete" />
                    </button>
                  </TableActions>
                </td>
              </Row>
            ))}
          </Table>
          <PaginationTable page={page} totalPages={toalPages} setPage={setPage} />

          <ModalDelete isOpen={modal.isOpen} setModal={setModal} handleDelete={handleDelete} />
        </>
      )}
    </ContainerSection>
  );
};

export default ContactPage;

const MessageCard = styled.article`
  padding: 1rem;
  border-radius: 0.3rem;
  aspect-ratio: 16/9;
  background: var(--white-color);
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
    color: var(--zinc-400);
  }
`;

const SwipertSyled = styled(Swiper)`
  width: 100%;
`;

const LastMessages = styled.section`
  max-width: 87.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 1rem 2rem;

  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`;
const LastMessagesTitle = styled.h2`
  font-size: 1.5em;
  font-weight: 600;
`;
