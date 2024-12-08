"use client";

import Link from "next/link";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Hits, Pagination, SearchBox } from "react-instantsearch";
import { useEffect, useState } from "react";
import { algoliasearch } from "algoliasearch";
import { ProductHit } from "@/app/productHit";
import axios from "axios";

// Les identifiants pour accéder au compte algoliaSearch. Pour la base de données, j'ai utilisé chatGPT qui m'a édité un JSON que j'ai injecté dans Algolia
const searchClient = algoliasearch(
    "GBAEEY3Q9G", // Application ID
    "48b9628fcab899a57b449df296321bfa" // Clé de recherche publique
);

const SearchPage = () => {

    // On initialise un panier en lui créant un état local. C'est un tableau d'objets vide. Le "any" lui permettra d'accueillir plusieurs
    // structures d'objets, en vue d'une amélioration (ajout de catégories, quantités en stock, etc.)
    const [panier, setPanier] = useState<any[]>([]);
    // Je stocke mon cartID ici pour le transmettre aux autres composants (ici productsHits) afin de communiquer avec le back ensuite
    const [cartId, setCartId] = useState(null)

    // Le useEffect sans dépendance permet de le déclencher seulement au premier rendu de la page.
    // @ todo : L'idCart est géré de 2 façons différentes. Il est inutile de le mettre en état local si on peut le récupérer dans le localStorage.
    useEffect(() => {
        // Ce if else permet de ne pas recréer de panier lorsqu'on retourne sur la page en revenant du panier
        const createCart = async () => {
            try {
                // requête axios pour récupérer le panier en back
                const res = await axios.post("http://localhost:4000/cart");
                // je stocke ici l'id du panier pour le récupérer sur "/cart" ensuite
                localStorage.setItem("cartId", res.data.id)
                // je modifie l'état local de l'iCart
                setCartId(res.data.id);
            } catch (error) {
                console.error("err :", error);
            }
        };

        // @ todo : Il faudrait modifier ce en if(!localStorage.get("cartId")
        if (!cartId) {
            createCart();
        } else {
            // S'il y a un cartId ça veut dire que le panier a déjà été créé et qu'on doit récupérer en back
            const fetchCart = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/cart/${cartId}`);
                    // On modifie l'état local du panier pour le passer ensuite au composant d'Algolia
                    setPanier(res.data.items);
                } catch (error) {
                    console.error("Erreur lors du chargement du panier", error);
                }
            };
            fetchCart();
        }
    }, [cartId]);

    return (
        // Ne maîtrisant pas Tailwind, j'ai fait faire le style pas ChatGPT
        // Je lui ai donné mon idée du concept de la Fourch-ette et l'esprit du magasin et je lui ai demandé de générer les textes
        <div className="min-h-screen bg-amber-50 py-12 px-6 sm:px-16">
            {/*@todo : ne pas mettre en flex pour que les div soient en-dessous les unes des autres, pour pouvoir mettre 4 articles par lignes et ainsi respecter les specs*/}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
                <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-brown-900 mb-6">
                        Bienvenue sur la page de recherche de La Fourch-ette
                    </h1>
                    <p className="text-xl text-brown-700 mb-8">
                        Découvre des produits sains, bio et éthiques, pour une consommation
                        plus responsable et respectueuse de la planète. 🌍✨
                    </p>
                    <div className="bg-green-200 p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-green-900 mb-4">
                            La Fourch-ette, ton alliée bio !
                        </h2>
                        <p className="text-lg text-brown-600 mb-4">
                            La Fourch-ette te propose une sélection de produits soigneusement
                            choisis, pour un quotidien plus écologique et plus sain. 🌱 Fini
                            les produits chimiques et emballages plastiques ! Ici, c’est le
                            bio qui prime, pour une planète plus verte et plus belle.
                        </p>
                    </div>
                    <nav className="mt-8">
                        {/* Ici ce lien va ouvrir la page /localhost:3000/cart. Link permet de précharger les pages */}
                        {/* @ todo : amélioration possible en envoyant sur cart?id pour y récupérer ensuite l'idCart directement */}
                        <Link
                            href="/cart"
                            className="text-green-700 hover:text-green-900 text-lg font-medium"
                        >
                            Voir ton panier
                        </Link>
                    </nav>
                </div>

                <div className="flex-1 bg-white rounded-lg shadow-lg p-8">
                    <h1 className="text-4xl font-bold text-brown-900 mb-6">
                        Tu peux faire une recherche parmi nos articles ici
                    </h1>
                    <p className="text-lg text-brown-600">
                        Explore nos catégories pour trouver des produits adaptés à tes
                        besoins et à ton mode de vie. 🌾✨
                    </p>

                    {/* Composants Algolia pour la recherche*/}
                    {/*@todo :Barre de recherche à améliorer. Que ce soit en style comme en fonctionnalité. On ne voit pas bien la barre de recherche, ça mériterait une border*/}
                    {/*@todo: Deux croix pour fermer la recherche. Se renseigner mieux sur les composants InstantSearchNext et SearchBox, ça semble faire doublon sur les fonctionnalité*/}
                    <InstantSearchNext indexName="products" searchClient={searchClient}>
                        <div className="container mx-auto p-4">
                            <div className="mb-4">
                                <SearchBox />
                            </div>
                            {/*Liste retournée par la SearchBox*/}
                            <div>
                                <Hits
                                    hitComponent={(props) => (
                                        // Je passe les props suivantes pour gérer l'ajout et suppression des produits dans le panier
                                        <ProductHit {...props} panier={panier} setPanier={setPanier} cartId={cartId}/>
                                    )}
                                />
                            </div>
                            <div className="mt-6">
                                {/*J'ai seulement commencé l'implémentation de la pagination pour voir à quoi ça ressemble, je n'ai pas eu le temps de la configurer*/}
                                <Pagination />
                            </div>
                        </div>
                    </InstantSearchNext>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
