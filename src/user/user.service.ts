import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRegisterDto } from "./dto/user.register.dto";
import { FindOneOptions, Like, Repository } from "typeorm";
import { User } from "./entity/user.entity";
import * as bcrypt from "bcrypt";
import { userActiveStatus } from "./util/user.enum";
import { UserMatchTier } from "src/game/util/game.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findByFields(option: FindOneOptions<User>): Promise<User | null> {
    const user: User | null = await this.userRepository.findOne(option);
    return user;
  }

  async save(userRegisterDto: UserRegisterDto): Promise<UserRegisterDto> {
    if (userRegisterDto.password) {
      await this.transformPassword(userRegisterDto);
    }
    return await this.userRepository.save(userRegisterDto);
  }

  async transformPassword(userRegister: UserRegisterDto): Promise<void> {
    userRegister.password = await bcrypt.hash(userRegister.password, 10);
    return Promise.resolve();
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string | null
  ): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async update(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findUserById(userId: string): Promise<User> {
    console.log("update UserId : ", userId);
    const user: User | null = await this.userRepository.findOne({
      where: { userId },
    });
    if (user === null) {
      throw new Error("user is not defined");
    }
    return user;
  }

  public async findUserByNickname(
    userId: string,
    nickname: string
  ): Promise<User[]> {
    return await this.userRepository
      .createQueryBuilder("user")
      .where("user.nickname LIKE :nickname", { nickname: `%${nickname}%` })
      .andWhere("user.userId != :userId", { userId }) // 현재 유저 제외
      .getMany();
  }

  public async searchUser(nickname: string, page: number): Promise<User[]> {
    const take = 10;
    const skip = (page - 1) * take;
    const searchResult: User[] = await this.userRepository.find({
      where: [{ nickname: Like(`%${nickname}%`) }],
      take: take,
      skip: skip,
    });
    return searchResult;
  }

  public async updateUserActive(userId: string, userActive: userActiveStatus) {
    console.log("updateuseractive: ", userId);
    console.log("useractive: ", userActive);
    const user: User | null = await this.findUserById(userId);
    if (user === null) {
      throw new Error("게임룸에 등록되지 않은 유저가 있습니다.");
    }
    if (
      user.userActive === userActiveStatus.IN_GAME &&
      userActive === userActiveStatus.LOGOUT
    ) {
      console.log("ingame");
      return;
    }
    user.userActive = userActive;
    this.update(user);
  }

  public async updateMmr(userId: string, mmrDiff: number) {
    const user: User | null = await this.findUserById(userId);
    if (user === null) {
      throw new Error("게임룸에 등록되지 않은 유저가 있습니다.");
    }
    user.userMmr += mmrDiff;
    this.update(user);
  }

  async saveUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  determineUserTier(userMmr: number): string {
    if (userMmr < UserMatchTier.SILVER) {
      return "bronze";
    } else if (userMmr < UserMatchTier.GOLD) {
      return "silver";
    } else if (userMmr < UserMatchTier.PLATINUM) {
      return "gold";
    } else if (userMmr < UserMatchTier.DIAMOND) {
      return "platinum";
    } else {
      return "diamond";
    }
  }

  async setUserActiveStatus(
    user: User,
    userActive: userActiveStatus
  ): Promise<User> {
    user.userActive = userActive;
    return await this.saveUser(user);
  }
}
