import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "../../repositories/UsersRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IUserAddressRequest {
  user_id: string;
  name: string;
  birth_date: Date;
  authorizes_image: boolean;
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: number;
  city: string;
}

class EditUserAddressService {
  async execute({
    user_id,
    name,
    birth_date,
    authorizes_image,
    place,
    number,
    complement,
    neighborhood,
    zip,
    city,
  }: IUserAddressRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    const user = await usersRepository.findOne({ id: user_id });

    const updatedUserData = {
      id: user_id,
      name,
      birth_date,
      authorizes_image,
    };

    const updatedAddressData = {
      id: user.address_id,
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
    };

    const updatedUser = await usersRepository.save(updatedUserData);

    const updatesAddress = await addressesRepository.save(updatedAddressData);

    return classToPlain([updatedUser, updatesAddress]);
  }
}

export { EditUserAddressService };
