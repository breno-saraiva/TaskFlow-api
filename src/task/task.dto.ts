export class CreateTaskDto {
  title: string;
  description: string;
  status: string;
  expirationDate: string;
}
export class TaskDto extends CreateTaskDto {
  id: string;
}

export class FindAllParameters {
  title: string;
  status: string;
}
