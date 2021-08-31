import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common'
import { FormService } from './form.service'
import { CustomException, SuccessResponse } from 'src/core/response'
import { Public } from 'src/auth/decorator/public.decorator'
import { ROUTES } from 'src/core/constants'

@Controller(ROUTES.forms)
export class FormController {
    constructor(private readonly form: FormService) {}

    @Public()
    @Get(ROUTES.forms_by_formId)
    async getFormData(@Param('formId') formId): Promise<SuccessResponse> {
        try {
            const data = await this.form.getFormData(formId)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FormController.getFormData'
            )
        }
    }

    @Public()
    @Post(ROUTES.forms_by_formId)
    async createFormData(
        @Param('formId') formId,
        @Body() body
    ): Promise<SuccessResponse> {
        try {
            const data = await this.form.createFormData(formId, body)
            return { data }
        } catch (error) {
            throw new CustomException(
                error,
                HttpStatus.BAD_REQUEST,
                'FormController.createFormData'
            )
        }
    }
}
