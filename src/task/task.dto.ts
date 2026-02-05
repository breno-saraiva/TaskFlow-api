export class CreateTaskDto {
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}
export class TaskDto extends CreateTaskDto {
  id: string;
}

export class FindAllParameters {
  title: string;
  status: string;
}
