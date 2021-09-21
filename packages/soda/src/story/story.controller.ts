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
} from "@nestjs/common";
import { StoryService } from "./story.service";
import { CustomException, SuccessResponse } from "src/common/response";
import { CreateStoryDto, GetStoriesDto, GetAllStoriesDto, UpdateStoryDto } from "./dto";
import { AuthenticatedRequest } from "src/auth/auth.interface";

@Controller()
export class StoryController {
  constructor(private readonly story: StoryService) {}

  @Get("stories/all")
  async getAllStories(
    @Query() query: GetAllStoriesDto
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.story.getAllStories(query);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.getAllStories"
      );
    }
  }

  @Get("stories")
  async getStories(
    @Req() req: AuthenticatedRequest,
    @Query() query: GetStoriesDto
  ): Promise<SuccessResponse> {
    try {
      const { results, ...meta } = await this.story.getStories(query, req.user.id);
      return { data: results || [], meta: meta };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.getStories"
      );
    }
  }

  @Get("story/:storyId")
  async getStory(
    @Param("storyId") storyId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.getStory(storyId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.getStory"
      );
    }
  }

  @Post("story")
  async createStory(
    @Req() request: AuthenticatedRequest,
    @Body() body: CreateStoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.createStory(request.user.id, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.createStory"
      );
    }
  }

  @Put("story/:storyId")
  async updateStory(
    @Param("storyId") storyId: string,
    @Body() body: UpdateStoryDto
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.updateStory(storyId, body);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.updateStory"
      );
    }
  }

  @Delete("story/:storyId")
  async deleteStory(
    @Param("storyId") storyId: string
  ): Promise<SuccessResponse> {
    try {
      const data = await this.story.deleteStory(storyId);
      return { data };
    } catch (error) {
      throw new CustomException(
        error,
        HttpStatus.BAD_REQUEST,
        "StoryController.deleteStory"
      );
    }
  }
}
