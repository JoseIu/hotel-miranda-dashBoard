import styled from 'styled-components';
import useAuth from '../hooks/useAuth';
import useMenu from '../hooks/useMenu';

const UserProfile = () => {
  const { userData } = useAuth();
  const { isActived } = useMenu();
  return (
    <UserCard $isActived={isActived}>
      <img src="/images/user2.webp" alt="user profile image" />
      <div>
        <h2>{userData.userName}</h2>
        <span>{userData.userEmail}</span>
        <button>Edit profile</button>
      </div>
    </UserCard>
  );
};

export default UserProfile;

const UserCard = styled.article<{ $isActived: boolean }>`
  padding: 2.1rem 1.5rem;
  position: relative;
  background: var(--bg-gradient);
  box-shadow: var(--box-shadow);
  color: var(--zinc-100);

  border-radius: 1.125rem;
  display: ${(props) => (props.$isActived ? 'none' : 'flex')};
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;

  img {
    position: absolute;
    top: -2rem;
    width: 4.375rem;
    height: 4.375rem;
    border-radius: 0.4rem;
  }
  div {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    row-gap: 0.8rem;
  }
  h2 {
    font-size: 1em;
  }
  span {
    font-size: 0.75em;
    color: #686868;
  }
  button {
    padding: 1rem 2.5rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    background-color: #135846;
    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
