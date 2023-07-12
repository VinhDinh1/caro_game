import styled from "styled-components";
import { ButtonBase } from "../../buttonBase/ButtonBase";
import Modal from 'react-modal';
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Mess = (props: any) => {

  const { t } = useTranslation();

  return (
    <Modal
      isOpen={props.openModal}
      style={customStyles}
      onRequestClose={props.onClose}
    >
      <h1>{props.message}</h1>
      <div>
        <ButtonBase type="button" onClick={props.newGame}>
          {t("modal.restart")}
        </ButtonBase>
        <ButtonBase type="button" onClick={props.onClose}>
          {t("modal.close")}
        </ButtonBase>
      </div>
    </Modal>
  );
};
export default Mess;
