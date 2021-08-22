import request from "./request";
import { BlogScheme } from "../types";
// CRUD create read update delete
export async function queryBlogList(): Promise<any> {
  return request("/web/blog");
}
export async function queryBlogDetail(params: any): Promise<any> {
  return request(`/web/blog/${params.id}`);
}
export async function createUser(params: any): Promise<any> {
  return request("/web/user", {
    method: "POST",
    data: params,
  });
}
export async function queryMessage(): Promise<any> {
  return request("/web/message");
}

export async function createMessage(params: any): Promise<any> {
  return request("/web/message", {
    method: "POST",
    data: params,
  });
}
export async function queryStatistics(params: any): Promise<any> {
  return request("/web/statistics", {
    method: "GET",
  });
}
