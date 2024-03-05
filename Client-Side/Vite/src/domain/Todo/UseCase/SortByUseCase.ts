import { IFilter } from "../Model/TodoModel";
import { Repository } from "../Repository/Repository";

export const SortByUseCase = async (
  sortBy: IFilter["sortBy"],
  repository: Repository
): Promise<void> => {
  try {
    await repository.updateSortBy(sortBy);
  } catch (error) {
    throw error;
  }
};
