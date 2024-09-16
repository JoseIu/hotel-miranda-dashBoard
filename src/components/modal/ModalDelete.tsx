import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  setModal: (modal: { isOpen: boolean; id: string }) => void;
  handleDelete: () => void;
};

export const ModalDelete = ({ isOpen, setModal, handleDelete }: ModalProps) => (
  <ModalAction $isOpen={isOpen}>
    <div className="modal">
      Are you sure you want to delete this?
      <div className="modal__btns">
        <button className="modal__btn modal__btn--no" onClick={() => setModal({ isOpen: false, id: '' })}>
          No
        </button>
        <button className="modal__btn modal__btn--yes" onClick={handleDelete}>
          Yes
        </button>
      </div>
    </div>
  </ModalAction>
);

const ModalAction = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(0.2rem);
  transition: all 0.3s ease-in;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};

  display: flex;
  align-items: center;
  justify-content: center;

  .modal {
    background-color: var(--zinc-900);
    padding: 2em;
    border-radius: 0.3em;
    display: flex;
    flex-direction: column;
    row-gap: 2em;
    &__btns {
      display: flex;
      justify-content: space-evenly;
    }
    &__btn {
      padding: 0.5em 1em;
      border-radius: 0.3em;
      text-align: center;
      &--no {
        background-color: red;
      }
      &--yes {
        background-color: var(--green);
      }
    }
  }
`;
