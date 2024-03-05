import { IFilter } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const SearchByUseCase = async (
  searchBy: IFilter["searchBy"],
  repository: Repository
): Promise<void> => {
  try {
    await repository.updateSearchBy(searchBy);
  } catch (error) {
    throw error;
  }
};
