import { getCustomRepository } from "typeorm";
import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IAddressRequest {
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
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
