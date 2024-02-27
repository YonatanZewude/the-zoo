import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { IAnimal } from "../models/IAnimal";
import { IAnimalSmall } from "../models/IAnimalsSmall";
import { getAnimals } from "../services/animalService";
import fallbackImage from "../assets/NoImage.jpg"; 
import placeholderImage from "../assets/loading-placeholder.png";

import "../style/main.scss";

export const AnimalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedPet, setSelectedPet] = useState<IAnimal | null>(null);
  const [allAnimals, setAllAnimals] = useState<IAnimal[]>([]);
  const [lastFedTime, setLastFedTime] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  useEffect(() => {
    const fetchAnimals = async () => {
      if (id) {
        const response: IAnimalSmall[] = await getAnimals();
        if (response) {
          const animalData: IAnimal[] = response.map((animalSmall: IAnimalSmall) => ({
            id: animalSmall.id,
            name: animalSmall.name,
            imageUrl: animalSmall.imageUrl,
            longDescription: '',
            yearOfBirth: 0,
            medicine: '',
            isFed: false,
            lastFed: '',
          }));
          setAllAnimals(animalData);
        }
      }
    };

  }