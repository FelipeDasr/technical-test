import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { ICreateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createCategoryRequestValidator } from 'src/core/validators/categories/createCategory.validator';

import { CreateCategoryUsecase } from 'src/app/useCases/categories/createCategory.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly createCategoryUsecase: CreateCategoryUsecase) {}

  @Post()
  @UseGuards(AuthGuard)
  public async create(
    @Body(new ValidatorPipe(createCategoryRequestValidator))
    body: ICreateCategoryRequest,
    @Res() response: Response,
  ) {
    const newCategory = await this.createCategoryUsecase.execute(body);
    return response.status(201).json(newCategory);
  }
}
