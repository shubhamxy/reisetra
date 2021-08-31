import { Allow } from 'class-validator'

export class GetFormDataDTO {
    @Allow()
    formId: string
}

export class CreateFormDataDTO {}
