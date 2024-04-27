import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AppDispatch, RootState } from '../app/store';
import Header from '../components/Header';
import Table from '../components/Table';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import { getUsers } from '../features/usersSlice/usersThunk';

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
      <Wrapper>
        <Table columns={columns}>
          {users.map((employee) => (
            <Row key={employee.employee.employeeId}>
              <Link to={`/admin/users/${employee.employee.employeeId}`}>
                <TableGuest
                  img={employee.employee.image}
                  id={employee.employee.employeeId}
                  name={employee.employee.firstName}
                  lastName={employee.employee.lastName}
                  startDate={employee.employee.startDate}
                />
              </Link>
              <td>{employee.description}</td>
              <td>
                {employee.contact.phone} {employee.contact.email}
              </td>
              <RoomStatus $status={employee.status}>{employee.status ? 'ACTIVE' : 'INACTIVE'} </RoomStatus>
            </Row>
          ))}
        </Table>
      </Wrapper>
    </ContainerSection>
  );
};

export default UsersPage;

const RoomStatus = styled.td<{ $status: boolean }>`
  color: ${(props) => (props.$status ? '#4CAF50' : '#F44336')};
`;
