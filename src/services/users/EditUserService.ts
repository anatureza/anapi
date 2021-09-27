import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "../../repositories/UsersRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";

import moment from "moment";

interface IUserRequest {
  user_id: string;
  name: string;
  phone_number: string;
  birth_date: Date;
  authorizes_image: boolean;
}

interface IUserAddressRequest {
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
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

    if (moment(birth_date).isSameOrAfter(moment())) {
      throw new Error("Invalid Date");
    }

    try {
      await usersRepository.update(user, {
        name,
        phone_number,
        birth_date: moment(birth_date).format("YYYY-MM-DD"),
        authorizes_image,
      });
      await addressesRepository.update(
        {
          id: user.address_id,
        },
        {
          place,
          number,
          complement,
          neighborhood,
          zip,
          city,
        }
      );

      const updatedUser = await usersRepository.findOne(user_id, {
        relations: ["address"],
      });
      return classToPlain(updatedUser);
    } catch (error) {
      throw new Error(`User Could Not Be Edited (${error})`);
    }
  }
}

export { EditUserService };
