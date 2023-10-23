import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Address } from './models/address.entity';
import { AddressesService } from './addresses.service';
import { GetUser } from 'src/users/models/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { AddressCreationDto } from './models/address-creation.dto';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard())
@Controller('addresses')
export class AddressesController {

    constructor(
        private addressService: AddressesService
    ) {}

    @Get('/:id')
    getAddressById(@Param('id') id: string): Promise<Address> {
        return this.addressService.getAddressById(id);
    }

    @Post()
    createAddress(
        @GetUser() user: User, 
        @Body() addressCreationDto: AddressCreationDto): Promise<Address> {
            return this.addressService.createAddress(user, addressCreationDto)
        }

    @Put('/:id')
    changeAddress(@GetUser() user: User, @Param('id') id: string, @Body() newAddress: AddressCreationDto): Promise<void> {
        return this.addressService.changeAddress(user, id, newAddress)
    }
}
