import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

import { Button } from "../Button";

import "./modal.css";
import dataBase from "../../server/bancoDeDados";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const tasks = dataBase.buscarTarefas("listas")
 

export const ModalDelete: React.FC<IProps> = ({ isOpen, onClose }) => {
  const  selectId = () => {
    tasks.map((task) => {
      if (task.isSelect === true){
        console.log(task.id);
        
      }  
    })
  }
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size={"xl"} isCentered>
        <ModalOverlay />
        <ModalContent style={{ background: "#263941", color: "white" }}>
          <ModalHeader className="modal_cabeca">
            <h1>Deletar Tarefa</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1>Tens a certeza que deseja eliminar esta tarefa?</h1>
            <p>Este processo é inreverssível.</p>
            
          </ModalBody>
          <ModalFooter>
            <div className="footer">
              <Button handleClickButton={selectId} title="Deletar" />
              <Button handleClickButton={onClose} title="Cancelar" />
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
