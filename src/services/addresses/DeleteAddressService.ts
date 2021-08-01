import { getCustomRepository } from "typeorm";
import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IAddressRequest {
  id: string;
}

class DeleteAddressService {
  async execute({ id }: IAddressRequest) {
    const addressesRepository = getCustomRepository(AddressesRepository);

    const address = await addressesRepository.findOne({ id });

    if (!address) {
      throw new Error("Address Id does not exist!");
    }

    return await addressesRepository.delete({ id });
  }
}

export { DeleteAddressService };
