import { del, get, post, put } from "../../utils/http";
import pickBy from "lodash.pickby";
import identity from "lodash.identity";
const queryString = require("query-string");

export interface CreateStoryDTO {
  title: string;
  description: string;
  body: any[];
  published: boolean;
  files: any[]
  tags: string[]
}

export function getStory({ queryKey }: { queryKey: [string, string] }) {
  return get(`story/${queryKey[1]}`);
}

export function createStory(body: CreateStoryDTO) {
  return post("story", body);
}

export function deleteStory(id: string) {
  return del(`story/${id}`);
}

export function updateStory({
  storyId,
  body,
}: {
  storyId: string;
  body: CreateStoryDTO;
}) {
  return put(`story/${storyId}`, body);
}

interface PaginationParams {
  [key: string]: string;
  size?: string;
  buttonNum?: string;
  cursor?: string;
  orderBy?: string;
  orderDirection?: "desc" | "asc";
}

export function getStories(params: PaginationParams) {
  const qs = queryString.stringify(pickBy(params, identity));
  return get(`stories?${qs}`);
}
