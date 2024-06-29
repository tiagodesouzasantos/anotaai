export interface CardListResponseInterface {
    id: number;
    title: string;
    description: string;
    img: string;
    type: string;
}

interface TypeCardsInterface {
     [key: string]: { label: string; color: string; };
}

export const typeCards: TypeCardsInterface = {
    "1": {
        label: "Paisagem",
        color: "blue"
    },
    "2": {
        label: "Flor",
        color: "pink"
    },
    "3": {
        label: "Pizza",
        color: "light-brown"
    }
};
