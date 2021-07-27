import { getCustomRepository } from "typeorm";
import { AddressRepository } from "../../repositories/AddressRepository";

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
    const addressRepository = getCustomRepository(AddressRepository);

    const address = addressRepository.create({
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    });

    await addressRepository.save(address);

    return address;
  }
}

export { CreateAddressService };
