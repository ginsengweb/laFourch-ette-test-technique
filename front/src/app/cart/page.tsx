"use client"

import {useEffect, useState} from 'react';
import Link from 'next/link';
import axios from 'axios';

const CartPage = () => {

    const cartId = localStorage.getItem("cartId"); // Ou autre méthode de stockage (localStorage, cookies, etc.)
    const [panier, setPanier] = useState(null)
    const [total, setTotal] = useState(0); // Ajout d'un état pour le total du panier

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/cart/${cartId}`);
                setPanier(res.data.items);

                // Calcul du prix total
                const totalPrice = res.data.items.reduce((sum, item) => sum + (item.price), 0);
                setTotal(totalPrice); // Mise à jour du total du panier

                console.log("testpanier", res, res.data, panier);
            } catch (error) {
                console.error("Erreur lors du chargement du panier", error);
            }
        };
        fetchCart();
    }, [cartId]);

    return (
        <div className="min-h-screen bg-yellow-50 py-12 px-6 sm:px-16">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl p-8">
                <h1 className="text-3xl font-semibold text-brown-800 mb-4">Ton panier</h1>
                <p className="text-lg text-brown-600 mb-6">Voici les articles ajoutés à ton panier.</p>

                {panier && panier.length > 0 ? (
                    panier.map((item, index) => (
                        <div key={index} className="bg-orange-100 p-4 rounded-lg mb-4">
                            <h2 className="text-xl text-brown-900">{item.name}</h2>
                            <p className="text-brown-700">{item.description}</p>
                            <p className="text-brown-600">Quantité: {item.quantity}</p>
                            <p className="text-brown-600">Prix: {item.price}€</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-brown-600">Ton panier est vide.</p>
                )}

                {/* Affichage du prix total */}
                {panier && panier.length > 0 && (
                    <div className="mt-6 text-lg font-semibold text-brown-900">
                        <p>Total : {total}€</p>
                    </div>
                )}

                {/* Lien vers la page de recherche */}
                <nav className="mt-8">
                    <Link href="/" className="text-green-600 hover:text-green-800 text-lg font-medium">
                        Retour à la recherche
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default CartPage;
