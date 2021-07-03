import { HttpStatus, Injectable } from "@nestjs/common";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CartItemRO } from "./interfaces";
import {
  CheckoutDto,
  CreateOfferDto,
  DeleteOfferDto,
  UpdateCartItemDto,
  UpdateOfferDto,
} from "./dto";
import { TransactionService } from "src/transaction/transaction.service";
import { CartItem, Order, Product } from ".prisma/client";
import { errorCodes } from "src/common/codes/error";
import { Offer } from "./entity";


function calculateBilling(
  cartItemsWithProduct: {
    quantity: number;
    product: {
      price: number;
      tax: number;
      mrp: number;
      taxCode?: string;
    };
  }[],
  offer: Offer | null
) {
  let subTotal = 0;
  let tax = 0;
  let shipping = 0;
  cartItemsWithProduct.forEach((item) => {
    let itemPrice = item.quantity * item.product.price;
    subTotal += itemPrice;
    tax += (Number(itemPrice) * Number(item.product.tax || 18.5)) / 100;
  });
  let total = subTotal + tax + shipping;
  let itemDiscount = offer ? (total * (+offer.value || 0)) / 100 : 0;
  let grandTotal = (total - itemDiscount) | 0; // convert to int

  return {
    subTotal,
    tax,
    shipping,
    itemDiscount,
    total,
    promo: offer ? offer.label : null,
    discount: (total - grandTotal) / total * 100,
    grandTotal,
  };
}
@Injectable()
export class CartService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: CacheService,
    private readonly txn: TransactionService
  ) {}
  async getAllCarts(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<CartItemRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        include: {
          items: true,
        },
        model: "cart",
        prisma: this.db,
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "CartService.getAllCarts"
      );
    }
  }

  async getCart(cartId: string, promo: string): Promise<any> {
    try {
      const cart = await this.db.cart.findUnique({
        where: {
          id: cartId,
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    select: {
                      url: true,
                    }
                  },
                },
              },
            },
          },
        },
      });
      if (!cart) {
        throw new CustomError(
          "Cart not found",
          errorCodes.CartNotFound,
          "UserService.getAllCarts"
        );
      }
      const offer = promo ? await this.db.offer.findFirst({where: {AND: {label: promo, active: true, type: "promo"}}, rejectOnNotFound: false}) : null;
      const billing = calculateBilling(cart.items, offer);
      return {
        ...cart,
        ...billing,
      };
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "CartService.getAllCarts"
      );
    }
  }

  async getCartItem(cartId: string, productId: string): Promise<any> {
    try {
      const cart = await this.db.cartItem.findUnique({
        where: {
          productId_cartId: {
            cartId,
            productId,
          },
        },
      });
      return cart;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.getCartItem"
      );
    }
  }

  async updateCart(
    cartId: string,
    productId: string,
    update: UpdateCartItemDto
  ): Promise<any> {
    try {
      const data = this.db.cart.update({
        where: {
          id: cartId,
        },
        include: {
          items: true,
        },
        data: {
          items: {
            upsert: {
              create: {
                productId,
                quantity: update.quantity,
                size: update.size,
                color: update.color,
              },
              update: {
                quantity: update.quantity,
                size: update.size,
                color: update.color,
              },
              where: {
                productId_cartId: {
                  productId,
                  cartId,
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.addCartItem"
      );
    }
  }

  async removeCartItem(cartId: string, productId: string): Promise<any> {
    try {
      const data = await this.db.cart.update({
        where: { id: cartId },
        select: { id: true },
        data: {
          items: {
            delete: {
              productId_cartId: {
                cartId,
                productId,
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.removeCartItem"
      );
    }
  }

  async checkoutCart(
    userId: string,
    checkout: CheckoutDto
  ): Promise<
    Order & {
      razorpayOptions: Record<string, any>;
    }
  > {
    try {
      // @TODO: OPTIMIZE THIS ... too slow :(
      const userCart = await this.db.cart.findFirst({
        where: {
          AND: {
            id: checkout.cartId,
            userId: userId,
          },
        },
        select: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!userCart) {
        throw new CustomError(
          "Cart not found",
          errorCodes.CartNotFound,
          "UserService.removeCartItem"
        );
      }

      if (userCart.items.length === 0) {
        throw new CustomError(
          "Cart is empty",
          errorCodes.CartIsEmpty,
          "UserService.removeCartItem"
        );
      }

      const offer = checkout.promo ? await this.db.offer.findFirst({where: {AND: {label: checkout.promo, active: true, type: "promo"}}, rejectOnNotFound: false}) : null;
      const billing = calculateBilling(userCart.items, offer);

      const user = await this.db.user.update({
        where: { id: userId },
        data: {
          orders: {
            create: {
              ...checkout,
              ...billing,
            },
          },
        },
        include: {
          orders: {
            include: {
              address: true,
              transaction: true,
            },
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

      return this.txn.createTransaction(user);
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.removeCartItem"
      );
    }
  }

  async getOffers(label: string, type: string): Promise<any> {
    try {
      const offers = await this.db.offer.findFirst({
        rejectOnNotFound: true,
        where: {
          label: label,
        },
      });
      return offers;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "UserService.getOffers"
      );
    }
  }

  async createOffers(data: CreateOfferDto[]): Promise<any> {
    try {
      const offers = await this.db.offer.createMany({
        data: data,
      });
      return offers;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.findAllOffset"
      );
    }
  }

  async updateOffers(data: UpdateOfferDto[]): Promise<any> {
    try {
      // TODO: find beter way??
      const update = await Promise.all(
        data.map((offer) => {
          return this.db.offer.update({
            where: { label: offer.label },
            data: {
              value: offer.value,
            },
          });
        })
      );
      return update;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.updateCategories"
      );
    }
  }

  async deleteOffers(data: DeleteOfferDto[]): Promise<any> {
    try {
      const deleted = await this.db.offer.updateMany({
        where: {
          label: { in: data.map((item) => item.label) },
        },
        data: {
          active: false,
        },
      });
      return deleted;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "ProductService.deleteTags"
      );
    }
  }
}
