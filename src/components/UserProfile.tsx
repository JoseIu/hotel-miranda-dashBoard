import styled from 'styled-components';

const UserProfile = () => {
  return (
    <UserCard>
      <img src="/images/user2.webp" alt="user profile image" />
      <div>
        <h2>William Johanson</h2>
        <span>williamjohn@mail.com</span>
        <button>Contact Us</button>
      </div>
    </UserCard>
  );
};

export default UserProfile;

const UserCard = styled.article`
  padding: 2.1rem 1.5rem;
  position: relative;
  background-color: #292828;
  color: #ebebeb;

  border-radius: 1.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;

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
  }
`;
