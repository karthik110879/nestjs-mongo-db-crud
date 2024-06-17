import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBranchDto } from 'src/shared/dto/create-branch.dto';
import { UpdateBranchDto } from 'src/shared/dto/update-branch.dto';
import { IBranch } from 'src/shared/interface/branch.interface';

@Injectable()
export class BranchService {
    constructor(
        @InjectModel('Branch') private branchModel: Model<IBranch>
    ) {}

    async createBranch(createBranchDto: CreateBranchDto):Promise<IBranch> {
        const newBranch = await new this.branchModel(createBranchDto);
        return newBranch;
    }

    async updateBranch(branchId:string, updateBranchDto: UpdateBranchDto):Promise<IBranch>{
        const existingBranch = await this.branchModel.findByIdAndUpdate(branchId,updateBranchDto);
        if(!existingBranch) {
            throw new NotFoundException(`Branch #${branchId} not found`)
        }
        return existingBranch;
    }

    async getAllBranches():Promise<IBranch[]> {
        const banches = await this.branchModel.find();
        if(!banches || banches.length == 0) {
            throw new NotFoundException('Branches repo is empty or no branches created')
        }
        return banches;
    }

    async getBranch(branchId:string) {
        const branch =  await this.branchModel.findById(branchId).exec();
        if(!branch) {
            throw new NotFoundException(`Branch with id #_${branchId}`);
        }
        return branch;
    }

    async deleteBranch(branchId:string) {
        const deletedBranch = this.branchModel.findByIdAndDelete(branchId);
        if(!deletedBranch) {
            throw new NotFoundException(`Cannot find this item`);
        }

        return deletedBranch;
    }

}
