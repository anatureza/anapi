import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "../../repositories/UsersRepository";
import { AddressesRepository } from "../../repositories/AddressesRepository";

import moment from "moment";

interface IUserRequest {
  user_id: string;
  name: string;
  phone_number: string;
  birth_date: string;
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

    const formatBirthDate = moment(birth_date);

    if (!formatBirthDate.isValid()) {
      throw new Error("Invalid Data Input");
    }

    if (formatBirthDate.isSameOrAfter(moment(moment(), "YYYY-MM-DD"))) {
      throw new Error("Invalid Date");
    }

    try {
      await usersRepository.update(
        { id: user_id },
        {
          name,
          phone_number,
          birth_date: formatBirthDate.toDate(),
          authorizes_image,
        }
      );

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
    } catch (error) {
      throw new Error(`User Could Not Be Edited (${error})`);
    }

    const updatedUser = await usersRepository.findOne(user_id, {
      relations: ["address"],
    });

    return classToPlain(updatedUser);
  }
}

export { EditUserService };
