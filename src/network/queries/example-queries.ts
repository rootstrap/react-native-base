//
//
//
//
// THIS IS NOT FUNCTIONAL, JUST FOR EXAMPLE PURPOSES, REMOVE WHEN NOT NEEDED
//
//
//
import { useMutation, useQuery } from '@tanstack/react-query';

import type { AxiosResult } from 'network/models/axios';
import { ExampleResponse } from 'network/models/example-models';
import ExampleService from 'network/services/example-services';

export const GET_EXAMPLE = 'get-example';

const useGetExample = (id: string) => useQuery([GET_EXAMPLE, id], () => ExampleService.get(id));

const usePostExample = ({ onError, onSuccess }: AxiosResult<ExampleResponse>) =>
  useMutation(ExampleService.post, {
    onError,
    onSuccess,
  });

export { useGetExample, usePostExample };
