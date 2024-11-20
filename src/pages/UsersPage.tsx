import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import { PaginationTable } from '../components';
import Header from '../components/Header';
import InputSearh from '../components/InputSearch';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ModalDelete } from '../components/modal/ModalDelete';
import { ButtonAction, FilterActive } from '../components/shared/GlobalStyle';
import { ContainerSection, Row, TableActions, TableStatus } from '../components/shared/StyledComponets';
import { TableSkeleton } from '../components/shared/skeleton/TableSkeleton';
import TableGuest from '../components/table/TableGuest';
import { deleteUser, getUsers } from '../features/usersSlice/usersThunk';
import { paginationTable } from '../helpers';
import { useModal, useTablePagination } from '../hooks';
import { filterByName, filterByType, useUsersFilters } from '../hooks/useUsersFilters';

const columns = [
  { label: 'Employee', key: 'employee ' },
  { label: 'Job Description ', key: 'job description ' },
  { label: 'Contact  ', key: 'contact  ' },
  { label: 'Status', key: 'status' },
];

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const { modal, setModal } = useModal();

  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const { setSearch, setType, userFilter } = useUsersFilters();
  const { page, itemsPerPage, setPage } = useTablePagination({ page: 1, itemsPerPage: 5 });

  const { usersFiltered, totalPage } = useMemo(() => {
    let usersFiltered = filterByName(users, userFilter.search);
    usersFiltered = filterByType(usersFiltered, userFilter.type);
    const totalPage = Math.ceil(usersFiltered.length / itemsPerPage);
    return { usersFiltered, totalPage };
  }, [users, userFilter, itemsPerPage]);

  const usersPaginated = paginationTable(usersFiltered, page, itemsPerPage);

  const handleDelete = async () => {
    await dispatch(deleteUser(modal.id));
  };
  useEffect(() => {
    const getAllUsers = async () => {
      await dispatch(getUsers()).unwrap();
      setLoading(false);
    };
    getAllUsers();
  }, [dispatch]);

  return (
    <ContainerSection>
      <Header title={'Users'} />
      <UserActions>
        <UserFilters>
          <FilterActive $active={userFilter.type === 0} onClick={() => setType(0)}>
            All Employe
          </FilterActive>
          <FilterActive $active={userFilter.type === 1} onClick={() => setType(1)}>
            Active
          </FilterActive>
          <FilterActive $active={userFilter.type === 2} onClick={() => setType(2)}>
            Inactive
          </FilterActive>
        </UserFilters>
        <InputSearh
          name="search"
          id="search"
          value={userFilter.search}
          placeholder="search a booking...."
          onChange={(event) => setSearch(event.target.value)}
        />
        <ButtonAction to="/admin/user-form">Create User +</ButtonAction>
      </UserActions>

      {loading ? (
        <TableSkeleton rows={7} />
      ) : (
        <>
          <Table columns={columns}>
            {usersPaginated.map((employee) => (
              <Row key={employee._id}>
                <td>
                  <TableGuest
                    img={employee.image}
                    id={employee._id}
                    name={employee.firstName}
                    lastName={employee.lastName}
                    startDate={employee.startDate.slice(0, 10)}
                  />
                </td>
                <td>{employee.description}</td>
                <ContactData>
                  <span>{employee.phone}</span>
                  <span className="email">{employee.email}</span>
                </ContactData>
                <TableStatus $status={employee.status}>
                  {employee.status ? 'ACTIVE' : 'INACTIVE'}{' '}
                </TableStatus>
                <td>
                  <TableActions>
                    <Link to={`/admin/user-form/${employee._id}`}>
                      <EditIcon className="edit" />
                    </Link>
                    <button onClick={() => setModal({ isOpen: true, id: employee._id })}>
                      <DeleteIcon className="delete" />
                    </button>
                  </TableActions>
                </td>
              </Row>
            ))}
          </Table>

          <PaginationTable page={page} totalPages={totalPage} setPage={setPage} />
          <ModalDelete isOpen={modal.isOpen} setModal={setModal} handleDelete={handleDelete} />
        </>
      )}
    </ContainerSection>
  );
};

export default UsersPage;

const UserActions = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UserFilters = styled.div`
  background-color: var(--white-color);
  box-shadow: var(--box-shadow);
  border-radius: 0.3rem;
  border: 0.0625rem solid var(--text-dark);

  overflow: hidden;
  display: flex;
  align-items: center;
`;
const ContactData = styled.td`
  display: flex;
  flex-direction: column;
  .email {
    color: var(--green);
  }
`;
