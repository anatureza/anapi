import { getCustomRepository } from "typeorm";

import { AddressFederativeUnits } from "../../entities/Address";

import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IAddressRequest {
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  uf?: string;
}

class CreateAddressService {
  async execute({
    place,
    number,
    complement,
    neighborhood,
    zip,
    city,
    uf = "NONE",
  }: IAddressRequest) {
    const addressesRepository = getCustomRepository(AddressesRepository);

    uf = uf.trim().toUpperCase();
    const enumUF = AddressFederativeUnits[uf];

    const zipFormatted = zip.replace(/\D/g, "");

    const validateCEP = /^[0-9]{8}$/;

    if (zipFormatted !== "") {
      if (!validateCEP.test(zipFormatted)) {
        throw new Error("ZIP/CEP Format is not Accepted");
      }
    } else {
      throw new Error("Invalid ZIP/CEP");
    }

    try {
      const address = addressesRepository.create({
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
        uf: enumUF,
      });

      await addressesRepository.save(address);

      return address;
    } catch (error) {
      throw new Error(`Error during Address Registration! (${error})`);
    }
  }
}

export { CreateAddressService };
