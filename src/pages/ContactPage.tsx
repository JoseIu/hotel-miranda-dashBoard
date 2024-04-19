import styled from 'styled-components';
import Header from '../components/Header';

const ContactPage = () => {
  return (
    <ContainerSection>
      <Header title={'Contact'} />
      <h2>Contact</h2>
    </ContainerSection>
  );
};

export default ContactPage;

const ContainerSection = styled.section`
  background-color: #171717;
`;
