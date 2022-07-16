import { OperationVariables, QueryOptions } from "@apollo/client";
import { client } from "./apollo";

export async function ssrQuery<T>(
  options: QueryOptions<OperationVariables, any>
) {
  const { data, loading, error = null } = await client.query<T>(options);

  return {
    data,
    loading,
    error,
  };
}
