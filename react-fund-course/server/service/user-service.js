import userSchema from '../models/user-model.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';

class UserService {
  async registration(email, password) {
    const candidate = await userSchema.findOne({ email });
    if (candidate) {
      throw new Error(`User with email ${email} already exists`);
    }
    console.log(password);
    // const hashPassword = await bcrypt.hash(
    //   password,
    //   process.env.HASH_SALT_ROUNDS,
    //   function (err, hash) {
    //     console.log(hash);
    //   },
    // );
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword);

    const activationLink = uuid.v4();

    const user = await userSchema.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

const userService = new UserService();
export default userService;
