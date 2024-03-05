import { IFilter } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const SearchTodoUseCase = async (
  search: IFilter["search"],
  repository: Repository
): Promise<void> => {
  try {
    await repository.updateSearchText(search);
  } catch (error) {
    throw error;
  }
};
