import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAnimalSmall } from "../models/IAnimalsSmall";
import fallbackImage from "../assets/NoImage.jpg"; 
import placeholderImage from "../assets/loading-placeholder.png";
import { IAnimal } from "../models/IAnimal";
import "../style/main.scss";


interface IAnimalProps {
  animalData: IAnimalSmall;
}

export const Animal = (props: IAnimalProps) => {
  
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false); 
  const [errorOccurred, setErrorOccurred] = useState(false);

  const showAnimalDetails = () => {
    navigate(`/animal/${props.animalData.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true); 
  };

  const handleImageError = () => {
    setErrorOccurred(true);
  };

  function isAnimalFeed() {
    const animalsData = localStorage.getItem('Animals');
    if (animalsData) {
      const animalsarray = JSON.parse(animalsData);
      const animal = animalsarray.find((animal: IAnimal) => animal.id === Number(props.animalData.id)) || null;
      if (animal) {
        const lastFedTime = new Date(animal.lastFed);
        const currentTime = new Date();
        const timeDifferenceInMs = currentTime.getTime() - lastFedTime.getTime();
        const timeDifferenceInHours = timeDifferenceInMs / (1000 * 60 * 60);
        if (timeDifferenceInHours > 3) {
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="animal-card" onClick={showAnimalDetails}>
      <h4 className="animal-card__title">{props.animalData.name}</h4>
      <div className="animal-card__image-container">
  {!imageLoaded && (
    <div className="animal-card__placeholder">Loading...</div>
  )}
  <img
    src={errorOccurred ? fallbackImage : (props.animalData.imageUrl || placeholderImage)}
    alt={props.animalData.name}
    className={`animal-card__image ${!imageLoaded ? 'animal-card__image--hidden' : ''}`}
    onLoad={handleImageLoad}
    onError={handleImageError}
  />
</div>

      <p className="animal-card__desc">{props.animalData.shortDescription}</p>
      <p className="animal-card__food-time">
        {isAnimalFeed() ? (
          <span className="animal-card__status animal-card__status--fed">{props.animalData.name} är mätt</span>
        ) : (
          <span className="animal-card__status animal-card__status--hungry">{props.animalData.name} är hungrig</span>
        )}
      </p>
      <button className="animal-card__btn-read-more" onClick={showAnimalDetails}>
        Läs mer
      </button>
    </div>
  );
};
