import { getCustomRepository } from "typeorm";
import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IAddressRequest {
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: number;
  city: string;
}

class CreateAddressService {
  async execute({
    place,
    number,
    complement,
    neighborhood,
    zip,
    city,
  }: IAddressRequest) {
    const addressesRepository = getCustomRepository(AddressesRepository);

    const address = addressesRepository.create({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    await addressesRepository.save(address);

    return address;
  }
}

export { CreateAddressService };
