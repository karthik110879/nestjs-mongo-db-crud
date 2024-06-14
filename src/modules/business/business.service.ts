import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBusinessDto } from 'src/shared/dto/create-business.dto';
import { UpdateBusinessDto } from 'src/shared/dto/update-business.dto'; 
import { IBusiness } from 'src/shared/interface/business.interface';

@Injectable()
export class BusinessService {
    constructor(
        @InjectModel('Business') private businessModel: Model<IBusiness>
    ) {}

    async createBusiness(createBusinessDto: CreateBusinessDto):Promise<IBusiness> {
        const newBusiness = await new this.businessModel(createBusinessDto);
        return newBusiness.save();
    }

    async updateBusinessDetails(businessId:string, updateBusinessDto: UpdateBusinessDto):Promise<IBusiness> {
        const existingBusiness = await this.businessModel.findByIdAndUpdate(businessId, updateBusinessDto, {new: true});
        if(!existingBusiness) {
            throw new NotFoundException(`Business #${businessId} not found`);
        }
        return existingBusiness;
    }

    async deleteBusiness(businessId:string):Promise<IBusiness> {
        const deletedBusiness = await this.businessModel.findByIdAndDelete(businessId);
        if(!deletedBusiness) {
            throw new NotFoundException(`Business #${businessId} not found`);
        }

        return deletedBusiness;
    }
}
