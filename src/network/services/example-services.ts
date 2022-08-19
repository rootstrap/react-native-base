//
//
//
//
// THIS IS NOT FUNCTIONAL, JUST FOR EXAMPLE PURPOSES, REMOVE WHEN NOT NEEDED
//
//
//
import client from '../client';
import { ExampleRequest, ExampleResponse } from '../models/example-models';

const ExampleService = {
  get: async (id: string) => {
    const { data } = await client.get<ExampleResponse>(`/examples/${id}`);
    return data;
  },
  post: async (request: ExampleRequest) => {
    const { data } = await client.post<ExampleResponse>('/examples', request);
    return data;
  },
};

export default ExampleService;
