import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './models/address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/models/user.entity';
import { use } from 'passport';
import { AddressCreationDto } from './models/address-creation.dto';

@Injectable()
export class AddressesService {
    constructor (
        @InjectRepository(Address)
        private addressRepository: Repository<Address>
    ) {}

    async getAddressById(id: string): Promise<Address> {
        const address: Address = await this.addressRepository.findOneBy({id});

        if (!address) {
            throw new NotFoundException(`Address with ID "${id}" not found`);
        }

        return address;
    }

    async createAddress(user: User, addressCreationDto: AddressCreationDto): Promise<Address> {
        const {city, street, additionalNotes} = addressCreationDto;

        const address: Address = this.addressRepository.create({city, street, additionalNotes, user});
        await this.addressRepository.save(address);
        
        return address;
    }

    async changeAddress(user: User, id: string, addressDto: AddressCreationDto): Promise<void> {
        console.log(user, id, addressDto);
        const {city, street, additionalNotes} = addressDto;
        
        const address: Address = await this.getAddressById(id);

        console.log(address)
        let isIncluded = false;

        for(const singleAddress of user.addresses) {
            if (singleAddress.id === address.id) {
                isIncluded = true;
                break;
            }
        }

        if (!isIncluded) {
            throw new UnauthorizedException('You cannot do that currently!')
        }

        address.city = city;
        address.street = street;
        address.additionalNotes = additionalNotes;

        await this.addressRepository.save(address);
    }
}
