import { heroes } from "./heroes";

const getHeroeById = (id) => {
    return heroes.find(element => element.id === id);
}

//console.log(getHeroeById(2));
/*
const getHeroeByOwner = (owner) => heroes.filter((element) => element.owner === owner);
*/
//console.log(getHeroeByOwner('DC'));

export default getHeroeById;