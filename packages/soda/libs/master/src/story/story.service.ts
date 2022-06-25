import { Injectable } from '@nestjs/common'
import {
  CursorPagination,
  CursorPaginationResultInterface,
  AppError,
  errorCodes,
} from '@app/core'
import { DbService } from '@app/db'
import { CacheService } from '@app/cache'
import { prismaOffsetPagination } from '@app/utils'
import { CreateStoryDTO, UpdateStoryDTO } from './dto'
import { StoryRO } from './interfaces'

@Injectable()
export class StoryService {
  constructor(
    private readonly db: DbService,
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
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'story',
        prisma: this.db,
        where: {
          userId,
          active: true,
        },
        include: {
          files: {
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      return result
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'StoryService.getStories'
      )
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
        orderBy = 'createdAt',
        orderDirection = 'desc',
      } = options
      const result = await prismaOffsetPagination({
        cursor,
        size: Number(size),
        buttonNum: Number(buttonNum),
        orderBy,
        orderDirection,
        model: 'story',
        prisma: this.db,
        where: {
          active: true,
        },
        include: {
          files: {
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      return result
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'StoryService.getAllAddresss'
      )
    }
  }

  async getStory(slug: string): Promise<any> {
    const story = await this.db.story.findUnique({
      where: { slug },
      include: {
        files: {
          select: {
            url: true,
            fileType: true,
          },
        },
      },
    })
    if (!story) {
      throw new AppError('Story does not exist', errorCodes.RecordDoesNotExist)
    }
    return story
  }

  async createStory(userId: string, data: CreateStoryDTO): Promise<any> {
    try {
      const product = await this.db.story.create({
        data: {
          ...data,
          userId: userId,
        },
        include: {
          files: {
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      return product
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'StoryService.createStory'
      )
    }
  }

  async updateStory(slug: string, update: UpdateStoryDTO): Promise<any> {
    try {
      const data = await this.db.story.update({
        where: { slug },
        data: update,
        include: {
          files: {
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'StoryService.updateStory'
      )
    }
  }

  async deleteStory(slug: string): Promise<any> {
    try {
      const data = await this.db.story.update({
        where: { slug },
        data: {
          active: false,
        },
        include: {
          files: {
            select: {
              url: true,
              fileType: true,
            },
          },
        },
      })
      return data
    } catch (error) {
      throw new AppError(
        error?.meta?.cause || error.message,
        error.code,
        'StoryService.deleteStory'
      )
    }
  }
}
