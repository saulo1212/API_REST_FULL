
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import  DiskStorageProvider from '../../../shared/providers/StorageProvider/DiskStorageProvider';


interface IRequest {
    user_id: string;
    avatarFileName: string;
}

class UpdateUserAvatarService {

    async execute({user_id, avatarFileName}: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);
        const storageprovider =  new DiskStorageProvider();

        const user = await usersRepository.findById(user_id);

        if(!user)
            throw new AppError('User not found!');

        if(user.avatar){
            
            await storageprovider.deleteFile(user.avatar);
        }

        const fileName =  await storageprovider.saveFile(avatarFileName);


        user.avatar = fileName;


        await usersRepository.save(user);

        return user;


    } 

}


export default UpdateUserAvatarService;