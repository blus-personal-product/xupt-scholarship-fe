import client from '@/client';

export interface CommentData {
  content: string;
  procedure_id: number;
  reply_id: number;
}

export const postComment = (data: CommentData) => {
  return client.post("/comment", data);
}

export interface CommentItem {
  avatar: string;
  content: string;
  create_date: string;
  email: string;
  name: string;
  procedure_id: number;
  reply_id: number;
  user_id: string;
  children: number;
  comment_id: number;
}

export const getComment = (processId: number, reply_id: number = 0) => {
  return client.get<CommentItem[]>(`/comment/${processId}`, {
    reply_id,
  });
}

export const deleteComment = (id: number) => {
  return client.delete(`/comment/${id}`)
}