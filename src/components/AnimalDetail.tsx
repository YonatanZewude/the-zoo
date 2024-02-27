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

    const animalsFromLocalStorage = localStorage.getItem('Animals');
    if (animalsFromLocalStorage) {
      setAllAnimals(JSON.parse(animalsFromLocalStorage));
    } else {
      fetchAnimals();
    }
  }, [id]);

  useEffect(() => {
    const currentAnimal = allAnimals.find((animal) => animal.id === Number(id)) || null;

    if (currentAnimal) {
      setLastFedTime(currentAnimal.lastFed);
      setSelectedPet(currentAnimal);

      const lastFeedTime = new Date(currentAnimal.lastFed);
      const currentTime = new Date();

      const timeDifferenceInMs = currentTime.getTime() - lastFeedTime.getTime();
      const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);

      setIsButtonDisabled(timeDifferenceInHours <= 3);
    }
  }, [allAnimals, id]);

 
  const handleFeedClick = () => {
    const currentTime = new Date();
    const currentTimeAsString = currentTime.toString();

    const updatedTime = allAnimals.map((animal) => {
      if (animal.id === selectedPet?.id) {
        return {
          ...animal,
          isFed: true,
          lastFed: currentTimeAsString,
        };
      }
      return animal;
    });

    localStorage.setItem('Animals', JSON.stringify(updatedTime));
    setAllAnimals(updatedTime);
    setIsButtonDisabled(true);
    setLastFedTime(currentTimeAsString);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setErrorOccurred(true);
  };

  const formattedLastFedTime = new Date(lastFedTime).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      <div className="animal-detail">
        <div className="animal-detail__image">
          <img
            src={errorOccurred ? fallbackImage : selectedPet?.imageUrl || placeholderImage}
            alt={selectedPet?.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
          {!imageLoaded && (
            <div className="animal-detail__placeholder">Loading...</div>
          )}
        </div>
        <div className="animal-detail__text-container">
          <h2 className="animal-detail__name">{selectedPet?.name}</h2>
          <p className="animal-detail__desc">{selectedPet?.longDescription}</p>
          <p className="animal-detail__birthday">
            <span className="animal-detail__label">Födelse år: </span>
            {selectedPet?.yearOfBirth}
          </p>
          <p className="animal-detail__medicine">
            <span className="animal-detail__label">Medicin: </span>
            {selectedPet?.medicine}
          </p>
          <p className="animal-detail__last-fed">
            <span className="animal-detail__label">Matades sist: </span>
            {formattedLastFedTime}
          </p>
          <button
            className="animal-detail__btn"
            disabled={isButtonDisabled}
            onClick={handleFeedClick}
          >
            {isButtonDisabled ? 'Kom tillbaka om 3 timmar' : `Mata ${selectedPet?.name}`}
          </button>
        </div>
      </div>
    </>
  );
};
