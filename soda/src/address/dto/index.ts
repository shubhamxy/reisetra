import { CursorPaginationOptionsInterface } from 'src/common/pagination';
import { Order } from '../entity';

type Excluded = 'id' | 'active' | 'createdAt' | 'updatedAt' | 'userId';

export class GetAllAddressDto implements CursorPaginationOptionsInterface {
  size: number;
  buttonNum: number;
  cursor: string;
  orderBy: string;
  orderDirection: 'desc' | 'asc';
}

export class CreateAddressDto implements Omit<Order, Excluded> {
  fullname: string;
  address: string;
  town: string;
  region: string;
  nearby: string;
  zipcode: string;
  city: string;
  country: string;
}

export class UpdateAddressDto implements Omit<Order, Excluded> {
  fullname: string;
  address: string;
  town: string;
  region: string;
  nearby: string;
  zipcode: string;
  city: string;
  country: string;
}
