import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";

import { UsersRepository } from "../../repositories/UsersRepository";

import moment from "moment";

import { EditAddressService } from "../addresses/EditAddressService";

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
  uf?: string;
}

class EditUserService {
  async execute(
    { user_id, name, phone_number, birth_date, authorizes_image }: IUserRequest,
    {
      place,
      number,
      complement,
      neighborhood,
      zip,
      city,
      uf = "NONE",
    }: IUserAddressRequest
  ) {
    const usersRepository = getCustomRepository(UsersRepository);

    const editAddressService = new EditAddressService();

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

    if (phone_number !== user.phone_number) {
      const phoneNumberAlreadyExists = await usersRepository.findOne({
        phone_number,
      });

      if (phoneNumberAlreadyExists) {
        throw new Error("Phone number is already in use!");
      }
    }

    try {
      await usersRepository.update(user, {
        name,
        phone_number,
        birth_date: formatBirthDate.toDate(),
        authorizes_image,
      });

      await editAddressService.execute({
        id: user.address_id,
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
        uf,
      });

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
