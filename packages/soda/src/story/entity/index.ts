import { Prisma, Story as StoryModel } from ".prisma/client";

export class Story implements StoryModel {
  constructor(partial: Partial<StoryModel>) {
    Object.assign(this, partial);
  }

  id: string
  title: string
  description: string | null
  body: Prisma.JsonValue
  published: boolean
  userId: string | null
  tags: string[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}
