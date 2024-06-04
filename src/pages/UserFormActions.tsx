import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import Header from '../components/Header';
import { ContainerDiv } from '../components/shared/GlobalStyle';
import { ContainerSection } from '../components/shared/StyledComponets';
import UserForm from '../components/userForm/UserForm';
import { Employee } from '../interfaces/employee.interface';

const UserFormActions = () => {
  const { id } = useParams<{ id: string }>();
  const [isEditing, setIsEditing] = useState(false);

  const [userToEdit, setUserToEdit] = useState<Employee | null>(null);
  const { users } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const findUser = users.find((room) => room._id === id);
      if (!findUser) return;
      setUserToEdit(findUser);
    }
  }, [id, users]);
  return (
    <ContainerSection>
      <Header title={isEditing ? 'Edit User' : 'Add User'} />
      <ContainerDiv>{isEditing ? <UserForm user={userToEdit} /> : <UserForm />}</ContainerDiv>
    </ContainerSection>
  );
};

export default UserFormActions;
