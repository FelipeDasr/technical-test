import {
  Body,
  Controller,
  Get,
  Query,
  Post,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { IFindAllCategoriesQuery } from 'src/app/dtos/repositories/category.repository.dto';
import { ICreateCategoryRequest } from 'src/app/dtos/requests/categories.request.dto';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ValidatorPipe } from 'src/core/pipes/requestValidator.pipe';
import { createCategoryRequestValidator } from 'src/core/validators/categories/createCategory.validator';
import { listCategoriesRequestValidator } from 'src/core/validators/categories/listCategories.validator';
import { idValidator } from 'src/core/validators/common/id.validator';

import { GetCategoryDetailsUsecase } from 'src/app/useCases/categories/getCategoryDetails.usecase';
import { CreateCategoryUsecase } from 'src/app/useCases/categories/createCategory.usecase';
import { ListCategoriesUsecase } from 'src/app/useCases/categories/listCategories.usecase';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly createCategoryUsecase: CreateCategoryUsecase,
    private readonly listCategoriesUseCase: ListCategoriesUsecase,
    private readonly getCategoryDetailsUseCase: GetCategoryDetailsUsecase,
  ) {}

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

  @Get(':id')
  public async details(
    @Param('id', new ValidatorPipe(idValidator)) id: number,
    @Res() response: Response,
  ) {
    const category = await this.getCategoryDetailsUseCase.execute(Number(id));
    return response.status(200).json(category);
  }

  @Get()
  public async list(
    @Query(new ValidatorPipe(listCategoriesRequestValidator))
    query: IFindAllCategoriesQuery,
    @Res() response: Response,
  ) {
    const categories = await this.listCategoriesUseCase.execute(query);
    return response.status(200).json(categories);
  }
}
