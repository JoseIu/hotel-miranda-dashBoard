import styled from 'styled-components';
import Header from '../components/Header';

const Contact = () => {
  return (
    <ContainerSection>
      <Header />
      <h2>Contact</h2>
    </ContainerSection>
  );
};

export default Contact;

const ContainerSection = styled.section`
  background-color: #171717;
`;
