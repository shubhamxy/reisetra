import { CursorPaginationDTO } from "src/common/dto";
import { Address } from "../entity";

type Excluded = "id" | "active" | "createdAt" | "updatedAt" | "userId";

export class GetAllAddressDto extends CursorPaginationDTO {}

export class CreateAddressDto implements Omit<Address, Excluded> {
  fullname: string;
  address: string;
  town: string;
  region: string;
  nearby: string;
  zipcode: string;
  city: string;
  country: string;
}

export class UpdateAddressDto implements Omit<Address, Excluded> {
  fullname: string;
  address: string;
  town: string;
  region: string;
  nearby: string;
  zipcode: string;
  city: string;
  country: string;
}
