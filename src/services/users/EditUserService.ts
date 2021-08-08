import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "../../repositories/UsersRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";

interface IUserRequest {
  user_id: string;
  name: string;
  phone_number: string;
  birth_date: Date;
  authorizes_image: boolean;
}

interface IUserAddressRequest {
  place: string;
  number: number;
  complement: string;
  neighborhood: string;
  zip: number;
  city: string;
}

class EditUserService {
  async execute(
    { user_id, name, phone_number, birth_date, authorizes_image }: IUserRequest,
    { place, number, complement, neighborhood, zip, city }: IUserAddressRequest
  ) {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressesRepository = getCustomRepository(AddressesRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new Error("User Not Found");
    }

    try {
      const address = await usersRepository.findOneOrFail({
        id: user.address_id,
      });

      const updatedUserData = Object.assign(user, {
        name,
        phone_number,
        birth_date,
        authorizes_image,
      });

      const updatedAddressData = Object.assign(address, {
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
      });

      const updatedUser = await usersRepository.save(updatedUserData);
      const updatesAddress = await addressesRepository.save(updatedAddressData);

      return classToPlain([updatedUser, updatesAddress]);
    } catch (error) {
      throw new Error(`User Could Not Be Edited (${error})`);
    }
  }
}

export { EditUserService };
