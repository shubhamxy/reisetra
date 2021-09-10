import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common'
import { StoryService } from './story.service'
import { CustomException, ROUTES, SuccessResponse } from '@app/core'
import {
  CreateStoryDTO,
  GetAllStoriesDTO,
  GetStoriesDTO,
  UpdateStoryDTO,
} from './dto'
import { AuthenticatedRequest, Public, Role, Roles } from '@app/auth'

@Controller(ROUTES.stories)
export class StoryController {
  constructor(private readonly story: StoryService) {}

  @Public()
  @Get(ROUTES.stories_all)
  async getAllStories(
    @Query() query: GetAllStoriesDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.story.getAllStories(query)
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.getAllStories'
      )
    }
  }

  @Get()
  async getStories(
    @Req() req: AuthenticatedRequest,
    @Query() query: GetStoriesDTO
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.story.getStories(
        query,
        req.user.id
      )
      return { data: results || [], meta: meta }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.getStories'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Post()
  async createStory(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateStoryDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.createStory(request.user.id, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.createStory'
      )
    }
  }

  @Public()
  @Get(ROUTES.stories_by_slug)
  async getStory(@Param('slug') slug: string): Promise<SuccessResponse> {
    try {
      const data = await this.story.getStory(slug)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.getStory'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Put(ROUTES.stories_by_slug)
  async updateStory(
    @Param('storyId') slug: string,
    @Body() body: UpdateStoryDTO
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.updateStory(slug, body)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.updateStory'
      )
    }
  }

  @Roles(Role.ADMIN)
  @Delete(ROUTES.stories_by_slug)
  async deleteStory(@Param('slug') slug: string): Promise<SuccessResponse> {
    try {
      const data = await this.story.deleteStory(slug)
      return { data }
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        'StoryController.deleteStory'
      )
    }
  }
}
