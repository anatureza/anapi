import { EntityRepository, Repository } from "typeorm";
import { Address } from "../entities/Address";

@EntityRepository(Address)
class AddressesRepository extends Repository<Address> {}

export { AddressesRepository };
