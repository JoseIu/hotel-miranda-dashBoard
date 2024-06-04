import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import DeleteIcon from '../components/icons/DeleteIcon';
import EditIcon from '../components/icons/EditIcon';
import { ButtonAction, FilterActive } from '../components/shared/GlobalStyle';
import {
  ContainerSection,
  Row,
  TableActions,
  TableStatus,
  Wrapper,
} from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { deleteUser, getUsers } from '../features/usersSlice/usersThunk';
import { filterByName, filterByType, useUsersFilters } from '../hooks/useUsersFilters';

const columns = [
  { label: 'Employee', key: 'employee ' },
  { label: 'Job Description ', key: 'job description ' },
  { label: 'Contact  ', key: 'contact  ' },
  { label: 'Status', key: 'status' },
];

const UsersPage = () => {
  const [loading, setLoading] = useState(true);

  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const { setSearch, setType, userFilter } = useUsersFilters();

  let usersFiltered = filterByName(users, userFilter.search);
  usersFiltered = filterByType(usersFiltered, userFilter.type);
  const handleDelete = async (id: string) => {
    await dispatch(deleteUser(id));
  };
  useEffect(() => {
    const getAllUsers = async () => {
      await dispatch(getUsers()).unwrap();
      setLoading(false);
    };
    getAllUsers();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  return (
    <ContainerSection>
      <Header title={'Users'} />
      <UserActions>
        <div>
          <FilterActive $active={userFilter.type === 0} onClick={() => setType(0)}>
            All Employe
          </FilterActive>
          <FilterActive $active={userFilter.type === 1} onClick={() => setType(1)}>
            Active
          </FilterActive>
          <FilterActive $active={userFilter.type === 2} onClick={() => setType(2)}>
            Inactive
          </FilterActive>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="search employee name..."
          value={userFilter.search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ButtonAction to="/admin/user-form">Create User +</ButtonAction>
      </UserActions>
      <Wrapper>
        <Table columns={columns}>
          {usersFiltered.map((employee) => (
            <Row key={employee._id}>
              <td>
                <Link to={`/admin/users/${employee._id}`}>
                  <TableGuest
                    img={employee.image}
                    id={employee._id}
                    name={employee.firstName}
                    lastName={employee.lastName}
                    startDate={employee.startDate.slice(0, 10)}
                  />
                </Link>
              </td>
              <td>{employee.description}</td>
              <td>
                {employee.phone} {employee.email}
              </td>
              <TableStatus $status={employee.status}>{employee.status ? 'ACTIVE' : 'INACTIVE'} </TableStatus>
              <td>
                <TableActions>
                  <Link to={`/admin/user-form/${employee._id}`}>
                    <EditIcon className="edit" />
                  </Link>
                  <button onClick={() => handleDelete(employee._id)}>
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

export default UsersPage;

const UserActions = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    gap: 1rem;
  }
`;
