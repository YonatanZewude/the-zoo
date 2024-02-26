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