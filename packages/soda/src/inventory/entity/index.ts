import { Inventory as InventoryModel } from ".prisma/client";

export class Inventory implements InventoryModel {
    id: string;
    stockQuantity: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    sku: string;
    constructor(partial: Partial<InventoryModel>) {
        Object.assign(this, partial);
    }
}
