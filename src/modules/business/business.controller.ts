import { Body, Controller, Delete, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from 'src/dto/create-business.dto';
import { UpdateBusinessDto } from 'src/dto/update-business.dto';

@Controller('business')
export class BusinessController {
    constructor(
        private readonly businessService: BusinessService
    ) {}

    @Post()
    async createBusiness(@Res() response, @Body() createBusinessDto:CreateBusinessDto) {
        try {
            const newBusiness = await this.businessService.createBusiness(createBusinessDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Business is created successfully',
                newBusiness
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Business not created',
                error: 'Bad Request'
            })
        }
    }

    @Put('/:id')
    async updateBusiness(@Res() response, @Param('id') businessId: string,
        @Body() updateBusinessDto: UpdateBusinessDto) {
        try {
            const existingBusiness = await this.businessService.updateBusinessDetails(businessId, updateBusinessDto);
            return response.status(HttpStatus.OK).json({
                message: 'Business has been successfully updated',
                existingBusiness,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteBusiness(@Res() response, @Param('id') businessId: string) {
        try {
            const deletedBusiness = await this.businessService.deleteBusiness(businessId);
            return response.status(HttpStatus.OK).json({
                message: 'Business deleted successfully',
                deletedBusiness,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}
