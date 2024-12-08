import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


// Timing étant trop serré pour découvrir aussi Nest et comprenant les bases ici, j'ai fais compléter service par chatpGPT
// @todo : améliorer le typing et mettre en place des tests. Lire la doc complète pour comprendre et mieux appréhender NestJS

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  id: string;
  quantity: number;
};

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  create(): Cart {
    const newCart: Cart = { id: uuidv4(), items: [] };
    this.carts.push(newCart);
    return newCart;
  }

  getCart(id: string): Cart {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return cart;
  }

  putItem(id: string, item: Item): Cart {
    const cart = this.getCart(id);
    const existingItem = cart.items.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
    return cart;
  }

  putItems(id: string, items: Item[]): Cart {
    const cart = this.getCart(id);
    items.forEach((item) => this.putItem(id, item));
    return cart;
  }
}
