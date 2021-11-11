import { getCustomRepository } from "typeorm";

import { AddressesRepository } from "../../repositories/AddressesRepository";

import { AddressFederativeUnits } from "../../entities/Address";

interface IAddressRequest {
  id: string;
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
  uf?: string;
}

class EditAddressService {
  async execute({
    id,
    place,
    number,
    complement,
    neighborhood,
    zip,
    city,
    uf = "NONE",
  }: IAddressRequest) {
    const addressesRepository = getCustomRepository(AddressesRepository);

    const address = await addressesRepository.findOne({ id });

    if (!address) {
      throw new Error("Address Not Found");
    }

    const zipFormatted = zip.replace(/\D/g, "");

    const validateCEP = /^[0-9]{8}$/;

    if (zipFormatted !== "") {
      if (!validateCEP.test(zipFormatted)) {
        throw new Error("ZIP/CEP Format is not Accepted");
      }
    } else {
      throw new Error("Invalid ZIP/CEP");
    }

    if (uf === "") {
      uf = "none";
    }

    uf = uf.trim().toUpperCase();
    const enumUF = AddressFederativeUnits[uf];

    try {
      await addressesRepository.update(
        { id },
        {
          place,
          number,
          complement,
          neighborhood,
          zip: zipFormatted,
          city,
          uf: enumUF,
        }
      );

      const updatedAddress = await addressesRepository.findOne({ id });

      return updatedAddress;
    } catch (error) {
      throw new Error(`Address Could Not Be Edited (${error})`);
    }
  }
}

export { EditAddressService };
