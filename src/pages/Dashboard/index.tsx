import { useState } from "react";

import { Header } from "../../components/Header";

import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import { useEffect } from "react";
import { api } from "../../services/api";

export interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

export default function Dashboard() {
  const [foods, setFoods] = useState<FoodProps[]>([]);
  const [editingFood, setEditingFood] = useState<FoodProps>({} as FoodProps);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  async function componentDidMount() {
    await api.get("/foods/").then((response: any) => setFoods(response.data));
  }
  useEffect(() => {
    componentDidMount();
  }, []);

  const handleAddFood = async (newFood: FoodProps) => {
    newFood.id = foods.length + 2;
    newFood.available = false;
    const updatedFoods = [...foods, newFood];
    setFoods(updatedFoods);
    try {
      const response = await api.post("/foods", {
        ...foods,
        newFood,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateFood = async (food: FoodProps) => {
    setEditingFood(food);
    const foodsUpdated = foods.map((f) =>
      f.id !== editingFood.id ? f : food
    );
    setFoods(foodsUpdated);
    
    try {
      const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
        ...editingFood,
      });
      console.log(foodUpdated)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteFood = async (id: Number) => {
    const foodsFiltered = foods.filter((food) => food.id !== id);
    setFoods(foodsFiltered);
    await api.delete(`/foods/${id}/`);
  };

  const toggleModal = () => {
    setModalOpen((curr) => !curr);
  };
  const toggleEditModal = () => {
    setEditModalOpen((curr) => !curr);
  };
  const handleEditFood = (food: any) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };
  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food) => (
            <Food
              key={food.id.toString()}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
