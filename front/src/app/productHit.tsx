import axios from "axios";

export const ProductHit = ({
                               hit,
                               panier,
                               setPanier,
                               cartId
                           }: {
    hit: any;
    panier: any[];
    setPanier: React.Dispatch<React.SetStateAction<any[]>>;
    cartId: string | null;
}) => {
    // Vérifie si l'article est déjà dans le panier
    const isInPanier = Array.isArray(panier) && panier.some((item) => item.objectID === hit.objectID);

    // Fonction pour mettre à jour le panier (ajouter ou supprimer l'article)
    const updateCart = async (item: any) => {
        let updatedPanier;
        if (isInPanier) {
            // Si l'article est déjà dans le panier, on le supprime
            updatedPanier = panier.filter((product) => product.objectID !== item.objectID);
        } else {
            // Si l'article n'est pas dans le panier, on l'ajoute
            updatedPanier = [...panier, item];
        }

        // Mise à jour du panier localement
        setPanier(updatedPanier);

        // Envoi de la mise à jour au backend
        try {
            await axios.post(`http://localhost:4000/cart/${cartId}`, { items: updatedPanier });
            console.log("Panier mis à jour avec succès", updatedPanier);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du panier :", error);
        }
    };

    return (
        <div className="bg-amber-50 border-l-4 border-green-600 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 mb-6">
            {/* Nom du produit */}
            <h3 className="text-2xl font-bold text-green-900 mb-2">{hit.name}</h3>
            {/* Description */}
            <p className="text-green-700 mb-4">{hit.description}</p>
            {/* Prix */}
            <p className="text-lg text-green-800 font-semibold mb-4">{hit.price} €</p>
            {/* Bouton Ajouter/Supprimer */}
            <button
                className={`mt-4 px-6 py-2 rounded-full text-white transition-colors duration-150 shadow-md hover:shadow-lg ${
                    isInPanier
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-700 hover:bg-green-800"
                }`}
                onClick={() => updateCart(hit)}
            >
                {isInPanier ? "Supprimer" : "Ajouter"}
            </button>
        </div>
    );
};
