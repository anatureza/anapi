import { EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";

interface IGenerateToken {
  user_id: string;
}

@EntityRepository(UserToken)
class UserTokensRepository extends Repository<UserToken> {
  public async generate({
    user_id,
  }: IGenerateToken): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id: user_id });

    await this.save(userToken);

    return userToken;
  }
}

export { UserTokensRepository };
