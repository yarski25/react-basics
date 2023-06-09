import userSchema from '../models/user-model.js';
import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exceptions/api-error.js';

class UserService {
  async registration(email, password) {
    const candidate = await userSchema.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT_ROUNDS));
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(`hash generated: ${hashPassword}`);

    const activationLink = uuid.v4();
    console.log(`activation link generated: ${activationLink}`);

    const user = await userSchema.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async login(email, password) {
    const user = await userSchema.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} not found`);
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      throw ApiError.BadRequest('User password incorrect');
    }
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }

    const user = await userSchema.findById(userData.id);
    const userDto = new UserDto(user); // id, email, isActivated
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await userSchema.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('activation link incorect');
    }
    user.isActivated = true;
    await user.save();
  }

  async getAllUsers() {
    const users = await userSchema.find();
    return users;
  }
}

const userService = new UserService();
export default userService;
