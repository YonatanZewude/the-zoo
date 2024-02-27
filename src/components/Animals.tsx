import { useEffect, useState } from "react";
import { IAnimalSmall } from "../models/IAnimalSsmall";
import { getAnimals } from "../services/animalService";
import { Animal } from "../components/Animal";
import "../style/main.scss";

export const Animals = () => {
    const [animals, setAnimals] = useState<IAnimalSmall[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const animalsData = await getAnimals();
                setAnimals(animalsData);
            } catch (error) {
                console.error("Error fetching animals data:", error);
            }
        };

        if (animals.length === 0) {
            fetchData();
        }
    }, [animals]);

    useEffect(() => {
        const localStorageAnimals = JSON.parse(localStorage.getItem("Animals") || "[]");
        if (localStorageAnimals.length === 0 && animals.length > 0) {
            localStorage.setItem("Animals", JSON.stringify(animals));
        }
    }, [animals]);

    const animalComponents = animals.map((animal) => (
        <Animal animalData={animal} key={animal.id} />
    ));

    return (
        <>
            <h1 className="title"> Welcome To WildWonder Zoo</h1>
            <div className="animals">{animalComponents}</div>
        </>
    );
};
