import { Injectable } from "@nestjs/common";
import { errorCodes } from "src/common/codes/error";
import {
  CursorPagination,
  CursorPaginationResultInterface,
} from "src/common/pagination";
import { CustomError } from "src/common/response";
import { PrismaService } from "src/common/modules/db/prisma.service";
import { CacheService } from "src/common/modules/cache/cache.service";
import { prismaOffsetPagination } from "src/utils/prisma";
import { CreateStoryDto } from "./dto";
import { StoryRO } from "./interfaces";

@Injectable()
export class StoryService {
  constructor(
    private readonly db: PrismaService,
    private readonly cache: CacheService
  ) {}

  async getStories(
    options: CursorPagination,
    userId: string
  ): Promise<CursorPaginationResultInterface<StoryRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "story",
        prisma: this.db,
        where: {
          userId,
          active: true,
        }
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "StoryService.getStories"
      );
    }
  }

  async getAllStories(
    options: CursorPagination
  ): Promise<CursorPaginationResultInterface<StoryRO>> {
    try {
      const {
        cursor,
        size = 10,
        buttonNum = 10,
        orderBy = "createdAt",
        orderDirection = "desc",
      } = options;
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: "story",
        prisma: this.db,
        where: {
          active: true,
        }
      });
      return result;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "StoryService.getAllAddresss"
      );
    }
  }

  async getStory(id: string): Promise<any> {
    const story = await this.db.story.findUnique({
      where: { id },
    });
    if (!story) {
      throw new CustomError(
        "Story does not exist",
        errorCodes.RecordDoesNotExist
      );
    }
    return story;
  }

  async createStory(userId: string, data: CreateStoryDto): Promise<any> {
    try {
      const product = await this.db.story.create({
        data: {
          ...data,
          userId: userId,
        },
      });
      return product;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "StoryService.createStory"
      );
    }
  }
  async updateStory(addressId: string, update): Promise<any> {
    try {
      const data = await this.db.story.update({
        where: { id: addressId },
        data: update,
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "StoryService.updateStory"
      );
    }
  }

  async deleteStory(addressId: string): Promise<any> {
    try {
      const data = await this.db.story.update({
        where: { id: addressId },
        data: {
          active: false,
        }
      });
      return data;
    } catch (error) {
      throw new CustomError(
        error?.meta?.cause || error.message,
        error.code,
        "StoryService.deleteStory"
      );
    }
  }
}
