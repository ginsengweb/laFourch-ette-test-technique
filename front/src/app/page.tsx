"use client";

import Link from "next/link";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Hits, Pagination, SearchBox } from "react-instantsearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { algoliasearch } from "algoliasearch";
import { ProductHit } from "@/app/productHit";

const searchClient = algoliasearch(
    "GBAEEY3Q9G", // Application ID
    "48b9628fcab899a57b449df296321bfa" // Clé de recherche publique
);

const SearchPage = () => {
    const [panier, setPanier] = useState<any[]>([]);  // Initialisation du panier avec un tableau vide
    const [cartId, setCartId] = useState(null)
    // Créer un panier au premier rendu
    useEffect(() => {
        const createCart = async () => {
            try {
                const res = await axios.post("http://localhost:4000/cart");
                localStorage.setItem("cartId", res.data.id)
                setCartId(res.data.id);
            } catch (error) {
                console.error("err :", error);
            }
        };

        if (!cartId) {
            createCart();
        } else {
            const fetchCart = async () => {
                try {
                    const res = await axios.get(`http://localhost:4000/cart/${cartId}`);
                    setPanier(res.data.items);
                } catch (error) {
                    console.error("Erreur lors du chargement du panier", error);
                }
            };
            fetchCart();
        }
    }, [cartId]);

    return (
        <div className="min-h-screen bg-amber-50 py-12 px-6 sm:px-16">
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

                    <InstantSearchNext indexName="products" searchClient={searchClient}>
                        <div className="container mx-auto p-4">
                            <div className="mb-4">
                                <SearchBox />
                            </div>

                            <div>
                                <Hits
                                    hitComponent={(props) => (
                                        <ProductHit {...props} panier={panier} setPanier={setPanier} cartId={cartId}/>
                                    )}
                                />
                            </div>
                            <div className="mt-6">
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
