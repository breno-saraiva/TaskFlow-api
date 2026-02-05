export class CreateUserDto {
  username: string;
  password: string;
}

export class UserDto {
  id: string;
  username: string;
  password: string;
}

export class CreateUserResponse {
  id: string;
  username: string;
}
