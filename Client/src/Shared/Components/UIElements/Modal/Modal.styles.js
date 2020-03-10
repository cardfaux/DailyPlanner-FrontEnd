import styled from 'styled-components';

export const ModalContainer = styled.div`
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  @media (min-width: 768px) {
    left: calc(50% - 20rem);
    width: 40rem;
  }
`;

export const ModalHeader = styled.header`
  width: 100%;
  padding: 1rem 0.5rem;
  background: #2a006e;
  color: white;
  > h2 {
    margin: 0.5rem;
  }
`;

export const ModalContent = styled.div`
  padding: 1rem 0.5rem;
`;

export const ModalFooter = styled.footer`
  padding: 1rem 0.5rem;
  margin: 1rem;
`;
