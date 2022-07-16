import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import {Modal} from "../Modal";
import { Input } from "../Input";
import { FoodProps } from "../../pages/Dashboard";

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  editingFood: FoodProps;
  handleUpdateFood: (food: FoodProps) => Promise<void>;
}

export function ModalEditFood({editingFood,handleUpdateFood,isOpen,setIsOpen}:ModalEditFoodProps){

  const handleSubmit =async (data: FoodProps) => {
    data.id = editingFood.id
    data.available = editingFood.available
    handleUpdateFood(data);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form
          onSubmit={handleSubmit}
          initialData={editingFood}
        >
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  
}

