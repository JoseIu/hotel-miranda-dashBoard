import { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Table from '../components/Table';
import { ContainerSection, Row, Wrapper } from '../components/shared/StyledComponets';
import TableGuest from '../components/table/TableGuest';
import employeeList from '../db/employeeList.json';
import { Employee } from '../interfaces/employee.interface';

const columns = [
  { label: 'Employee', key: 'employee ' },
  { label: 'Job Description ', key: 'job description ' },
  { label: 'Contact  ', key: 'contact  ' },
  { label: 'Status', key: 'status' },
];

const UsersPage = () => {
  const [employees] = useState<Employee[]>(employeeList);
  return (
    <ContainerSection>
      <Header />
      <Wrapper>
        <Table columns={columns}>
          {employees.map((employee) => (
            <Row key={employee.employee.employeeId}>
              <TableGuest
                img={employee.employee.image}
                id={employee.employee.employeeId}
                name={employee.employee.firstName}
                lastName={employee.employee.lastName}
                startDate={employee.employee.startDate}
              />
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
